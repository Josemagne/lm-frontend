import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import books from "../../../storage/indexedDB/books";
import { LM_Book } from "../../../types/Book/book";
import Book from "../../../utils/Book";
import { getBooks } from '../redux-thunk/actions';

interface BookState {
    /**
     * The books that we have in indexedDB (BookViewer) or/and backend
     */
    books: {
        loading: boolean;
        data: LM_Book[];
        error: string;
    },
    /**
     * book that we treat at the moment. If none is selected then the value is null.
     */
    selectedBook: LM_Book | undefined;
}

const initialState: BookState = {
    /**
     * The books for BookViewer
     */
    books: {
        data: [],
        loading: false,
        error: ''
    },
    selectedBook: undefined,
}

const booksSlice = createSlice({
    name: "booksSlice",
    initialState,
    // Here we create the reducer for booksSlice
    reducers: {

    },
    extraReducers: {
        [getBooks.pending]: (state, action) => {
            state.books.loading = true;
        },
        "books/getBooks/fulfilled": (state, { payload }) => {
            state.books.loading = false;
        },
        "books/getBooks/rejected": (state) => {
            state.books.loading = false;
        }

    }
})

<<<<<<< HEAD
export const { } = booksSlice.actions;

=======
export const { addToBooks } = booksSlice.actions;
>>>>>>> f5caf40e7bc0ab99c76d30677981b68fcde5847f


export default booksSlice.reducer;