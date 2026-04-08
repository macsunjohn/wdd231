// Hamburger Menu

const hamburger = document.querySelector("#hamburger");
const nav = document.querySelector("#primary-nav");

if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
        nav.classList.toggle("open");
        
        if (nav.classList.contains("open")) {
            hamburger.textContent = "✖"; 
        } else {
            hamburger.textContent = "☰"; 
        }
    });
}