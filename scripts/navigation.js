const mainnav = document.querySelector('#nav');
const hambutton = document.querySelector('#menu');

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('open');
    hambutton.classList.toggle('open');

    if (hambutton.classList.contains('open')) {
        hambutton.textContent = "❌"; 
    } else {
        hambutton.textContent = "☰"; 
    }
});