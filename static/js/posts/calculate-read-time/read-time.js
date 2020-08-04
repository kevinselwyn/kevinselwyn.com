class ReadTime {
    constructor(text, opts) {
        const real_opts = opts || {};

        this._raw = text;
        this.text = this._cleanText(this._raw);
        this.words = this.text.split(' ');
        this.wpm = real_opts.wpm || 265;
        this.time = this._calculateTime(this.words, this.wpm);
    }

    _cleanText(text) {
        return (text || '')
            .toString()
            .trim()
            .replace(/[\r\n\t]+/g, ' ')
            .replace(/ +/g, ' ');
    }

    _calculateTime(words, wpm) {
        return (words.length / wpm) * 60;
    }
}

export default ReadTime;
