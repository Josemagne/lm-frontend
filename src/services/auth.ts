import axios from "axios";

const api = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? `${process.env.BACKEND_IP_DEVELOPMENT}/api/v1` : `${process.env.BACKEND_IP_PRODUCTION}/api/v1`, headers: {
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
        const response = await api.post(`/auth/register`, newUser);
        res = response.data;


        if (res.result === "success") {
            localStorage.setItem("email", newUser.email)
            localStorage.setItem("token", res.token);
            sessionStorage.setItem("token", res.token)
        }
    }
    catch (err: any) {
        res = err.response.data;
    }
    return res;
}

/**
 * Log ins a user
 * @param user 
 * @returns 
 */
const login = async (user: { password: string, email: string }) => {
    let result: any;

    try {
        const response = await api.post(`/auth/login`, user);
        result = response.data;

        if (result.result === "success") {
            localStorage.setItem("email", user.email)
            localStorage.setItem("token", result.token)
            sessionStorage.setItem("token", result.token)
        }
    }
    catch (err: any) {
        console.log("err: ", err)
        result = err.response.data;
    }

    return result;
}

export { register, login }
