import {getPool} from "../../config/db";
import {camelizeKeys} from 'humps';
import Logger from "../../config/logger"
const register = async(u:userRegister): Promise<any> => {
    const query: string =
        `INSERT INTO profile (title, description,create_at, phone_number,email,address,first_name,last_name,password) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`;
    const result = await getPool()
        .query(query,[
            u.title,
            u.description,
            new Date(),
            u.phoneNumber,
            u.email,
            u.physicalAddress,
            u.firstName,
            u.lastName,
            u.password]);
    return result.rows[0];
}
const findUserByEmail = async (email: string): Promise<user> => {
    const query: string = `select * from profile where email = $1`
    const result = await getPool().query(query, [email])
    Logger.info(result.rows);
    return result.rows.length === 0 ? null : camelizeKeys(result.rows[0]) as user;

}

const findUserByToken = async (token: string): Promise<user> => {
    const query: string = `select * from profile where auth_token = $1`
    const result = await getPool().query(query, [token])
    return result.rows.length === 0 ? null : camelizeKeys(result.rows[0]) as user;
}

const findUserById = async (id: number): Promise<user> => {
    const query: string = `select * from profile where id = $1`
    const result = await getPool().query(query, [id])
    return result.rows.length === 0 ? null : camelizeKeys(result.rows[0]) as user;
}

// all this will do is set the aut token in the database
const login = async(id: number, token: string): Promise<any> => {
    const query: string = `update profile set auth_token = $1 where id = $2`
    const result = await getPool().query(query,[token, id])
    return result.rows[0]
}

const logout = async(id: number): Promise<any> => {
    const query: string = `update profile set auth_token = $1 where id = $2`
    const result = await getPool().query(query, [null,id])
    Logger.info(result.rows[0])
    return {id}
}

const view = async(id: number): Promise<any> => {
    const query: string = `select * from profile where id = $1`
    const result = await getPool().query(query, [id])
    return result.rows[0]
}

const updateUser = async(u: user, id: number): Promise<any> => {
    const query: string = `update profile set
                   title = $1,
                   description = $2,
                   phone_number = $3,
                   email = $4,
                   address = $5,
                   first_name = $6,
                   last_name = $7 where id = $8 RETURNING *`
    const result = await getPool().query(query, [
        u.title,
        u.description,
        u.phoneNumber,
        u.email,
        u.physicalAddress,
        u.firstName,
        u.lastName,
        id])
    return result.rows[0]
}

const updateUserPassword = async(newPassword: string, id: number): Promise<any> => {
    const query: string = `update profile set password = $1 where id = $2`
    const result = await getPool().query(query, [newPassword, id])
    return result

}


const getImageName = async (id: number): Promise<string> => {
    const query: string = `select image_filename from profile where id = $1`
    const result = await getPool().query(query, [id])
    return result.rows[0].image_filename
}

const updateImageName = async (id: number, imageName: string): Promise<string> => {
    const query: string = `update profile set image_filename = $1 where id = $2`
    const result = await getPool().query(query, [imageName, id])
    return result.rows[0]
}

const removeImageName = async (id: number): Promise<void> => {
    const query: string = `update profile set image_filename = $1 where id = $2`
    const result = await getPool().query(query, [null,id])
    return result.rows[0]
}

const getCVname = async (id: number): Promise<string> => {
    const query: string = `select cv_filename from profile where id = $1`
    const result = await getPool().query(query, [id])
    return result.rows[0].cv_filename
}

const updateCVname = async (id: number, filename: string): Promise<void> => {
    const query: string = `update profile set cv_filename = $1 where id = $2`
    const result = await getPool().query(query, [filename,id])
    return
}

const removeCVname = async (id: number): Promise<void> => {
    const query: string = `update profile set cv_filename = $1 where id = $2`
    const result = await getPool().query(query, [null,id])
    return
}
export {register, login, logout, view, updateUser, findUserByEmail, findUserByToken, findUserById, updateImageName,updateUserPassword, removeImageName, getImageName,
    getCVname, updateCVname, removeCVname
}