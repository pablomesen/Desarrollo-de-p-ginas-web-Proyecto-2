import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes';
import movieRoutes from './routes/movieRoutes';
import actorRoutes from './routes/actorRoutes';
import { connectDB } from './db';

const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json());

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

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