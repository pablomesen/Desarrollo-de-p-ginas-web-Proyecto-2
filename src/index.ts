import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes';
import { connectDB } from './db';

const app = express();
const PORT = 3000;

app.use(express.json());

// Conexión a la base de datos
connectDB();

// Routes inclusion
app.use('/api', userRoutes);

// API root directory
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

// Server start
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});