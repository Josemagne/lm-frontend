import axios, { AxiosInstance } from "axios";
import { Constructor } from "../types/common/constructor";
import SummaryAPI from './Summary/SummaryAPI';
import FlashcardAPI from "./Flashcard/FlashcardAPI";
import ChapterAPI from "./Chapter/ChapterAPI";

const env = process.env.NODE_ENV === "development" ? "development" : "production";

function APIMixin<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        public api: AxiosInstance = axios.create({
            baseURL: env === "development" ? `http://${process.env.BACKEND_IP_DEVELOPMENT}/api/bookflashcard` : `http://${process.env.BACKEND_IP_PRODUCTION}/api/bookflashcard`, headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, "Access-Control-Allow-Origin": "*"
            }
        })
    }
}

const API = APIMixin(SummaryAPI(FlashcardAPI(ChapterAPI(class { }))));

export default new API();