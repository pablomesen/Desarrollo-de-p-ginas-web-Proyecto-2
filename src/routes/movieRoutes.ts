import { Router } from 'express';
import Movie from '../models/Movie';
import * as movieController from '../controllers/movieControllers';

const router = Router();

// Route to get all movies
router.get('/getMovies', async (req, res) => {
    const movies = await Movie.find();
    res.json(movies);
});

// Route to add a new movie
router.post('/movies', async (req, res) => {
    const { title,
        description,
        director,
        cast,
        genre,
        calification,
        releseDate,
        images } = req.body;
    try {
        const success = await movieController.addMovie({
            title,
            description,
            director,
            cast,
            genre,
            calification,
            releseDate,
            images
        });
        if (success) {
            res.status(201).json({ message: 'Movie added successfully.' });
        } else {
            res.status(400).json({ error: 'Movie with the same title and release date already exists.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to add movie.' });
    }
});

// Route to edit a movie
router.put('/movies/:id', async (req, res) => {
    const { id } = req.params;
    const { title,
        description,
        director,
        cast,
        genre,
        calification,
        releseDate,
        images } = req.body;
    try {
        const success = await movieController.editMovie(id, {
            title,
            description,
            director,
            cast,
            genre,
            calification,
            releseDate,
            images
        });
        if (success) {
            res.json({ message: 'Movie updated successfully.' });
        } else {
            res.status(404).json({ error: 'Movie not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update movie.' });
    }
});

// Route to delete a movie
router.delete('/movies/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const success = await movieController.deleteMovie(id);
        if (success) {
            res.json({ message: 'Movie deleted successfully.' });
        } else {
            res.status(404).json({ error: 'Movie not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete movie.' });
    }
});

export default router;