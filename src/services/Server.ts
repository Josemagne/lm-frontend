import axios, { AxiosInstance } from "axios";
import { LM_Book } from "../types/Book/book";
import Book from "../utils/Book";


const env = process.env.NODE_ENV;

// Create an axios instance

// TODO Rename the class
export default class Server {

    /**
     * Gets book from server
     */
    public static getBook = async (book_id: string): Promise<any> => {
        const api = axios.create({ baseURL: env === "development" ? `http://localhost:${process.env.BACKEND_DEV_PORT}` : `http://${process.env.BACKEND_IP_PRODUCTION}` });
        let book = await api.get(`/books/${book_id}`).then((book) => {
            console.log("got the book!")
            return book;
        })

        return book.data;

    }

    /**
     * Gets all the books from the server
     */
    public static getBooks = async (): Promise<any> => {

        // TODO Use the id and look if the user is logged in. Then we will return the books!
        const api = axios.create({
            baseURL: env === "development" ? `http://localhost:${process.env.BACKEND_DEV_PORT}}` : `http://${process.env.BACKEND_IP_PRODUCTION}`
        });
        let books = await api.get(`/books`).then((books) => {
            console.log("Got the books from the server.")
            return books;
        })

        return books.data;
    }

    public static addBook = async (book: Book) => {
        const api = axios.create({ baseURL: env === "development" ? `localhost: ${process.env.BACKEND_DEV_PORT}` : `http://${process.env.BACKEND_IP_PRODUCTION}` });

        api.post("/books", book)
    }
}