import {getPool} from "../../config/db";
import {camelizeKeys} from 'humps';

const register = async(u:userRegister): Promise<any> => {
    throw new Error("Not implemented yet");
}
const findUserByEmail = async (email: string): Promise<user> => {
    throw new Error("Not implemented yet");
}

const findUserByToken = async (token: string): Promise<user> => {
    throw new Error("Not implemented yet");
}

const login = async(id: number, token: string): Promise<any> => {
    throw new Error("Not implemented yet");
}

const logout = async(id: number): Promise<any> => {
    throw new Error("Not implemented yet");
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