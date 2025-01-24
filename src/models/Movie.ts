import mongoose, { Schema, Document } from 'mongoose';
import { IActor, ActorSchema } from './Actor';

export interface IMovie extends Document {
    title: string;
    description: string;
    director: string;
    cast: IActor[];
    genre: string;
    calification: number;
    releseDate: Date;
    images: string[];
}

export const MovieSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    director: { type: String, required: true },
    cast: { type: [ActorSchema], required: true },
    genre: { type: String, required: true },
    calification: { type: Number, required: true },
    releseDate: { type: Date, required: true },
    images: { type: [String], required: true }
});

export default mongoose.model<IMovie>('Movie', MovieSchema);