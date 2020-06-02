let stripTitles = document.querySelectorAll('.title');

if (navigator.appVersion.indexOf("Chrome/") != -1) {
    stripTitles.forEach((title) => title.firstElementChild.classList.add("chrome"))
}

stripTitles.forEach((stripTitle) => {
    stripTitle.addEventListener('click', () => {
        stripTitles.forEach((title) => {
            title.firstElementChild.innerHTML = title.parentNode.classList.toggle('active') ? "-" : "+";
        });
    })
});

tippy('#parents', {
    content: '<img src="/images/parents.jpeg" id="parents-img"></img>',
    allowHTML: true,
    placement: 'bottom',
});

tippy('#hugo', {
    content: 'This website runs on Hugo!',
    placement: 'right',
});