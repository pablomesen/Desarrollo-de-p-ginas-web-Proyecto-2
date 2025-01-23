import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Get environment variables
dotenv.config();
const MONGO_URI = process.env.MONGO_URI || '';

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to database');
    } catch (err) {
        console.log('Error connecting to MongoDB', err);
        process.exit(1); // Exit the process with failure
    }
};
