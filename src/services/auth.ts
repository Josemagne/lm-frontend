import axios from "axios";
import { LM_User } from "../types/auth/user"

let api = axios.create({ baseURL: process.env.NODE_ENV === "development" ? `http://localhost:${process.env.BACKEND_DEV_PORT}` : `http://${process.env.BACKEND_IP_PRODUCTION}` });

/**
 * Registers a new user
 * @param newUser 
 * @returns 
 */
const register = async (newUser: LM_User): Promise<boolean> => {

    const token = await api.post(`/auth/register`, newUser);

    localStorage.setItem("token", JSON.stringify(token));

    if (token) {
        return true;
    }
    return false;

}

/**
 * Log ins a user
 * @param user 
 * @returns 
 */
const login = async (user: LM_User): Promise<boolean> => {
    const token = await api.post(`/auth/login`, user);
    localStorage.setItem("token", JSON.stringify(token));

    if (token) {
        return true;
    }
    return false;

}

export { register, login }