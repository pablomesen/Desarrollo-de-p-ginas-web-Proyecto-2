import Movie, { IMovie } from "../models/Movie";
import { IActor, ActorSchema } from '../models/Actor';



// Adds a new movie to the database
export async function addMovie(movieData: {
    title: string; 
    description: string; 
    director: string; 
    cast: IActor[]; 
    genre: string; 
    calification: number; 
    releseDate: Date; 
    images: string[]; 
}): Promise<boolean> {
    // Check if a movie with the same title and release date already exists
    const movieAlreadyExists = await Movie.findOne({
        title: movieData.title,
        releseDate: movieData.releseDate
    });
    if (movieAlreadyExists) {
        return false; // Movie already exists
    } else {
        // Create a new movie instance
        const newMovie = new Movie(movieData);
        await newMovie.save(); // Save the movie to the database
        return true; // Movie successfully registered
    }
}




// Edits an existing movie in the database
export async function editMovie(
    movieId: string, 
    updateData: Partial<{
        title: string; 
        description: string; 
        director: string; 
        cast: IMovie['cast']; 
        genre: string; 
        calification: number; 
        releseDate: Date; 
        images: string[]; 
    }>
): Promise<boolean> {
    try {
        // Find the movie by ID
        const movie = await Movie.findById(movieId);
        
        if (!movie) {
            return false; // Movie not found
        }

        // Update the movie with the new data
        Object.assign(movie, updateData);

        // Save the updated movie back to the database
        await movie.save();
        return true; // Movie successfully updated
    } catch (error) {
        console.error('Error editing movie:', error);
        throw new Error('Failed to edit movie.');
    }
}




// Deletes a movie from the database
export async function deleteMovie(movieId: string): Promise<boolean> {
    try {
        // Find and delete the movie by ID
        const result = await Movie.findByIdAndDelete(movieId);

        // Check if a movie was deleted
        if (!result) {
            return false; // Movie not found
        }

        return true; // Movie successfully deleted
    } catch (error) {
        console.error('Error deleting movie:', error);
        throw new Error('Failed to delete movie.');
    }
}