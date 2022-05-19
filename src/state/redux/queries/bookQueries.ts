import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { LM_Book } from "../../../types/Book/book"

const bookAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === "development"
        ? process.env.BACKEND_IP_DEVELOPMENT
        : process.env.BACKEND_IP_PRODUCTION + "/api/v1",
    prepareHeaders: (headers, { getState }) => {
      // NOTE Set the header for 'Authorization'
      headers.set("Authorization", localStorage.getItem("token") ?? "")
      return headers
    },
  }),
  endpoints: (builder) => ({
    addBook: builder.mutation<{ result: string }, LM_Book>({
      query: (newBook) => ({ url: `book/${newBook.book_id}`, method: "POST" }),
    }),
    getBook: builder.query<LM_Book, string>({
      query: (id) => ({ url: `book/${id}` }),
    }),
    // NOTE The first generic arg is what we get and the second the arg that we pass to the route
    getBooks: builder.query<LM_Book[], void>({
      query: () => ({ url: `books` }),
    }),
  }),
})

export const { useGetBookQuery } = bookAPI
export default bookAPI
