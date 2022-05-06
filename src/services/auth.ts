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
        res = await api.post(`/auth/register`, newUser);


        if (res.data.result === "success") {
            localStorage.setItem("email", newUser.email)
            localStorage.setItem("token", res.data.token);
            sessionStorage.setItem("token", res.data.token)
        }
    }
    catch (err) {
        console.error(": ", err)
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
  let result: any;

    try {
        result = await api.post(`/auth/login`, user);

        if (result.data.result === "success") {
            localStorage.setItem("email", user.email)
            localStorage.setItem("token", result.data.token)
            sessionStorage.setItem("token", result.data.token)
        }
    }
    catch (err) {
        console.log("err: ", err)
    }

    return result;
}

export { register, login }
