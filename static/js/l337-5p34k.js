var L337MAPPING = {
    a: 4,
    e: 3,
    g: 6,
    o: 0,
    s: 5,
    t: 7
};

class L3375P34K extends HTMLElement {
    constructor() {
        super();

        this.shadowTextNode = document.createTextNode('');
        this.textNode = null;

        var shadow = this.attachShadow({
            mode: 'open'
        });

        shadow.appendChild(this.shadowTextNode);

        this._onLoad = this._onLoad.bind(this);
        this._onTextChange = this._onTextChange.bind(this);
    }

    connectedCallback() {
        document.addEventListener('readystatechange', this._onLoad, true);
        this._onLoad();
    }

    adoptedCallback() {
        this._onLoad();
    }

    disconnectedCallback() {
        document.removeEventListener('readystatechange', this._onLoad, true);

        if (this.textNode) {
            this.textNode.removeEventListener('DOMCharacterDataModified', this._onTextChange, true);
        }
    }

    _onLoad() {
        if (document.readyState !== 'complete') {
            return;
        }

        this.textNode = Array.prototype.slice.call(this.childNodes)
            .filter(function (node) {
                return node.nodeType === 3;
            })
            .shift();

        if (!this.textNode) {
            this.textNode = document.createTextNode('');

            this.appendChild(this.textNode);
        }

        this.textNode.addEventListener('DOMCharacterDataModified', this._onTextChange, true);

        this._onTranslate()
    }

    _onTextChange() {
        this._onTranslate();
    }

    _onTranslate() {
        var text = ((this.textNode || {}).textContent || '')
            .trim()
            .toLowerCase();
        var translated = text
            .split('')
            .map(function (chr) {
                return L337MAPPING[chr] !== undefined ? L337MAPPING[chr] : chr;
            })
            .join('');

        this.shadowTextNode.textContent = translated;
    }
}

if (window.customElements) {
    customElements.define('l337-5p34k', L3375P34K);
}
