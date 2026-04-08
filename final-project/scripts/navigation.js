document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const mainNav = document.getElementById('main-nav');

    // Ensure elements exist before adding listeners
    if (menuButton && mainNav) {
        menuButton.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('open');

            // Update ARIA attribute for accessibility
            menuButton.setAttribute('aria-expanded', isOpen.toString());

            // Optional: Change icon between hamburger (☰) and close (✕)
            menuButton.innerHTML = isOpen ? '&times;' : '&#9776;';
        });

        // Close menu when clicking a link (useful for single-page layouts)
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                menuButton.innerHTML = '&#9776;';
                menuButton.setAttribute('aria-expanded', 'false');
            });
        });
    }
});