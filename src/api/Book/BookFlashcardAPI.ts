import { Constructor } from "../../types/common/constructor";
import axios, { AxiosInstance } from 'axios';
import { LM_BookFlashcard } from "../../types/Book/bookflashcard";

const env = process.env.NODE_ENV === "development" ? "development" : "production";


function BookFlashcardAPI<TBase extends Constructor>(Base: TBase) {
    return class BookFlashcardAPI extends Base {
        public api: AxiosInstance = axios.create({
            baseURL: env === "development" ? `http://${process.env.BACKEND_IP_DEVELOPMENT}/api/bookflashcard` : `http://${process.env.BACKEND_IP_PRODUCTION}/api/bookflashcard`, headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, "Access-Control-Allow-Origin": "*"
            }
        })

        constructor(...args: any[]) {
            super(...args);
        }

        public addBookFlashcardAPI = async (newBookFlashcard: LM_BookFlashcard) => {
            return await this.api.post("/", newBookFlashcard)
        }
    }
}