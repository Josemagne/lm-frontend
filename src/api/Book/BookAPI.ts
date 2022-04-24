import axios from 'axios';
import { AxiosInstance } from 'axios';
import { Constructor } from '../../types/common/constructor';
import { LM_Book } from '../../types/Book/book';

const env = process.env.NODE_ENV === "development" ? "development" : "production";

export default function BookAPI<TBase extends Constructor>(Base: TBase) {
    return class BookAPI extends Base {

        public api: AxiosInstance = axios.create({
            baseURL: env === "development" ? `http://${process.env.BACKEND_IP_DEVELOPMENT}/api/bookflashcard` : `http://${process.env.BACKEND_IP_PRODUCTION}/api/book`, headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, "Access-Control-Allow-Origin": "*"
            }
        })

        public addBook = async (book: LM_Book) => {
            return await this.api.post("/", book);
        }

        public getBook = async (book_id: string) => {
            return await this.api.get(`/${book_id}`)
        }

        public getBooks = async () => {
            return await this.api.get("/");
        }

        public updateBook = async (book: LM_Book) => {
            return await this.api.post("/", book)
        }

        public deleteBook = async (book_id: string) => {
            return await this.api.delete(`/${book_id}`);
        }
    }
}