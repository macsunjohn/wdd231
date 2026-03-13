// Select the button and the navigation list
const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

// Add a click event listener to the hamburger button
menuButton.addEventListener('click', () => {
    // Toggle the 'show' class on the navigation menu
    navigation.classList.toggle('show');
    
    // Change the button icon from ☰ to X when open
    if (navigation.classList.contains('show')) {
        menuButton.textContent = '❌';
    } else {
        menuButton.textContent = '☰';
    }
});