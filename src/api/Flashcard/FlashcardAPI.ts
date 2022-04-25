import axios, { AxiosInstance } from "axios";
import { Constructor } from "../../types/common/constructor";
import { LM_Flashcard } from "../../types/Flashcard/flashcard";

const env = process.env.NODE_ENV === "development" ? "development" : "production";

export default function flashcardAPI<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        public api: AxiosInstance = axios.create({
            baseURL: env === "development" ? `http://${process.env.BACKEND_IP_DEVELOPMENT}/api` : `http://${process.env.BACKEND_IP_PRODUCTION}/api`, headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, "Access-Control-Allow-Origin": "*"
            }
        })


        public addFlashcard = async (flashcard: LM_Flashcard) => {
            return await this.api.post("/flashcard", flashcard);
        }

        public getFlashcard = async (flashcard_id: string) => {
            return await this.api.get(`/flashcard/${flashcard_id}`)
        }

        public getFlaschards = async () => {
            return await this.api.get(`/flashcard`)
        }

        public updateFlashcard = async (flashcard: LM_Flashcard) => {
            return await this.api.post(`/flashcard`, flashcard)
        }

        public deleteFlashcard = async (flashcard_id: string) => {
            return await this.api.delete(`/flashcard/${flashcard_id}`)
        }
    }
}