import axios, { AxiosInstance } from "axios";
import { Constructor } from "../../types/common/constructor";
import { LM_Flashcard } from "../../types/flashcards/flashcard";

const env = process.env.NODE_ENV === "development" ? "development" : "production";

export default function flashcardAPI<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        public api: AxiosInstance = axios.create({
            baseURL: env === "development" ? `http://${process.env.BACKEND_IP_DEVELOPMENT}/api/bookflashcard` : `http://${process.env.BACKEND_IP_PRODUCTION}/api/flashcard`, headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, "Access-Control-Allow-Origin": "*"
            }
        })


        public addFlashcard = (flashcard: LM_Flashcard) => {
            this.api.post("/", flashcard);
        }

        public getFlashcard = () => {

        }

        public getFlaschards = () => {

        }

        public updateFlashcard = () => {

        }

        public deleteFlashcard = () => {

        }
    }
}