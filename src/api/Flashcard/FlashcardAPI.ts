import axios, { AxiosInstance } from "axios";
import { Constructor } from "../../types/common/constructor";
import { LM_Flashcard } from "../../types/Flashcard/flashcard";

const env = process.env.NODE_ENV === "development" ? "development" : "production";

export default function flashcardAPI<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        public api: AxiosInstance = axios.create({
            baseURL: env === "development" ? `${process.env.BACKEND_IP_DEVELOPMENT}/api/v1` : `${process.env.BACKEND_IP_PRODUCTION}/api/v1`, headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, "Access-Control-Allow-Origin": "*"
            }
        })


        public addFlashcard = async (flashcard: LM_Flashcard) => {
            return await this.api.post(`/flashcard`, flashcard);
        }

        public getFlashcard = async (flashcard_id: string) => {
            const response = await this.api.get(`/flashcard/${flashcard_id}`)
            const {flashcard} = response.data; 
            return  flashcard;
        }

        public getFlashcards = async (bookId: string) => {
            const response = await this.api.get(`/flashcards/${bookId}`)
            const {flashcards} = response.data;
            return flashcards;
        }

        public updateFlashcard = async (flashcard: LM_Flashcard) => {
            return await this.api.post(`/flashcard`, flashcard)
        }

        public deleteFlashcard = async (flashcard_id: string) => {
            return await this.api.delete(`/flashcard/${flashcard_id}`)
        }
    }
}
