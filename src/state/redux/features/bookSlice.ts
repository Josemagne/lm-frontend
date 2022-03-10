import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import books from "../../../storage/indexedDB/books";
import { LM_Book } from "../../../types/Book/book";

interface BookState {
    /**
     * The books that we have in indexedDB (BookViewer) or/and backend
     */
    books: LM_Book[];
    /**
     * String of the selected book that we will show in the modal. If none is selected then the value is null.
     */
    selectedBook: string | null;
    selectedBookObject: LM_Book | null;
}

const initialState: BookState = {
    /**
     * The books for BookViewer
     */
    books: [],
    selectedBook: null,
    selectedBookObject: null
}

const booksSlice = createSlice({
    name: "booksSlice",
    initialState,
    // Here we create the reducer for booksSlice
    reducers: {
        /**
         * Adds a LM_§Book object to the store
         */
        addToBooks: (state, action: PayloadAction<LM_Book>) => {
            state.books.push(action.payload)
            return state;
        },
        // selectedBook
        addSelectedBook: (state, action: PayloadAction<string>) => {
            state.selectedBook = action.payload;
            books.books.get(action.payload).then((book) => {
                if (book) state.selectedBookObject = book;
            })
            return state;
        },
        removeSelectedBook: (state, action) => {
            state.selectedBook = null;
            state.selectedBookObject = null;
            return state;
        }
    }
})

export const { addToBooks, addSelectedBook, removeSelectedBook } = booksSlice.actions;


export default booksSlice.reducer;