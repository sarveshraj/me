var snackbarcont=document.getElementById('snackbar-container');
var snackbars=document.getElementsByClassName('snackbars');
var snack=document.getElementsByClassName('snack');
var close=document.getElementById('close-button');

var clicked = false;

console.log(snack[0].innerHTML);

close.addEventListener("click", function() {
  snackbarcont.style.display = 'none';
  clicked = true;
});
