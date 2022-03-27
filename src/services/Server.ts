// @ts-nocheck
import axios, { AxiosInstance } from "axios";
import { LM_Book } from "../types/Book/book";
import { nanoid } from 'nanoid';
import LM_Chapter from '../types/Book/chapter';


const env = process.env.NODE_ENV;

// Create an axios instance

// TODO Rename the class
export default class Server {

    /**
     * Gets book from server
     */
    public static getBook = async (book_id: string): Promise<any> => {
        let api = axios.create({ baseURL: env === "development" ? `http://localhost:${process.env.BACKEND_DEV_PORT}` : `http://${process.env.BACKEND_IP_PRODUCTION}` });
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




    public static addBook = async (book: LM_Book) => {
        const api = axios.create({ baseURL: env === "development" ? `http://localhost:${process.env.BACKEND_DEV_PORT}` : `http://${process.env.BACKEND_IP_PRODUCTION}` });
        console.log("Send data about book to backend")

        if (book.pages === null) book.pages = 0;

        await api.post("/books", book)
        console.log("Sent this book data to backend: ", book)
    }

    public static updateBook = async (book: LM_Book): Promise<any> => {
        let result: any;

        let api = axios.create({ baseURL: env === "development" ? `http://localhost:${process.env.BACKEND_DEV_PORT}` : `http://${process.env.BACKEND_IP_PRODUCTION}` });

        await api.put(`/books/${book.book_id}`).then((res) => {
            result = res;
        }).catch((err) => {
            result = err;
        })

        return result;
    }


    public static removeBook = async (book_id: string): Promise<any> => {
        let result = false;
        let api = axios.create({ baseURL: env === "development" ? `http://localhost:${process.env.BACKEND_DEV_PORT}` : `http://${process.env.BACKEND_IP_PRODUCTION}` });

        await api.delete(`/books/${book_id}`).then((res) => {
            result = true;
            console.log("Deleted book in the backend")
            console.log(res.data)
        }).catch((err) => {
            result = err;
        })

        return result;
    }


    // ANCHOR Chapter

    public static addChapter = async (chapter: LM_Chapter): Promise<boolean> => {
        let result = false;
        let api = axios.create({ baseURL: env === "development" ? `http://localhost:${process.env.BACKEND_DEV_PORT}` : `http://${process.env.BACKEND_IP_PRODUCTION}` });

        await api.post(`/chapters`, chapter).then(() => {
            result = true;
        }).catch((err) => {
            result = err;
        })

        return result;
    }

}