import {getPool} from "../../config/db";

const getAllPhoto = async():Promise<photo[]> => {
    const query: string = 'SELECT * FROM photos';
    const result = await getPool().query(query);
    return result.rows;
}

// Remove the entire row of that particular photo
const removeOnePhoto = async (id: number): Promise<void> => {
    const query = `delete from photos where id = $1`
    const result = await getPool().query(query, [id]);
    return result.rows[0];
}

const addPhoto = async (p: photoCreate): Promise<number> => {
    const query = `insert into photos (title,description, image_url) values ($1, $2, $3)`
    const result = await getPool().query(query,[p.title,p.description, `photos/${p.image_url}`]);
    return result.rows[0];
}

const getPhotoById = async (id: number): Promise<photo> => {
    const query = `select * from photos where id = $1`
    const result = await getPool().query(query, [id]);
    return result.rows[0];
}

const getPhotoName = async (photoId: number): Promise<string> => {
    const query = `select image_url from photos where id = $1`
    const result = await getPool().query(query, [photoId]);
    return result.rows[0].image_url;
}

export {getAllPhoto, removeOnePhoto, addPhoto, getPhotoById, getPhotoName}

