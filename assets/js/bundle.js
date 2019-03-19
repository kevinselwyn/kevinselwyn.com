// posts/calculate-read-time
class ReadTime {
    constructor(text, opts) {
        var real_opts = opts || {};

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

(function () {
    var article = document.querySelector('article');

    if (!article) {
        return;
    }

    var output = document.querySelector('.read-time');

    if (!output) {
        return;
    }

    var articleClone = article.cloneNode(true);

    if (!articleClone) {
        return;
    }

    [].slice.call(articleClone.querySelectorAll('header') || [])
        .forEach((item) => {
            item.parentNode.removeChild(item);
        });

    [].slice.call(articleClone.querySelectorAll('.highlight') || [])
        .forEach((item) => {
            item.parentNode.removeChild(item);
        });

    [].slice.call(articleClone.querySelectorAll('footer') || [])
        .forEach((item) => {
            item.parentNode.removeChild(item);
        });

    var text = articleClone.innerText;
    var readTime = new ReadTime(text);
    var minutes = Math.floor(readTime.time / 60);

    if (!minutes) {
        output.innerText = 'Quick read';

        return;
    }

    output.innerText = [
        minutes,
        'min read'
    ].join(' ');
}());
