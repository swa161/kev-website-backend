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
    const query = `insert into photos (title,description, image_url,created_at) values ($1, $2, $3, $4)`
    const result = await getPool().query(query,[p.title,p.description,p.image_url, new Date()]);
    return result.rows[0];
}

const getPhotoById = async (id: number): Promise<photo> => {
    const query = `select * from photos where id = $1`
    const result = await getPool().query(query, [id]);
    return result.rows[0];
}

export {getAllPhoto, removeOnePhoto, addPhoto, getPhotoById}

