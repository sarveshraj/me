document.getElementById("toc-icon").addEventListener("click", toggleIndex);
window.addEventListener("scroll", disableTOCOnScroll);

let tocElement = document.getElementById("toc");
let tocIconElement = document.getElementById("toc-icon");
let tocContainerElement = document.getElementById("toc-container");

function toggleIndex() {

    if (tocElement.classList.contains('hidden')) {
        // enable index
        tocElement.classList.remove('hidden');
        tocIconElement.classList.add('selected');
        tocElement.classList.remove('visually-hidden');
    } else {
        // disable index
        tocElement.classList.add('visually-hidden');
        tocIconElement.classList.remove('selected');
        setTimeout(() => {
            tocElement.classList.add('hidden');
        }, 300)
    }
}

function disableTOCOnScroll() {
    if (tocElement.classList.contains('hidden')) return;

    setTimeout(() => {
        tocElement.classList.add('visually-hidden');
        tocIconElement.classList.remove('selected');
        setTimeout(() => {
            tocElement.classList.add('hidden');
        }, 300)
    }, 500)
}