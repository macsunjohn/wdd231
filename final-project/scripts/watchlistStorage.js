const KEY = "watchlist";

/* GET WATCHLIST */
export function getWatchlist() {
    return JSON.parse(localStorage.getItem(KEY)) || [];
}

/* SAVE WATCHLIST */
export function saveWatchlist(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
}

/* ADD MOVIE */
export function addMovie(movie) {
    let list = getWatchlist();

    if (list.some(m => m.id === movie.id)) return;

    list.push(movie);
    saveWatchlist(list);
}

/* REMOVE MOVIE */
export function removeMovie(id) {
    let list = getWatchlist().filter(m => m.id !== id);
    saveWatchlist(list);
}