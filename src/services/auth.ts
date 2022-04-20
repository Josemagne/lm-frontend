import axios from "axios";

let api = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? `http://localhost:${process.env.BACKEND_DEV_PORT}/api` : `http://${process.env.BACKEND_IP_PRODUCTION}/api`, headers: {
        "Access-Control-Allow-Origin": "*"
    }
}


);

/**
 * Registers a new user
 * @param newUser 
 * @returns 
 */
const register = async (newUser: { password: string, email: string }): Promise<any> => {

    let res: any;
    try {
        res = await api.post(`/auth/register`, newUser);

        if (res.data.result === "success") {
            localStorage.setItem("token", res.data.token);
            sessionStorage.setItem("token", res.data.token)
        }
    }
    catch (err) {
        console.log(": ", err)
        res.data.result = "failure"
    }
    return res;

}

/**
 * Log ins a user
 * @param user 
 * @returns 
 */
const login = async (user: { password: string, email: string }) => {
    let res: any;

    try {

        res = await api.post(`/auth/login`, user);

        if (res.data.result === "success") {
            localStorage.setItem("token", res.data.token)
            sessionStorage.setItem("token", res.data.token)
        }

    }
    catch (err) {
        res.data.result = "The email or the password are not correct."
    }
    return res;

}

export { register, login }