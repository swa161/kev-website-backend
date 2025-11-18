import {getPool} from "../../config/db";

const getAllPhoto = async():Promise<photo[]> => {
    const query: string = 'SELECT * FROM photos';
    const result = await getPool().query(query);
    return result.rows;
}

// Remove the entire row of that particular photo
const removeOnePhoto = async (id: number): Promise<void> => {
    throw new Error("Not implemented yet");
}

const addPhoto = async (p: photoCreate): Promise<number> => {
    throw new Error("Not implemented yet");
}

const getPhotoById = async (id: number): Promise<photo> => {
    throw new Error("Not implemented yet");
}

export {getAllPhoto, removeOnePhoto, addPhoto, getPhotoById}

