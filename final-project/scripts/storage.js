// 1. Save a specific movie to 'featured_movie' key
export function setHeroMovie(movie) {
    localStorage.setItem('movieBox_featured', JSON.stringify(movie));
}

// 2. Retrieve the movie from local storage
export function getHeroMovie() {
    const data = localStorage.getItem('movieBox_featured');
    // Return the parsed object, or null if nothing is saved
    return data ? JSON.parse(data) : null;
}