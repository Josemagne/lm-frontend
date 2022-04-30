// @ts-nocheck
import axios, { AxiosInstance } from "axios";
import { LM_Book } from "../types/Book/book";
import { nanoid } from 'nanoid';
import LM_Chapter from '../types/Book/chapter';
import LM_Summary from '../types/Book/booksummary';
import { LM_BookFlashcard } from "../types/Book/bookflashcard";


const env = process.env.NODE_ENV;

// const api = axios.create({
//     baseURL: env === "development" ? `http://localhost:${process.env.BACKEND_DEV_PORT}` : `http://${process.env.BACKEND_IP_PRODUCTION}`, headers: {
//         "Authorization": `Bearer ${localStorage.getItem("token")}`
//     }
// });




// Create an axios instance

// TODO Rename the class
export default class Server {

    /**
     * Gets book from server
     */
    public static getBook = async (book_id: string): Promise<any> => {
        const api = axios.create({
            baseURL: env === "development" ? `http://${process.env.BACKEND_IP_DEVELOPMENT}/api` : `http://${process.env.BACKEND_IP_PRODUCTION}/api`, headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, "Access-Control-Allow-Origin": "*"
            }
        });
        const book = await api.get(`/books/${book_id}`).then((book) => {
            console.log("got the book!")
            return book;
        })

        return book.data;

    }

    /**
     * Gets all the books from the server
     */
    public static getBooks = async (): Promise<any> => {


        const api = axios.create({
            baseURL: env === "development" ? `http://${process.env.BACKEND_IP_DEVELOPMENT}/api` : `http://${process.env.BACKEND_IP_PRODUCTION}/api`, headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, "Access-Control-Allow-Origin": "*"
            }
        });
        // TODO Use the id and look if the user is logged in. Then we will return the books!
        const books = await api.get(`/books`).then((books) => {
            console.log("Got the books from the server.")
            return books;
        })

        return books.data;
    }




    public static addBook = async (book: LM_Book) => {
        if (book.pages === null) book.pages = 0;

        console.log("token: ", localStorage.getItem("token"))
        const api = axios.create({

            baseURL: env === "development" ? `http://${process.env.BACKEND_IP_DEVELOPMENT}/api` : `http://${process.env.BACKEND_IP_PRODUCTION}/api`,


            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, "Access-Control-Allow-Origin": "*"
            }
        });

        return await api.post("/books", book)
    }

    public static updateBook = async (book: LM_Book): Promise<any> => {
        let result: any;
        const api = axios.create({
            baseURL: env === "development" ? `http://${process.env.BACKEND_IP_DEVELOPMENT}/api` : `http://${process.env.BACKEND_IP_PRODUCTION}/api`, headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, "Access-Control-Allow-Origin": "*"
            }
        });


        await api.put(`/books/${book.book_id}`).then((res) => {
            result = res;
        }).catch((err) => {
            result = err;
        })

        return result;
    }


    public static removeBook = async (book_id: string): Promise<any> => {
        const api = axios.create({
            baseURL: env === "development" ? `http://${process.env.BACKEND_IP_DEVELOPMENT}/api` : `http://${process.env.BACKEND_IP_PRODUCTION}/api`, headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, "Access-Control-Allow-Origin": "*"
            }
        });
        let result = false;

        await api.delete(`/books/${book_id}`).then((res) => {
            result = true;
        }).catch((err) => {
            result = err;
        })

        return result;
    }


    // ANCHOR Chapter

    public static addChapter = async (chapter: LM_Chapter): Promise<boolean> => {
        const api = axios.create({
            baseURL: env === "development" ? `http://${process.env.BACKEND_IP_DEVELOPMENT}/api` : `http://${process.env.BACKEND_IP_PRODUCTION}/api`, headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, "Access-Control-Allow-Origin": "*"
            }
        });
        let result = false;

        await api.post(`/chapters`, chapter).then(() => {
            result = true;
        }).catch((err) => {
            result = err;
        })

        return result;
    }

    public static getChapters = async (): Promise<LM_Chapter[]> => {
        const api = axios.create({
            baseURL: env === "development" ? `http://${process.env.BACKEND_IP_DEVELOPMENT}/api` : `http://${process.env.BACKEND_IP_PRODUCTION}/api`, headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, "Access-Control-Allow-Origin": "*"
            }
        });

        return await api.get("/chapters");
    }

    public static updateChapter = async (chapter: LM_Chapter): Promise<LM_Chapter> => {
        const api = axios.create({
            baseURL: env === "development" ? `http://${process.env.BACKEND_IP_DEVELOPMENT}/api` : `http://${process.env.BACKEND_IP_PRODUCTION}/api`, headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, "Access-Control-Allow-Origin": "*"
            }
        });

        return await api.post(`/chapters/${chapter.chapter_id}`, chapter);
    }

    public static deleteChapter = async (chapter_id: string): Promise<LM_Chapter> => {
        const api = axios.create({
            baseURL: env === "development" ? `http://${process.env.BACKEND_IP_DEVELOPMENT}/api` : `http://${process.env.BACKEND_IP_PRODUCTION}/api`, headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, "Access-Control-Allow-Origin": "*"
            }
        });

        return api.delete(`/chapters/${chapter_id}`, chapter_id);
    }

    // ANCHOR BookSummary
    public static getBookSummaries = async (): Promise<LM_Summary[]> => {
        const api = axios.create({
            baseURL: env === "development" ? `http://${process.env.BACKEND_IP_DEVELOPMENT}/api` : `http://${process.env.BACKEND_IP_PRODUCTION}/api`, headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, "Access-Control-Allow-Origin": "*"
            }
        });

        return await api.get("/summaries");

    }

    public static addBookSummary = async () => {

    }

    public static updateBookSummary = async () => {

    }

    public static deleteBookSummary = async () => {

    }

    // ANCHOR ChapterSummary
    public static getChapterSummary = async () => {

    }

    public static updateChapterSummary = async () => {

    }

    public static deleteChapterSummary = async () => {

    }


    // ANCHOR BookFlashcard
    public static addBookFlashcard = async (newBookFlashcard: LM_BookFlashcard) => {

    }

    public static getBookFlashcards = async () => {

    }

    public static updateBookFlashcard = async () => {

    }

    public static deleteBookFlashcard = async () => {

    }

    // ANCHOR ChapterFlashcard
    public static addChapterFlashcard = async () => {

    }
    public static getChapterFlashcards = async () => {

    }

    public static updateChapterFlashcard = async () => {

    }

    public static deleteChapterFlashcard = async () => {

    }



}