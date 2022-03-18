import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import books from "../../../storage/indexedDB/books";
import { LM_Book } from "../../../types/Book/book";
import Book from "../../../utils/Book";

interface BookState {
    /**
     * The books that we have in indexedDB (BookViewer) or/and backend
     */
    books: {
        loading: boolean;
        data: LM_Book[];
        error: any;
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
    // Here we let the action creators meet the reducer to resolve the new state
    reducers: {
        /**
         * Action creator that is called when we initiate the request to the backend
         */
        getBooksRequest: (state) => {
            state.books.loading = true;
            return state;
        },
        /**
         * Action creator that is called when we got the books from the backend
         */
        getBooksFulfilled: (state, action) => {
            state.books.loading = false;
            state.books.data = action.payload;
            return state;
        },

        getBooksRejected: (state, action) => {
            state.books.loading = false;
            state.books.error = action.payload;
            return state;
        },
        changeBook: (state, action) => {
            let index = 0;
            const book = state.books.data.find((book, i) => {
                book.book_id === action.payload.book_id
                index = i;
                return book;
            })
            // Remove outdated book
            state.books.data.splice(index, 1);
            if (!book) return;
            state.books.data.push(book);
            return state;
        },
        addBook: (state, action) => {
            state.books.data.push(action.payload);
            return state;
        }

    },
    // extraReducers: (builder) => {
    //     builder.addCase(getBooks.pending, (state, action) => {
    //         state.books.loading = true;
    //     }),
    //         builder.addCase(getBooks.fulfilled, (state, action) => {
    //             state.books.data = action.payload;
    //             state.books.loading = false;
    //         }),
    //         builder.addCase(getBooks.rejected, (state, action) => {
    //             state.books.loading = false;
    //             state.books.error = action.payload
    //         })


    // }
})

export const { getBooksFulfilled, getBooksRejected, getBooksRequest, addBook } = booksSlice.actions;

export default booksSlice.reducer;