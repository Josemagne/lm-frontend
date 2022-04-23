import { Constructor } from "../../types/common/constructor";
import axios, { AxiosInstance } from 'axios';
import { LM_BookFlashcard } from "../../types/Book/bookflashcard";

const env = process.env.NODE_ENV === "development" ? "development" : "production";


export default function BookFlashcardAPI<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        public api: AxiosInstance;

        constructor(...args: any[]) {
            super(...args);
            this.api = args[0];
        }

        public addBookFlashcardAPI = async (newBookFlashcard: LM_BookFlashcard) => {
            return await this.api.post("/", newBookFlashcard)
        }
    }
}