import { Constructor } from "../../types/common/constructor";
import { LM_Summary, SummaryType } from '../../types/summary/summary';
import axios, { AxiosInstance } from 'axios';

const env = process.env.NODE_ENV === "development" ? "development" : "production";

function SummaryAPI<TBase extends Constructor>(Base: TBase) {
    return class extends Base {

        public api: AxiosInstance = axios.create({
            baseURL: env === "development" ? `http://${process.env.BACKEND_IP_DEVELOPMENT}/api` : `http://${process.env.BACKEND_IP_PRODUCTION}/api`, headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, "Access-Control-Allow-Origin": "*"
            }
        })

        public addSummary = async (summary: LM_Summary) => {
            return await this.api.post("/summary", summary);
        }

        /* ANCHOR GET */
        public getSummary = async (summary_id: string) => {
            return await this.api.get(`/summary/${summary_id}`)
        }

        public updateSummary = async (summary: LM_Summary) => {
            return await this.api.post(`/summary`, summary)
        }
    }
}

export default SummaryAPI;