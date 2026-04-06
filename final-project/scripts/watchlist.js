const grid = document.getElementById("watchlist-grid");
const emptyState = document.getElementById("empty-watchlist");

const genreSelect = document.getElementById("genre-select");
const yearSelect = document.getElementById("year-select");
const ratingSelect = document.getElementById("rating-select");

let movies = JSON.parse(localStorage.getItem("watchlist")) || [];

/* =========================
   SAVE
========================= */
function saveMovies() {
  localStorage.setItem("watchlist", JSON.stringify(movies));
}

/* =========================
   REMOVE MOVIE
========================= */
function removeMovie(id) {
  movies = movies.filter(movie => movie.id !== id);
  saveMovies();
  renderMovies();
}

/* =========================
   FILTER MOVIES
========================= */
function getFilteredMovies() {
  let filtered = [...movies];

  const genre = genreSelect.value;
  const year = yearSelect.value;
  const rating = ratingSelect.value;

  if (genre !== "All") {
    filtered = filtered.filter(m => m.genre === genre);
  }

  if (year !== "All") {
    filtered = filtered.filter(m => m.year == year);
  }

  if (rating !== "All") {
    const minRating = parseInt(rating);
    filtered = filtered.filter(m => m.rating >= minRating);
  }

  return filtered;
}

/* =========================
   RENDER MOVIES
========================= */
function renderMovies() {
  const filtered = getFilteredMovies();

  grid.innerHTML = "";

  if (filtered.length === 0) {
    emptyState.style.display = "block";
    return;
  } else {
    emptyState.style.display = "none";
  }

  filtered.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>${movie.genre} • ${movie.year}</p>
        <p>⭐ ${movie.rating}</p>
      </div>

      <button class="remove-btn">✕</button>
    `;

    card.querySelector(".remove-btn").addEventListener("click", () => {
      removeMovie(movie.id);
    });

    grid.appendChild(card);
  });
}

/* =========================
   FILTER EVENTS
========================= */
genreSelect.addEventListener("change", renderMovies);
yearSelect.addEventListener("change", renderMovies);
ratingSelect.addEventListener("change", renderMovies);

/* =========================
   INIT
========================= */
renderMovies();

/* =========================
   ADD MOVIE (USE FROM OTHER PAGES)
========================= */
function addToWatchlist(movie) {
  movies.push(movie);
  saveMovies();
  renderMovies();
}