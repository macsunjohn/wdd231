/**
 * MovieBox - Fetch Movies Module
 * Uses Fetch API + async/await + caching + error handling
 */

let cachedMovies = null;

/**
 * Fetch movies from local JSON file
 * @returns {Promise<Array>} movies array
 */
export async function getMovies() {
    const jsonPath = "./data/movies.json";

    // return cached data if already loaded
    if (cachedMovies) {
        return cachedMovies;
    }

    try {
        const response = await fetch(jsonPath);

        if (!response.ok) {
            throw new Error(
                `Failed to load movies.json (${response.status} ${response.statusText})`
            );
        }

        const data = await response.json();

        if (!data.movies || !Array.isArray(data.movies)) {
            throw new Error("Invalid JSON format: 'movies' array missing");
        }

        // Normalize movie structure (VERY IMPORTANT for watchlist)
        cachedMovies = data.movies.map(movie => ({
            id: movie.id,
            title: movie.title,
            rating: movie.rating,
            description: movie.description,
            poster: movie.poster,
            release_date: movie.release_date,
            year: new Date(movie.release_date).getFullYear(),
            genre: movie.genre || "Unknown"
        }));

        return cachedMovies;

    } catch (error) {
        console.error("Movie fetch error:", error);

        // fallback safe return
        return [];
    }
}