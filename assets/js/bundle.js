import ReadTime from '../../static/js/posts/calculate-read-time/read-time';

(function () {
    const article = document.querySelector('article');

    if (!article) {
        return;
    }

    const output = document.querySelector('.read-time');

    if (!output) {
        return;
    }

    const articleClone = article.cloneNode(true);

    if (!articleClone) {
        return;
    }

    [...(articleClone.querySelectorAll('header') || [])]
        .forEach((item) => {
            item.parentNode.removeChild(item);
        });

    [...(articleClone.querySelectorAll('.highlight') || [])]
        .forEach((item) => {
            item.parentNode.removeChild(item);
        });

    [...(articleClone.querySelectorAll('footer') || [])]
        .forEach((item) => {
            item.parentNode.removeChild(item);
        });

    const text = articleClone.innerText;
    const readTime = new ReadTime(text);
    const minutes = Math.floor(readTime.time / 60);

    if (!minutes) {
        output.innerText = 'Quick read';

        return;
    }

    output.innerText = [
        minutes,
        'min read'
    ].join(' ');
}());
