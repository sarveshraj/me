let stripTitles = document.querySelectorAll('.title');

stripTitles.forEach((stripTitle) => {
    stripTitle.addEventListener('click', () => {
        stripTitles.forEach((title) => title.parentNode.classList.toggle('active'));
    })
});