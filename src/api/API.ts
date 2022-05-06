import { Constructor } from "../types/common/constructor";
import SummaryAPI from './Summary/SummaryAPI';
import FlashcardAPI from "./Flashcard/FlashcardAPI";
import ChapterAPI from "./Chapter/ChapterAPI";
import BookAPI from "./Book/BookAPI";
import AuthorAPI from "./Author/AuthorAPI"
import axios, { AxiosInstance } from "axios";

const env = process.env.NODE_ENV === "development" ? "development" : "production";

function APIMixin<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        public api: AxiosInstance = axios.create({
            baseURL: env === "development" ? `${process.env.BACKEND_IP_DEVELOPMENT}/api/v1` : `${process.env.BACKEND_IP_PRODUCTION}/api/v1`, headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, "Access-Control-Allow-Origin": "*"
            }
        })
    }
}

const API = APIMixin(SummaryAPI(FlashcardAPI(ChapterAPI(BookAPI(AuthorAPI(class {}))))));

export default new API();
