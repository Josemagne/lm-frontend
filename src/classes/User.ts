import { LM_User } from "../types/auth/user";

class User implements LM_User {
    username: string;
    password: string;
    email: string;


    constructor(username: string, password: string, email: string) {
        this.username = username
        this.password = password
        this.email = email
    }

}

export default User;