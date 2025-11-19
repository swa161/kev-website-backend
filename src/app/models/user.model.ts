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
    throw new Error("Not implemented yet");
}

const updateUser = async(u: user): Promise<any> => {
    throw new Error("Not implemented yet");
}

const getImageName = async (id: number): Promise<string> => {
    throw new Error("Not implemented yet");
}

const updateImageName = async (id: number): Promise<string> => {
    throw new Error("Not implemented yet");
}

const removeImageName = async (id: number): Promise<void> => {
    throw new Error("Not implemented yet");
}

const getCVname = async (id: number): Promise<string> => {
    throw new Error("Not implemented yet");
}

const updateCVname = async (id: number): Promise<void> => {
    throw new Error("Not implemented yet");
}

const removeCVname = async (id: number): Promise<void> => {
    throw new Error("Not implemented yet");
}
export {register, login, logout, updateUser, findUserByEmail, findUserByToken, updateImageName, removeImageName, getImageName,
    getCVname, updateCVname, removeCVname
}