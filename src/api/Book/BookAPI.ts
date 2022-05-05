import axios from 'axios';
import { AxiosInstance } from 'axios';
import { Constructor } from '../../types/common/constructor';
import { LM_Book } from '../../types/Book/book';

const env = process.env.NODE_ENV === "development" ? "development" : "production";

export default function BookAPI<TBase extends Constructor>(Base: TBase) {
    return class BookAPI extends Base {

        public api: AxiosInstance = axios.create({
            baseURL: env === "development" ? `http://${process.env.BACKEND_IP_DEVELOPMENT}/api/v1` : `http://${process.env.BACKEND_IP_PRODUCTION}/api/v1`, headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, "Access-Control-Allow-Origin": "*"
            }
        })

        public addBook = async (book: LM_Book) => {
            return await this.api.post("/book", book);
        }

        public getBook = async (book_id: string) => {
            return await this.api.get(`/book/${book_id}`)
        }

        public getBooks = async () => {
            const response = await this.api.get("/book");
            // @ts-ignore
            const {books} = response.data;
            return books;
        }

        public updateBook = async (book: LM_Book) => {
            return await this.api.post(`/book/${book.book_id}`, book)
        }

        public deleteBook = async (book_id: string) => {
            return await this.api.delete(`/book/${book_id}`);
        }
    }
}
