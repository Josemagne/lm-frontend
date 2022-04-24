import { Constructor } from "../../types/common/constructor";
import LM_Chapter from '../../types/Book/chapter';
import axios, { AxiosInstance } from "axios";

const env = process.env.NODE_ENV === "development" ? "development" : "production";


export default function ChapterAPI<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        public api: AxiosInstance = axios.create({
            baseURL: env === "development" ? `http://${process.env.BACKEND_IP_DEVELOPMENT}/api/bookflashcard` : `http://${process.env.BACKEND_IP_PRODUCTION}/api/chapter`, headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, "Access-Control-Allow-Origin": "*"
            }
        })
        public addChapter = async (chapter: LM_Chapter) => {
            return await this.api.post("/", chapter)
        }

        public getChapter = async (chapter_id: string) => {
            return await this.api.get(`/${chapter_id}`);
        }

        public getChapters = async () => {
            return await this.api.get("/");
        }

        public updateChapter = async (chapter: LM_Chapter) => {
            return await this.api.post("/", chapter);
        }

        public deleteChapter = async (chapter_id: string) => {
            return await this.api.delete(`${chapter_id}`)
        }
    }
}