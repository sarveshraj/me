document.getElementById("toc-icon").addEventListener("click", toggleIndex);
document.getElementById("toc-icon").addEventListener("onfocusout", toggleIndex);

var indexActive = false;

function toggleIndex() {
    if (indexActive) {
        console.log("bye index");
    } else {
        console.log("hi index");
    }
    indexActive = !indexActive;
}