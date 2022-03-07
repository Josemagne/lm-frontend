import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LM_Book } from "../../../types/Book/book";

interface BookState {
    /**
     * The books that we have in indexedDB (BookViewer)
     */
    books: LM_Book[];
}

const initialState: BookState = {
    /**
     * The books for BookViewer
     */
    books: []
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
        }
    }
})

export const { addToBooks } = booksSlice.actions;


export default booksSlice.reducer;