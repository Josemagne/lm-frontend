import axios from "axios";
import { AxiosInstance } from 'axios'
import {Constructor } from "../../types/common/constructor"
import {LM_Author }from "../../types/Book/author"

export default function AuthorAPI<TBase extends Constructor>(Base: TBase) {
  return class extends Base {

    public api: AxiosInstance = axios.create({
      baseURL: process.env.NODE_ENV === "development" ? `http://${process.env.BACKEND_IP_DEVELOPMENT}/api/v1` : `http://${process.env.BACKEND_IP_PRODUCTION}/api/v1`, headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`, 'Âccess-Control-Allow-Origin': "*"
      }
    })

    public addAuthor = async (author: LM_Author) => {
      return await this.api.post("/author", author);
    }

    public getAuthor = async (authorID: string) => {
      return await this.api.get(`/author/${authorID}`);
    }

    public getAuthors = async () => {
      return await this.api.get(`/authors`)
    }

    public updateAuthor = async (updatedAuthor: LM_Author) => {
      return await this.api.post(`/author/${updatedAuthor.author_id}`, updatedAuthor)
    }

    public deleteAuthor = async (authorID: string) => {
      return await this.api.delete(`/author/${authorID}`)
    }
  }

}

