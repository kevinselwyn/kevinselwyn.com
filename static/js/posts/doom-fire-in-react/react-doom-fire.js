class ReactDoomFire extends React.Component {
    constructor(props) {
        super(props);

        this.canvas = React.createRef();
        this.context = null;

        this.data = null;
        this.pixels = [];

        this.animate = null;
        this.time = Date.now();
        this.interval = 1000 / props.fps;

        this._onInit = this._onInit.bind(this);
        this._onPixelsInit = this._onPixelsInit.bind(this);
        this._onCanvasInit = this._onCanvasInit.bind(this);
        this._onStart = this._onStart.bind(this);
        this._onStop = this._onStop.bind(this);
        this._onRun = this._onRun.bind(this);
        this._onDraw = this._onDraw.bind(this);
    }

    componentDidMount() {
        const {width, height, running} = this.props;
        const {canvas} = this;

        this.context = canvas.current.getContext('2d');
        this.data = this.context.getImageData(0, 0, width, height);

        this._onInit();

        if (running) {
            this._onStart();
        }
    }

    componentDidUpdate(prevProps) {
        const {width, height, running, fps} = this.props;

        if (!(this.context instanceof CanvasRenderingContext2D)) {
            this.context = this.canvas.current.getContext('2d');
            this.data = this.context.getImageData(0, 0, width, height);
        }

        if (prevProps.running !== running && running) {
            this._onStart();
        }

        if (prevProps.fps !== fps) {
            this.interval = 1000 / fps;
        }

        if (prevProps.width !== width || prevProps.height !== height) {
            this.data = this.context.getImageData(0, 0, width, height);
            this._onInit();
        }
    }

    _onInit() {
        this._onPixelsInit();
        this._onCanvasInit();
    }

    _onPixelsInit() {
        const {width, height} = this.props;
        const size = width * height;
        var i = 0;
        var l = 0;

        this.pixels = this.pixels.slice(0, size);

        if (this.pixels.length < size) {
            this.pixels = this.pixels.concat(new Array(size - this.pixels.length));
        }

        for (i = 0, l = size; i < l; i += 1) {
            this.pixels[i] = 0;
        }
    }

    _onCanvasInit() {
        const {width, height, palette, transparent} = this.props;
        const {canvas, context} = this;

        canvas.current.setAttribute('width', width);
        canvas.current.setAttribute('height', height);

        if (transparent) {
            context.clearRect(0, 0, width, height);
        } else {
            context.fillStyle = `#${palette[0].toString(16)}`;
            context.fillRect(0, 0, width, height);
        }
    }

    _onStart() {
        const {width, height, palette} = this.props;
        const {length} = palette;
        var x = 0;
        var y = height - 1;

        for (x = 0; x < width; x += 1) {
            this.pixels[x + (y * width)] = length - 1;
        }

        this._onRun();
    }

    _onStop() {
        this.animate = cancelAnimationFrame(this.animate);
    }

    _onRun() {
        const {interval} = this;

        this.animate = cancelAnimationFrame(this.animate);
        this.animate = requestAnimationFrame(this._onRun);

        const now = Date.now();
        const elapsed = now - this.time;

        if (elapsed > interval) {
            this.time = now - (elapsed % interval);

            this._onDraw();
        }
    }

    _onDraw() {
        const {width, height, running, palette, transparent} = this.props;
        const {context, data} = this;
        var total = 0;
        var x = 0;
        var y = 0;

        context.clearRect(0, 0, width, height);

        for (x = 0; x < width; x += 1) {
            for (y = 1; y < height; y += 1) {
                const src = x + (y * width);
                const pixel = this.pixels[src];

                if (pixel === 0) {
                    this.pixels[src - width] = 0;
                } else {
                    const rand = Math.round(Math.random() * 3) & 3;
                    const dest = src - rand + 1;
                    const val = pixel - (rand & 1);

                    this.pixels[dest - width] = val;

                    total += val;
                }
            }
        }

        if (!running) {
            for (y = height - 1; y > height - 8; y -= 1) {
                for (x = 0; x < width; x += 1) {
                    const rand = Math.round(Math.random() * 3) & 3;
                    const val = Math.max(this.pixels[x + (y * width)] - rand, 0);

                    this.pixels[x + (y * width)] = val;

                    total += val;
                }
            }
        }

        for (y = 0; y < height; y += 1) {
            for (x = 0; x < width; x += 1) {
                const index = this.pixels[x + (y * width)];
                const pixel = palette[index];

                data.data[((x + (y * width)) * 4) + 0] = (pixel >> 16) & 0xFF;
                data.data[((x + (y * width)) * 4) + 1] = (pixel >> 8) & 0xFF;
                data.data[((x + (y * width)) * 4) + 2] = pixel & 0xFF;
                data.data[((x + (y * width)) * 4) + 3] = transparent ? ((index === 0) ? 0 : 255) : 255;
            }
        }

        context.putImageData(data, 0, 0);

        if (!total) {
            this._onStop();
        }
    }

    render() {
        return React.createElement('canvas', {
            width: this.props.width,
            height: this.props.height,
            ref: this.canvas
        });
    }
}

ReactDoomFire.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    fps: PropTypes.number,
    palette: PropTypes.arrayOf(PropTypes.number),
    running: PropTypes.boolean,
    transparent: PropTypes.boolean
};

ReactDoomFire.defaultProps = {
    width: 320,
    height: 168,
    fps: 27,
    palette: [
        0x070707,
        0x1F0707,
        0x2F0F07,
        0x470F07,
        0x571707,
        0x671F07,
        0x771F07,
        0x8F2707,
        0x9F2F07,
        0xAF3F07,
        0xBF4707,
        0xC74707,
        0xDF4F07,
        0xDF5707,
        0xDF5707,
        0xD75F07,
        0xD75F07,
        0xD7670F,
        0xCF6F0F,
        0xCF770F,
        0xCF7F0F,
        0xCF8717,
        0xC78717,
        0xC78F17,
        0xC7971F,
        0xBF9F1F,
        0xBF9F1F,
        0xBFA727,
        0xBFA727,
        0xBFAF2F,
        0xB7AF2F,
        0xB7B72F,
        0xB7B737,
        0xCFCF6F,
        0xDFDF9F,
        0xEFEFC7,
        0xFFFFFF
    ],
    running: false,
    transparent: false
};
