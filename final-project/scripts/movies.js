/**
 * Fetches movie data from the local JSON file.
 * Requirement: Use Fetch API, async/await, and try...catch.
 */
export async function getMovies() {
    const jsonPath = 'data/movies.json'; // Path to your new JSON file

    try {
        const response = await fetch(jsonPath);

        // Check if the network request was successful
        if (!response.ok) {
            throw new Error(`Could not fetch ${jsonPath}: ${response.statusText}`);
        }

        const data = await response.json();

        // Requirement: Process the data (returning the array of 15 items)
        return data.movies;

    } catch (error) {
        // Requirement: Robust error handling
        console.error("Critical Error fetching movie data:", error);
        
        // Return an empty array so the app doesn't crash if fetch fails
        return [];
    }
}