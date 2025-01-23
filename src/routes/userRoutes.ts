import { Router } from 'express';
import User from '../models/User';
import * as userController from '../controllers/userControllers';

const router = Router();

router.get('/getUsers', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.post('/register', async (req, res) => {
    // Obtain data from request
    const { userName, email, password, role } = req.body;
    // Call business logic
    const registrationSuccessful = 
    await userController.userRegister({ userName, email, password, role });
    // Define response according to business logic
    const response = registrationSuccessful ? {msg: 'User registered', opCode: 0} : {msg: 'User already exists', opCode: 1};
    // Send response
    res.json(response);
});

router.post('/login', async (req, res) => {
    // Obtain data from request
    const { credential, password } = req.body;
    // Call business logic
    const loginSuccessful = await userController.userLogin({ credential, password });
    // Define response according to business logic
    const response = loginSuccessful ? 
    {msg: 'Login successful', opCode: 0} : {msg: 'Login failed', opCode: 1};
    // Send response
    res.json(response);
});

export default router;