import axios from "axios";

let api = axios.create({ baseURL: process.env.NODE_ENV === "development" ? `http://localhost:${process.env.BACKEND_DEV_PORT}` : `http://${process.env.BACKEND_IP_PRODUCTION}` });

/**
 * Registers a new user
 * @param newUser 
 * @returns 
 */
const register = async (newUser: { password: string, email: string }): Promise<boolean> => {

    const token = await api.post(`/auth/register`, newUser);


    if (token) {
        localStorage.setItem("token", token.data.token);
        return true;
    }
    return false;

}

/**
 * Log ins a user
 * @param user 
 * @returns 
 */
const login = async (user: { password: string, email: string }) => {
    const token = await api.post(`/auth/login`, user);
    localStorage.setItem("token", JSON.stringify(token));

    return token;

}

export { register, login }