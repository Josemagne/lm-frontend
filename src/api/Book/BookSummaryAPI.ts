import axios from 'axios';
import LM_BookSummary from '../../types/Book/booksummary';
import { AxiosInstance } from 'axios';
import { Constructor } from '../../types/common/constructor';

const env = process.env.NODE_ENV === "development" ? "development" : "production";


export default function BookSummaryAPI<TBase extends Constructor>(Base: TBase) {

    return class extends Base {

        public api: AxiosInstance;

        constructor(...args: any[]) {
            super(...args);
            this.api = axios.create({
                baseURL: env === "development" ? `http://${process.env.BACKEND_IP_DEVELOPMENT}/api` : `http://${process.env.BACKEND_IP_PRODUCTION}/api`, headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`, "Access-Control-Allow-Origin": "*"
                }
            });
        }

        public addBookSummary = async (newBookSummary: LM_BookSummary) => {
            return await this.api.post("/booksummary", newBookSummary);
        }

        public getBookSummary = async (bookSummaryID: string) => {
            return await this.api.get(bookSummaryID)
        }

        public getBookSummaries = async () => {

        }

        public updateBookSummary = async () => {

        }

        public deleteBookSummary = async () => {

        }
    }
}