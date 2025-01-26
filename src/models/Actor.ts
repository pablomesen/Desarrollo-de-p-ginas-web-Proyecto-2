import mongoose, { Schema, Document } from 'mongoose';
import { IMovie, MovieSchema } from './Movie';

export interface IActor extends Document {
    name: string;
    lastName: string;
    birthDate: Date;
    biography: string;
    movies: IMovie[];
    images: string[];
}

export const ActorSchema: Schema = new Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    biography: { type: String, required: true },
    movies: { type: [MovieSchema], required: true },
    images: { type: [String], required: true }
});

export default mongoose.model<IActor>('Actor', ActorSchema);