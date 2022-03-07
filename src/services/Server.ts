import axios, { AxiosInstance } from "axios";
import Book from "../utils/Book";

const env = process.env.NODE_ENV;

// Create an axios instance

// TODO Rename the class
export default class Server {
    static api: AxiosInstance;

    constructor() {
        Server.api = axios.create({ baseURL: env === "development" ? "localhost" : `http://${process.env.BACKEND_IP_PRODUCTION}` });
    }
    /**
     * Gets book from server
     */
    public static getBook = async (book_id: string) => {
        this.api.get(`/book/${book_id}`).then(() => {
            console.log("got the book!")
        })

    }

    public static addBook = async (book: Book) => {
        Server.api.post("/books", book)
    }
}