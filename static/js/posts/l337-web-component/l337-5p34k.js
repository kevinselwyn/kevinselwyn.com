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

        var self = this;

        this.shadowTextNode = document.createTextNode('');
        this.textNode = null;
        this.observer = new MutationObserver(function (e) {
            var text = e[0].addedNodes[0].textContent;

            self._onTranslate(text);
        });

        this.observer.observe(this, {
            childList: true
        });

        var shadow = this.attachShadow({
            mode: 'open'
        });

        shadow.appendChild(this.shadowTextNode);

        this._onLoad = this._onLoad.bind(this);
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

        this.observer.disconnect();
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

        this._onTranslate()
    }

    _onTranslate(_text) {
        var text = (_text || (this.textNode || {}).textContent || '')
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
