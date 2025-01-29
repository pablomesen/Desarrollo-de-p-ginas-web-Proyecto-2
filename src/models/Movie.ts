import mongoose, { Schema, Document } from 'mongoose';

export interface IMovie extends Document {
    title: string;
    description: string;
    director: string;
    cast: String[];
    genres: String[];
    calification: number;
    releaseDate: Date;
    images: string[];
}

export const MovieSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    director: { type: String, required: true },
    cast: { type: [String], required: true },
    genres: { type: [String], required: true },
    calification: { type: Number, required: true },
    releaseDate: { type: Date, required: true },
    images: { type: [String], required: true }
});

export default mongoose.model<IMovie>('Movie', MovieSchema);