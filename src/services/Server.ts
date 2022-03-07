import axios, { AxiosInstance } from "axios";
import "dotenv/config";
import Book from "../utils/Book";


const env = process.env.NODE_ENV;

// Create an axios instance

// TODO Rename the class
export default class Server {

    /**
     * Gets book from server
     */
    public static getBook = async (book_id: string) => {
        const api = axios.create({ baseURL: env === "development" ? `http://localhost:${process.env.BACKEND_DEV_PORT}` : `http://${process.env.BACKEND_IP_PRODUCTION}` });
        api.get(`/books/${book_id}`).then(() => {
            console.log("got the book!")
        })

    }

    public static addBook = async (book: Book) => {
        const api = axios.create({ baseURL: env === "development" ? `localhost:${process.env.BACKEND_DEV_PORT}` : `http://${process.env.BACKEND_IP_PRODUCTION}` });

        api.post("/books", book)
    }
}