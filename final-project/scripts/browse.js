import { getMovies } from "./movies.js";

/* =========================
   PAGE STATE & CONFIGURATION
========================= */
let allMovies = [];         
let filteredMovies = [];    
let currentPage = 1;        
const MOVIES_PER_PAGE = 10; 

/* =========================
   ELEMENTS
========================= */
const grid = document.getElementById("movie-grid");
const paginationNum = document.getElementById("page-numbers");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

/* Filters */
const genreFilter = document.getElementById("filter-genre");
const yearFilter = document.getElementById("filter-year");
const ratingFilter = document.getElementById("filter-rating");
const searchInput = document.getElementById("header-search");

/* =========================
   LOGIC & CALCULATION
========================= */

/* Filter Logic (Combines all filters) */
function applyAllFilters() {
    currentPage = 1; // Reset to page 1 on filter
    
    // Start with the full list
    let results = allMovies;

    // 1. Genre filter
    const genre = genreFilter.value;
    if (genre !== "all") {
        results = results.filter(m => m.genre && m.genre === genre);
    }

    // 2. Year filter
    const year = yearFilter.value;
    if (year !== "all") {
        // Assume 'release_date' is formatted YYYY-MM-DD
        results = results.filter(m => m.release_date && m.release_date.startsWith(year));
    }

    // 3. Rating filter
    const ratingThreshold = ratingFilter.value;
    if (ratingThreshold !== "all") {
        results = results.filter(m => m.rating && m.rating >= Number(ratingThreshold));
    }

    // 4. Search Filter
    const query = searchInput.value.toLowerCase().trim();
    if (query !== "") {
        results = results.filter(m => m.title && m.title.toLowerCase().includes(query));
    }

    filteredMovies = results; // Update filtered list
    updatePaginationUI();
    renderCurrentPage();
}

/* =========================
   RENDERING UI
========================= */

/* Renders the grid for the current page */
function renderCurrentPage() {
    grid.innerHTML = ""; // Clear current grid

    // Calculate start and end indexes
    const startIdx = (currentPage - 1) * MOVIES_PER_PAGE;
    const endIdx = startIdx + MOVIES_PER_PAGE;

    // Slice the array for this page
    const moviesToShow = filteredMovies.slice(startIdx, endIdx);

    if (moviesToShow.length === 0) {
        grid.innerHTML = `<div class="empty">No movies match your filters.</div>`;
        return;
    }

    moviesToShow.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <div class="poster-container">
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
            </div>
            <div class="card-content">
                <h3 class="card-title">${movie.title}</h3>
                <p class="card-meta">
                    ${movie.genre} | 
                    ${movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
                </p>
                <div class="card-rating">
                    <i class="fa-solid fa-star fa-sm text-accent"></i> ${movie.rating || "0.0"}
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

/* Renders standard page numbers [1 2 3...] based on filtered count */
function updatePaginationUI() {
    paginationNum.innerHTML = ""; // Clear page numbers

    const totalPages = Math.ceil(filteredMovies.length / MOVIES_PER_PAGE);

    if (totalPages <= 1) {
        // Not enough movies for pagination
        document.getElementById("pagination").style.display = "none";
        return;
    } else {
        document.getElementById("pagination").style.display = "flex";
    }

    // Standard loop to generate buttons for pages 1 through totalPages
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = (i === currentPage) ? 'active' : '';
        
        btn.addEventListener("click", () => {
            currentPage = i;
            renderCurrentPage();
            updatePaginationUI();
        });
        
        paginationNum.appendChild(btn);
    }

    // Enable/disable standard previous/next arrows
    prevBtn.disabled = (currentPage === 1);
    nextBtn.disabled = (currentPage === totalPages);
}

/* =========================
   EVENT HANDLERS
========================= */

function changePage(direction) {
    if (direction === "prev" && currentPage > 1) {
        currentPage--;
    } else if (direction === "next") {
        const totalPages = Math.ceil(filteredMovies.length / MOVIES_PER_PAGE);
        if (currentPage < totalPages) currentPage++;
    }
    renderCurrentPage();
    updatePaginationUI();
}

/* =========================
   INITIALIZATION
========================= */
async function init() {
    // Standard API Fetch
    const movies = await getMovies();
    allMovies = movies;
    filteredMovies = movies; 

    // Initial Render
    updatePaginationUI();
    renderCurrentPage();

    //Set standard dropdown listeners for real-time filtering
    genreFilter.addEventListener("change", applyAllFilters);
    yearFilter.addEventListener("change", applyAllFilters);
    ratingFilter.addEventListener("change", applyAllFilters);
    
    // Live search listener
    searchInput.addEventListener("input", applyAllFilters);

    // Standard next/prev pagination click handlers
    prevBtn.addEventListener("click", () => changePage("prev"));
    nextBtn.addEventListener("click", () => changePage("next"));
}

init();