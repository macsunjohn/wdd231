import { getMovies } from './movies.js';

/* =========================
   WATCHLIST STORAGE SYSTEM
========================= */
const WATCHLIST_KEY = "watchlist";

function getWatchlist() {
    return JSON.parse(localStorage.getItem(WATCHLIST_KEY)) || [];
}

function saveWatchlist(list) {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
}

/* CHECK IF MOVIE IS IN WATCHLIST */
function isInWatchlist(id) {
    return getWatchlist().some(m => m.id === id);
}

/* =========================
   WATCHLIST UI SYNC SYSTEM
========================= */

/* GLOBAL HERO STATE */
let currentHeroMovie = null;

/* UPDATE GRID + MODAL + HERO BUTTON STATES */
function updateWatchlistButtons() {
    document.querySelectorAll(".watchlist-btn").forEach(btn => {
        const id = Number(btn.dataset.id);

        if (isInWatchlist(id)) {
            btn.textContent = "✓ In Watchlist";
            btn.classList.add("active");
        } else {
            btn.textContent = "+ Watchlist";
            btn.classList.remove("active");
        }
    });

    updateHeroWatchlistButton();
}

/* HERO BUTTON */
const heroWatchlistBtn = document.getElementById("hero-watchlist-btn");

function updateHeroWatchlistButton() {
    if (!heroWatchlistBtn || !currentHeroMovie) return;

    if (isInWatchlist(currentHeroMovie.id)) {
        heroWatchlistBtn.textContent = "✓ In Watchlist";
        heroWatchlistBtn.classList.add("active");
    } else {
        heroWatchlistBtn.textContent = "+ Watchlist";
        heroWatchlistBtn.classList.remove("active");
    }
}

/* =========================
   STORE FULL SAFE MOVIE DATA
========================= */
function toggleWatchlist(movie) {
    let list = getWatchlist();
    const exists = list.some(m => m.id === movie.id);

    if (exists) {
        // Remove movie if it already exists
        list = list.filter(m => m.id !== movie.id);
    } else {
        // PRO TIP: Use the spread operator to save ALL properties 
        // (id, title, rating, description, poster, release_date, genre, etc.)
        list.push({ ...movie });
    }

    saveWatchlist(list);
    updateWatchlistButtons();
}

/* =========================
   ELEMENTS
========================= */
const movieGrid = document.querySelector('.movie-grid');
const movieModal = document.querySelector('#movie-modal');
const modalContent = document.querySelector('#modal-content');
const modalTitle = document.querySelector('#modal-title');
const closeModal = document.querySelector('#close-modal');

/* =========================
   HERO RENDER FUNCTION
========================= */
function renderHero(movie) {
    const title = document.getElementById("hero-title");
    const rating = document.getElementById("hero-rating");
    const description = document.getElementById("hero-description");
    const poster = document.getElementById("hero-poster");
    const release_date = document.getElementById("hero-release-date");
    const genre = document.getElementById("hero-genre"); // Added genre selector

    // Safety check: only proceed if the basic elements exist in the HTML
    if (!title || !rating || !description || !poster) return;

    //Standard text content
    title.textContent = movie.title;
    rating.textContent = `⭐ ${movie.rating}`;
    description.textContent = movie.description;
    poster.src = movie.poster;
    poster.alt = movie.title;

    //Assign the Release Date (only if the element exists)
    if (release_date) {
        release_date.textContent = movie.release_date 
            ? new Date(movie.release_date).getFullYear() 
            : "Unknown Year";
    }

    //Assign the Genre (only if the element exists)
    if (genre) {
        genre.textContent = movie.genre || "General";
    }
}
/* =========================
   INIT PAGE
========================= */
async function initPage() {
    const movies = await getMovies();

    const heroDetailsBtn = document.getElementById("hero-details-btn");

    if (!movies.length) {
        movieGrid.innerHTML = "<p>No movies found. Please check your data source.</p>";
        return;
    }

    /* HERO */
    currentHeroMovie = movies[Math.floor(Math.random() * movies.length)];
    renderHero(currentHeroMovie);
    updateHeroWatchlistButton();

    heroDetailsBtn.addEventListener("click", () => {
        displayMovieDetails(currentHeroMovie);
    });

    heroWatchlistBtn?.addEventListener("click", () => {
        toggleWatchlist(currentHeroMovie);
    });

    /* GRID */
    renderMovies(movies);
    updateWatchlistButtons();

    /* EVENT DELEGATION */
    movieGrid.addEventListener('click', (event) => {

        const movieId = event.target.getAttribute('data-id');
        const movie = movies.find(m => m.id == movieId);

        if (!movie) return;

        if (event.target.classList.contains('details-btn')) {
            displayMovieDetails(movie);
        }

        if (event.target.classList.contains('watchlist-btn')) {
            toggleWatchlist(movie);
        }
    });
}

/* =========================
   RENDER MOVIES GRID
========================= */
function renderMovies(movieList) {
    movieGrid.innerHTML = "";

    movieList.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';

        card.innerHTML = `
            <div class="card-image">
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
                <span class="card-rating">⭐ ${movie.rating}</span>
            </div>

            <div class="card-info">
                <h3>${movie.title}</h3>

                <!-- FIX: safe fallback instead of undefined -->
                <p class="release-date">
                    Released: ${movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown"}
                </p>

                <div class="card-actions">
                    <button class="details-btn" data-id="${movie.id}">
                        View Details
                    </button>

                    <button class="watchlist-btn" data-id="${movie.id}">
                        + Watchlist
                    </button>
                </div>
            </div>
        `;

        movieGrid.appendChild(card);
    });
}

/* =========================
   MODAL DISPLAY FUNCTION
========================= */
function displayMovieDetails(movie) {
    modalTitle.textContent = movie.title;

    modalContent.innerHTML = `
        <div class="modal-layout">
            <img src="${movie.poster}" alt="${movie.title}" class="modal-img">

            <div class="modal-info">
                <p><strong>Rating:</strong> ${movie.rating}/10</p>

                <!-- FIX: safe fallback -->
                <p><strong>Release Date:</strong> ${
                    movie.release_date
                        ? new Date(movie.release_date).getFullYear()
                        : "Unknown"
                }</p>

                <p><strong>Synopsis:</strong> ${movie.description}</p>

                <button class="watchlist-btn modal-watchlist-btn" data-id="${movie.id}">
                    ${isInWatchlist(movie.id) ? "✓ In Watchlist" : "+ Watchlist"}
                </button>
            </div>
        </div>
    `;

    movieModal.showModal();

    const modalBtn = modalContent.querySelector(".modal-watchlist-btn");

    modalBtn.addEventListener("click", () => {
        toggleWatchlist(movie);

        modalBtn.textContent = isInWatchlist(movie.id)
            ? "✓ In Watchlist"
            : "+ Watchlist";
    });
}

/* =========================
   MODAL EVENTS
========================= */
closeModal.addEventListener('click', () => {
    movieModal.close();
});

movieModal.addEventListener('click', (event) => {
    if (event.target === movieModal) {
        movieModal.close();
    }
});

/* =========================
   START APP
========================= */
initPage();