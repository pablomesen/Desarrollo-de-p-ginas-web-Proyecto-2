import { Router } from "express";
import Actor from "../models/Actor";
import * as actorController from "../controllers/actorControllers";

const router = Router();

// Route to get all actors
router.get('/getActors', async (req, res) => {
    const actors = await Actor.find();
    res.json(actors);
});

// Route to get an actor by ID
router.get('/actors/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const actor = await actorController.getActorById(id);
        if (actor) {
            res.status(200).json(actor);
        } else {
            res.status(404).json({ error: 'Actor not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch actor.' });
    }
});

// Route to add a new actor
router.post('/actors', async (req, res) => {
    try {
        const { name, lastName, birthDate, biography, movies, images } = req.body;
        const success = await actorController.addActor({ name, lastName, birthDate, biography, movies, images });
        success ? 
        res.status(201).json({ message: 'Actor added successfully.' }) : 
        res.status(400).json({ error: 'Actor with the same name, last name and birth date already exists.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add actor.' });
    }
});

// Route to edit an actor
router.put('/actors/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, lastName, birthDate, biography, movies, images } = req.body;
        const success = await actorController.editActor(id, { name, lastName, birthDate, biography, movies, images });
        success ? 
        res.status(200).json({ message: 'Actor updated successfully.' }) : 
        res.status(404).json({ error: 'Actor not found.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update actor.' });
    }
});

// Route to delete an actor
router.delete('/actor/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const success = await actorController.deleteActor(id);
        success ? 
        res.status(200).json({ message: 'Actor deleted successfully.' }) :
        res.status(404).json({ error: 'Actor not found.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete actor.' });
    }
});

export default router;