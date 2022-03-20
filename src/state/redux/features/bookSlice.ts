import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LM_Book } from "../../../types/Book/book"
import { createAsyncThunk } from "@reduxjs/toolkit";
import Server from '../../../services/Server';
import axios from 'axios';

interface InitialState {
    books: {
        data: LM_Book[];
        loading: boolean;
        error: any;
    }
}

const initialState: InitialState = {
    books: {
        data: [],
        loading: false,
        error: null
    }

}


export const fetchBooks = createAsyncThunk("books/fetchBooks", async (): Promise<LM_Book[] | any> => {
    let error: any = null;
    // const data = await Server.getBooks();
    const { data } = await axios.get("http://localhost:4000/books");
    if (error) return error;
    return data;
});

export const bookSlice = createSlice({
    name: "books",
    initialState: initialState,
    reducers: {
        addBook: (state, action: PayloadAction<LM_Book>) => {

        },
        removeBook: (state, action: PayloadAction<string>) => {

        },
        updateBook: (state, action: PayloadAction<LM_Book>) => {

        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBooks.pending, (state, action) => {
            state.books.loading = true;
        }),
            builder.addCase(fetchBooks.fulfilled, (state, action) => {
                state.books.loading = false;
                console.log("books: ", action.payload)
                state.books.data.push(...action.payload)
                // if there are no books yet
            }),
            builder.addCase(fetchBooks.rejected, (state, action) => {
                state.books.loading = false;
                state.books.error = action.payload;
            })

    }
})

export const { addBook, removeBook, updateBook } = bookSlice.actions;

export default bookSlice.reducer; 