import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit"
import { LM_Book } from "../../../types/Book/book"
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import LM_Chapter from '../../../types/Book/chapter';
import { LM_Flashcard } from "../../../types/Flashcard/flashcard";
import Flashcard from "../../../classes/base/Flashcard";
import { nanoid } from 'nanoid';
import FAPI from "../../../storage/indexedDB/FAPI";
import Book from '../../../classes/Book';
import API from "../../../api/API"
//import useAppDispatch from "../../../hooks/useAppDispatch"

//const dispatch = useAppDispatch()

interface InitialBookState {
    books: {
        books: {
            [id: string]: LM_Book;
        };
        /**
         * book_id strings of the books 
         */
        book_ids: string[],
        loading: boolean;
        error: any;
        amountOfBooks: number;
    },
    /**
     * Id of the particular book that is being focused upon
     */
    selectedBook: LM_Book | null;

    newBook: LM_Book;
    /**
     * Decides if we show the BookModifier Modal
     */
    addingNewBook: boolean;

}

const initialState: InitialBookState = {
    books: {
        books: {},
        book_ids: [],
        loading: false,
        error: null,
        amountOfBooks: 0
    },
    selectedBook: null,
    newBook: new Book(nanoid(), "", "", "", 0, 0, ""),
    addingNewBook: false,
}

/**
 * Fetches books from backend with redux thunk
 */
export const fetchBooksBackend = createAsyncThunk("books/fetchBooksBackend", async (): Promise<LM_Book[] | any> => {
    const books = await API.getBooks();
    return books;
});


/**
 * Fetches books from frontend with redux thunk
 */
export const fetchBooksFrontend = createAsyncThunk("books/fetchBooksFrontend", async (): Promise<LM_Book[] | any> => {
    let error: any = null;
    const result = await FAPI.getBooks().then((res) => res).catch((err) => {
        error = err;
    })
    if (error) return error;
    return result;
})

export const bookSlice: Slice<InitialBookState> = createSlice({
    name: "books",
    initialState: initialState,
    reducers: {
        addBook: (state, action: PayloadAction<LM_Book>) => {
            const book = action.payload;
            state.books.books[book.book_id] = book;
        },
        removeBook: (state, action: PayloadAction<string>) => {
            delete state.books.books[action.payload];
        },
        updateBook: (state, action: PayloadAction<LM_Book>) => {
            const book = action.payload;
            state.books.books[book.book_id] = book;
        },
        toggleAddingNewBook: (state, action) => {
            state.addingNewBook = !state.addingNewBook
        },
        /* ANCHOR selectedBook */
        changeSelectedBook: (state, action: PayloadAction<LM_Book | null>) => {
            const updatedBook = action.payload;
            state.selectedBook = updatedBook;
            if (updatedBook) state.books.books[updatedBook.book_id] = updatedBook;
        },
        deleteSelectedBook: (state: InitialBookState, action: PayloadAction<any>) => {
            if (!state.selectedBook) return;

            const selectedBookID = state.selectedBook.book_id;

            delete state.books.books[selectedBookID];

            state.selectedBook = null;
        },
    },
    extraReducers: (builder) => {
        /* ANCHOR BACKEND */
        builder.addCase(fetchBooksBackend.pending, (state, action) => {
            state.books.loading = true;
        }),
            builder.addCase(fetchBooksBackend.fulfilled, (state, action: PayloadAction<LM_Book[]>) => {

                const books = action.payload;
                console.log("books in redux: ", books)
                action.payload.forEach((book) => {
                    if (!state.books.books[book.book_id]) {
                        state.books.books[book.book_id] = book;
                    }
                })
                state.books.amountOfBooks = action.payload.length;
                state.books.loading = false;
            }),
            builder.addCase(fetchBooksBackend.rejected, (state, action) => {
                state.books.loading = false;
                state.books.error = action.payload;
            })


        /* ANCHOR FRONTEND BOOKS */
        // Get books from indexedDB
        builder.addCase(fetchBooksFrontend.pending, (state, action) => {
            state.books.loading = true;
        }),
            builder.addCase(fetchBooksFrontend.fulfilled, (state, action: PayloadAction<LM_Book[]>) => {
                action.payload.forEach((book) => {
                    if (!state.books.books[book.book_id]) {
                        state.books.books[book.book_id] = book;
                    }
                })
                state.books.loading = false;
                if (state.books.amountOfBooks > action.payload.length) {
                    state.books.amountOfBooks = action.payload.length;
                }
            }),
            builder.addCase(fetchBooksFrontend.rejected, (state, action) => {
                state.books.loading = false;
                state.books.error = action.payload;
            })


    }
})

export const { addBook, removeBook, updateBook, changeSelectedBook, deleteSelectedBook, toggleAddingNewBook } = bookSlice.actions;

export default bookSlice.reducer; 
