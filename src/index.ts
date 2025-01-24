import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes';
import movieRoutes from './routes/movieRoutes';
import actorRoutes from './routes/actorRoutes';
import { connectDB } from './db';

const app = express();
const PORT = 3000;

app.use(express.json());

// Conexión a la base de datos
connectDB();

// Routes inclusion
app.use('/api', userRoutes);
app.use('/api', movieRoutes);
app.use('/api', actorRoutes);

// API root directory
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

// Server start
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});