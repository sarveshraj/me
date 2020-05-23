let stripTitles = document.querySelectorAll('.title');

stripTitles.forEach((stripTitle) => {
    stripTitle.addEventListener('click', () => {
        stripTitles.forEach((title) => title.parentNode.classList.toggle('active'));
    })
});

tippy('#parents', {
    content: '<img src="/images/parents.jpeg" id="parents-img"></img>',
    allowHTML: true,
    interactive: true,
    placement: 'bottom'
});