import Actor from "../models/Actor";
import { IMovie } from "../models/Movie";

// Adds a new actor to the database
export async function addActor(actorData: {
    name: string;
    lastName: string;
    birthDate: Date;
    biography: string;
    movies: IMovie[];
    images: string[];
}): Promise<boolean> {
    const actorAlreadyExists = await Actor.findOne({
        name: actorData.name,
        lastName: actorData.lastName,
        birthDate: actorData.birthDate
    });
    if (actorAlreadyExists) {
        return false;
    } else {
        const newActor = new Actor(actorData);
        await newActor.save();
        return true;
    }
}

// Edits an existing actor in the database
export async function editActor(
    actorId: string,
    updatedData: Partial<{
        name: string;
        lastName: string;
        birthDate: Date;
        biography: string;
        movies: IMovie[];
        images: string[];
    }>
): Promise<boolean> {
    const actor = await Actor.findById(actorId);
    if (!actor) {
        return false;
    }
    // Secure way to remove undefined values from the updatedData object
    const filteredData = Object.fromEntries(
        Object.entries(updatedData).filter(([key, value]) => value !== undefined)
    );
    Object.assign(actor, filteredData);
    await actor.save();
    return true;
}

// Deletes an actor from the database
export async function deleteActor(
    actorId: string
): Promise<boolean> {
    const opResult = await Actor.findByIdAndDelete(actorId);
    if (!opResult) {
        return false;
    }
    return true;
}