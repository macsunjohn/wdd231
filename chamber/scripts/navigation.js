// JavaScript for Hamburger
const hamburger = document.querySelector("#hamburger");
const nav = document.querySelector(".navigation");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("open");
  hamburger.textContent = nav.classList.contains("open") ? "✖" : "☰";
});