(function () {
    const l337 = document.querySelector('.l337-5p34k');

    if (!l337) {
        return;
    }

    const l337_input = l337.querySelector('input');
    const l337_el = l337.querySelector('l337-5p34k');

    l337_input.addEventListener('keyup', () => {
        l337_el.innerText = l337_input.value;
    });
}());
