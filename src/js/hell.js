//------------hamburger menu-------------------------
//---------------------------------------------------
const menu = document.querySelector(".menu");
const menu_btn = document.querySelector(".hambergur");

menu.addEventListener("click", menu_open);

function menu_open(event) {
  event.stopPropagation();
  menu_btn.classList.toggle("is-active");
}

document.addEventListener("click", menu_close);
function menu_close() {
  menu_btn.classList.remove("is-active");
}

let header = document.querySelector(".p-header");
window.onscroll = function () {
  if (window.pageYOffset > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
};
