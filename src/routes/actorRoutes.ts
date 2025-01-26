import { Router } from "express";
import Actor from "../models/Actor";
import * as actorController from "../controllers/actorControllers";

const router = Router();

// Route to get all actors
router.get('/getActors', async (req, res) => {
    const actors = await Actor.find();
    res.json(actors);
});

// Route to add a new actor
router.post('/actors', async (req, res) => {
    const { name, lastName, birthDate, biography, movies, images } = req.body;
    try {
        const success = await actorController.addActor({ name, lastName, birthDate, biography, movies, images });
        if (success) {
            res.status(201).json({ message: 'Actor added successfully.' });
        } else {
            res.status(400).json({ error: 'Actor with the same name, last name and birth date already exists.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to add actor.' });
    }
});


// Route to edit an actor
router.put('/actors/:id', async (req, res) => {
    const { id } = req.params;
    const { name, lastName, birthDate, biography, movies, images } = req.body;
    try {
        const success = await actorController.editActor(id, { name, lastName, birthDate, biography, movies, images });
        if (success) {
            res.json({ message: 'Actor updated successfully.' });
        } else {
            res.status(404).json({ error: 'Actor not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update actor.' });
    }
});

// Route to delete an actor
router.delete('/actor/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const success = await actorController.deleteActor(id);
        if (success) {
            res.json({ message: 'Actor deleted successfully.' });
        } else {
            res.status(404).json({ error: 'Actor not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete actor.' });
    }
});

export default router;