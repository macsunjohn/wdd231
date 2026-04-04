import { getMovies } from './movies.js';

const movieGrid = document.querySelector('.movie-grid');
const movieModal = document.querySelector('#movie-modal');
const modalContent = document.querySelector('#modal-content');
const modalTitle = document.querySelector('#modal-title');
const closeModal = document.querySelector('#close-modal');

async function initPage() {
    // Fetch the data
    const movies = await getMovies();

    // Check if we have data to display
    if (movies.length > 0) {
        renderMovies(movies);
        
        // --- MODAL LOGIC START ---
        // Use event delegation to listen for clicks on the grid
        movieGrid.addEventListener('click', (event) => {
            // Check if the clicked element is a "View Details" button
            if (event.target.classList.contains('details-btn')) {
                const movieId = event.target.getAttribute('data-id');
                // Find the specific movie object from our array
                const movie = movies.find(m => m.id == movieId);
                
                if (movie) {
                    displayMovieDetails(movie);
                }
            }
        });
        // --- MODAL LOGIC END ---

    } else {
        movieGrid.innerHTML = "<p>No movies found. Please check your data source.</p>";
    }
}

function renderMovies(movieList) {
    movieGrid.innerHTML = "";

    movieList.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card'; // Updated to match your previous styles
        
        card.innerHTML = `
            <div class="card-image">
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
                <span class="card-rating">${movie.rating}</span>
            </div>
            <div class="card-info">
                <h3>${movie.title}</h3>
                <p class="release-date">Released: ${movie.release_date}</p>
                <button class="details-btn" data-id="${movie.id}">View Details</button>
            </div>
        `;

        movieGrid.appendChild(card);
    });
}

// Function to populate and open the modal
function displayMovieDetails(movie) {
    modalTitle.textContent = movie.title;
    
    // Using template literals to inject details into the modal
    modalContent.innerHTML = `
        <div class="modal-layout">
            <img src="${movie.poster}" alt="${movie.title}" class="modal-img">
            <div class="modal-info">
                <p><strong>Rating:</strong> ${movie.rating}/10</p>
                <p><strong>Release Date:</strong> ${movie.release_date}</p>
                <p><strong>Synopsis:</strong> ${movie.description}</p>
            </div>
        </div>
    `;
    
    movieModal.showModal(); 
}

// Event listener to close the modal
closeModal.addEventListener('click', () => {
    movieModal.close();
});

// Close modal if user clicks outside the modal content 
movieModal.addEventListener('click', (event) => {
    if (event.target === movieModal) {
        movieModal.close();
    }
});

// Start the process
initPage();