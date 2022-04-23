import BookSummaryAPI from './BookSummaryAPI';
import BookFlashcardAPI from './BookFlashcardAPI';
import axios from 'axios';
import { AxiosInstance } from 'axios';

const env = process.env.NODE_ENV === "development" ? "development" : "production";

class Book {
    private api: AxiosInstance;
    constructor(api: AxiosInstance) {
        this.api = api;
    }
}

const BookAPI = BookSummaryAPI(BookFlashcardAPI(
    Book
))

const bookAPI = new BookAPI(axios.create({
    baseURL: env === "development" ? `http://${process.env.BACKEND_IP_DEVELOPMENT}/api/bookflashcard` : `http://${process.env.BACKEND_IP_PRODUCTION}/api/bookflashcard`, headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`, "Access-Control-Allow-Origin": "*"
    }
}))

