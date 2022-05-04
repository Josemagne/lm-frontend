import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { LM_Book } from "../../../types/Book/book";

const BookAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NODE_ENV === "development" ? process.env.BACKEND_IP_DEVELOPMENT : process.env.BACKEND_IP_PRODUCTION + "/api/v1",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Authorization", localStorage.getItem('token') ?? "")
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getBook: builder.query<LM_Book, string>({
      query: (id) => ({ url: `book/${id}` })
    })
  })

})

export const { useGetBookQuery } = BookAPI;
export default BookAPI;
