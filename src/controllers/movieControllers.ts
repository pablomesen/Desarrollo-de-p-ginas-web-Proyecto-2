import Movie, { IMovie } from "../models/Movie";

// Adds a new movie to the database
export async function addMovie(movieData: {
    title: string;
    description: string;
    director: string;
    cast: String[];
    genres: String[];
    calification: number;
    releaseDate: String;
    images: string[];
}): Promise<boolean> {
    const movieAlreadyExists = await Movie.findOne({
        title: movieData.title,
        releseDate: movieData.releaseDate
    });
    if (movieAlreadyExists) {
        return false;
    } else {
        const newMovie = new Movie(movieData);
        await newMovie.save();
        return true; 
    }
}

// Edits an existing movie in the database
export async function editMovie(
    movieId: string,
    updatedData: Partial<{
        title: string;
        description: string;
        director: string;
        cast: String[];
        genres: String[];
        calification: number;
        releaseDate: String;
        images: string[];
    }>
): Promise<boolean> {
    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return false; 
        }
        const filteredData = Object.fromEntries(
            Object.entries(updatedData).filter(([key, value]) => value !== undefined)
        );
        Object.assign(movie, filteredData);
        await movie.save();
        return true;
    } catch (error) {
        console.error('Error editing movie:', error);
        throw new Error('Failed to edit movie.');
    }
}

// Deletes a movie from the database
export async function deleteMovie(movieId: string): Promise<boolean> {
    try {
        const result = await Movie.findByIdAndDelete(movieId);
        if (!result) {
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error deleting movie:', error);
        throw new Error('Failed to delete movie.');
    }
}