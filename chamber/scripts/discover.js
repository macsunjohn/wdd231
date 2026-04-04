// scripts/discover.js
import { itemsOfInterest } from '../data/discover.mjs';

function buildCards() {
    const container = document.querySelector(".discover-grid");
    
    if (!container) return; 

    // Clear the container first
    container.innerHTML = "";

    itemsOfInterest.forEach(item => {
        const card = document.createElement("section");
        card.className = "discover-card";
        
        // Using the data from your .mjs file
        card.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
                <img src="${item.image}" alt="${item.name}" width="300" height="200">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button>Learn More</button>
        `;
        container.appendChild(card);
    });
}

// Call the function immediately
buildCards();

// --- Visitor Message Logic ---
const visitorMessage = document.getElementById("visitor-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
    visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (daysSince < 1) {
        visitorMessage.textContent = "Back so soon! Awesome!";
    } else {
        visitorMessage.textContent = `You last visited ${daysSince} ${daysSince === 1 ? 'day' : 'days'} ago.`;
    }
}
localStorage.setItem("lastVisit", now);