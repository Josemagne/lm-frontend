import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LM_Book } from "../../../types/Book/book"
import { createAsyncThunk } from "@reduxjs/toolkit";
import Server from '../../../services/Server';
import axios from 'axios';
import Book from '../../../storage/indexedDB/Book';

interface InitialState {
    books: {
        data: LM_Book[];
        /**
         * book_id strings of the books 
         */
        ids: string[],
        loading: boolean;
        error: any;
    }
}

const initialState: InitialState = {
    books: {
        data: [],
        ids: [],
        loading: false,
        error: null
    }

}


export const fetchBooksBackend = createAsyncThunk("books/fetchBooksBackend", async (): Promise<LM_Book[] | any> => {
    let error: any = null;
    // const data = await Server.getBooks();
    const { data } = await axios.get("http://localhost:4000/books");
    if (error) return error;
    return data;
});

export const fetchBooksFrontend = createAsyncThunk("books/fetchBooksFrontend", async (): Promise<LM_Book[] | any> => {
    let error: any = null;
    let result = await Book.getBooks().then((res) => res).catch((err) => {
        error = err;
    })
    if (error) return error;
    return result;
})

export const bookSlice = createSlice({
    name: "books",
    initialState: initialState,
    reducers: {
        addBook: (state, action: PayloadAction<LM_Book>) => {

        },
        removeBook: (state, action: PayloadAction<string>) => {
            state.books.data.filter((book, index) => {
                if (book.book_id === action.payload) {
                    state.books.data.splice(index, 1);
                }
            })
        },
        updateBook: (state, action: PayloadAction<LM_Book>) => {

        }
    },
    extraReducers: (builder) => {
        /* ANCHOR BACKEND */
        builder.addCase(fetchBooksBackend.pending, (state, action) => {
            state.books.loading = true;
        }),
            builder.addCase(fetchBooksBackend.fulfilled, (state, action: PayloadAction<LM_Book[]>) => {
                state.books.loading = false;
                action.payload.forEach((book) => {
                    if (!state.books.ids.includes(book.book_id)) {
                        state.books.ids.push(book.book_id)
                        state.books.data.push(book)
                    }
                })
            }),
            builder.addCase(fetchBooksBackend.rejected, (state, action) => {
                state.books.loading = false;
                state.books.error = action.payload;
            })


        /* ANCHOR FRONTEND */
        // Get books from indexedDB
        builder.addCase(fetchBooksFrontend.pending, (state, action) => {
            state.books.loading = true;
        }),
            builder.addCase(fetchBooksFrontend.fulfilled, (state, action: PayloadAction<LM_Book[]>) => {
                state.books.loading = false;
                action.payload.forEach((book) => {
                    if (!state.books.ids.includes(book.book_id)) {
                        state.books.ids.push(book.book_id)
                        state.books.data.push(book);
                    }
                })
            }),
            builder.addCase(fetchBooksFrontend.rejected, (state, action) => {
                state.books.loading = false;
                state.books.error = action.payload;
            })
    }
})

export const { addBook, removeBook, updateBook } = bookSlice.actions;

export default bookSlice.reducer; 