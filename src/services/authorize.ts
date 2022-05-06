import axios, {AxiosInstance} from "axios";
export default async function authorize() {
  const api: AxiosInstance = axios.create({
            baseURL: process.env.NODE_ENV === "development" ? `${process.env.BACKEND_IP_DEVELOPMENT}/api/v1` : `${process.env.BACKEND_IP_PRODUCTION}/api/v1`, headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, "Access-Control-Allow-Origin": "*"
            }
        })

  const response = await api.post("/authorize", {token: localStorage.getItem("token")});
  const {result }= response.data;
  console.log("result: " , result === "success")
  return result === "success";
}
