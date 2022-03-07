import { LM_User } from "./user";

export default interface LM_Metadata {
    /**
     * Amount of books that are stored
     */
    amountOfBooks: number;
    /**
     * Indicates if the user is logged in
     */
    isLoggedIn: boolean;
    user: LM_User;
    /**
     * Contains an array of book_id strings
     */
    favoriteBooks: string[];

}