(function () {
    const roots = document.querySelectorAll('.react-doom-fire');
    const App = (props) => {
        const [width, setWidth] = React.useState(320);
        const [height, setHeight] = React.useState(168);
        const [fps, setFps] = React.useState(60);
        const [running, setRunning] = React.useState(true);
        const [transparent, setTransparent] = React.useState(false);

        return React.createElement('div', {
            style: {
                width: width
            }
        }, [
            React.createElement(ReactDoomFire, {
                width: width,
                height: height,
                fps: fps,
                running: running,
                transparent: transparent,
                palette: !props.color ? undefined : [
                    0X030409,
                    0X050810,
                    0X090E1C,
                    0X0C1325,
                    0X101933,
                    0X152040,
                    0X172346,
                    0X1C2B55,
                    0X203263,
                    0X283E7B,
                    0X2D4487,
                    0X2E468A,
                    0X334E9A,
                    0X3653A3,
                    0X3653A3,
                    0X3855A8,
                    0X3855A8,
                    0X3B5AB2,
                    0X3E5EBA,
                    0X4364C0,
                    0X4B6AC3,
                    0X5471C6,
                    0X516FC4,
                    0X5976C8,
                    0X627ECB,
                    0X6883CD,
                    0X6883CD,
                    0X718AD0,
                    0X718AD0,
                    0X7C93D3,
                    0X7990D2,
                    0X8197D4,
                    0X8197D4,
                    0XACBAE3,
                    0XC5CFEC,
                    0XDFE5F4,
                    0XFDFDFE
                ]
            }),
            React.createElement('button', {
                className: 'start-stop',
                disabled: running,
                onClick: () => {
                    setRunning(true);
                }
            }, 'Start'),
            React.createElement('button', {
                className: 'start-stop',
                disabled: !running,
                onClick: () => {
                    setRunning(false);
                }
            }, 'Stop'),
            React.createElement('button', {
                className: 'toggle-transparent',
                onClick: () => {
                    setTransparent(!transparent);
                }
            }, 'Toggle Transparency'),
            React.createElement('input', {
                type: 'text',
                placeholder: 'width',
                value: width,
                onChange: (e) => {
                    setRunning(false);
                    setWidth(parseInt(e.target.value) || 320);
                }
            }),
            React.createElement('input', {
                type: 'text',
                placeholder: 'height',
                value: height,
                onChange: (e) => {
                    setRunning(false);
                    setHeight(parseInt(e.target.value) || 168);
                }
            }),
            React.createElement('p', null, `FPS: ${fps}`),
            React.createElement('input', {
                type: 'range',
                value: fps,
                min: 1,
                max: 120,
                onChange: (e) => {
                    setFps(parseInt(e.target.value));
                }
            }),
            React.createElement('div', {
                className: 'clearfix'
            })
        ]);
    }

    [].slice.call(roots).forEach((root) => {
        ReactDOM.render(React.createElement(App, {
            color: root.getAttribute('data-color')
        }), root);
    });
}());
