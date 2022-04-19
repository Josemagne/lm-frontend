import axios from "axios";

let api = axios.create({ baseURL: process.env.NODE_ENV === "development" ? `http://localhost:${process.env.BACKEND_DEV_PORT}` : `http://${process.env.BACKEND_IP_PRODUCTION}` });

/**
 * Registers a new user
 * @param newUser 
 * @returns 
 */
const register = async (newUser: { password: string, email: string }): Promise<string> => {

    let result: string;
    try {
        const token = await api.post(`/auth/register`, newUser);
        console.log(token)
        if (token)
            localStorage.setItem("token", token.data.data);
        sessionStorage.setItem("token", token.data.data)
        result = "success";
    }
    catch (err) {
        console.log(": ", err)
        result = "failure";
    }
    return result;

}

/**
 * Log ins a user
 * @param user 
 * @returns 
 */
const login = async (user: { password: string, email: string }) => {
    let result: string;

    try {

        const token = await api.post(`/auth/login`, user);

        if (token) {
            localStorage.setItem("token", token.data.data)
            sessionStorage.setItem("token", token.data.data)
        }

        result = "success";
    }
    catch (err) {
        result = "The email or the password are not correct."
    }
    return result;

}

export { register, login }