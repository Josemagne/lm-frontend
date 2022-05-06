import { Constructor } from "../../types/common/constructor";
import LM_Chapter from '../../types/Book/chapter';
import axios, { AxiosInstance } from "axios";

const env = process.env.NODE_ENV === "development" ? "development" : "production";


export default function ChapterAPI<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        public api: AxiosInstance = axios.create({
            baseURL: env === "development" ? `${process.env.BACKEND_IP_DEVELOPMENT}/api/v1` : `${process.env.BACKEND_IP_PRODUCTION}/api/v1`, headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, "Access-Control-Allow-Origin": "*"
            }
        })
        public addChapter = async (chapter: LM_Chapter) => {
            return await this.api.post("/chapter", chapter)
        }

        public getChapter = async (chapter_id: string) => {
            const response = await this.api.get(`/chapter/${chapter_id}`);
            const {chapter} = response.data;
          return chapter;
        }

        public getChapters = async (book_id: string) => {
            const response = await this.api.get(`/chapters/${book_id}`);
            const {chapters} = response.data;
            console.log("The chapters from backend: ", chapters)
          return chapters;
        }

        public updateChapter = async (chapter: LM_Chapter) => {
            return await this.api.post("/chapter", chapter);
        }

        public deleteChapter = async (chapter_id: string) => {
            return await this.api.delete(`/chapter/${chapter_id}`)
        }
    }
}
