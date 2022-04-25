import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit"
import { LM_Book } from "../../../types/Book/book"
import { createAsyncThunk } from "@reduxjs/toolkit";
import Server from '../../../services/Server';
import axios from 'axios';
import LM_Chapter from '../../../types/Book/chapter';
import { LM_Flashcard } from "../../../types/Flashcard/flashcard";
import Flashcard from "../../../classes/base/Flashcard";
import { nanoid } from 'nanoid';
import FAPI from "../../../storage/indexedDB/FAPI";
import Book from '../../../classes/Book';

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
    selectedBook: {
        book_id: string | null;
        book: LM_Book | null;
    }

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
    selectedBook: {
        book_id: null,
        book: null,
    },
    newBook: new Book(nanoid(), "", "", "", 0, false, 0, ""),
    addingNewBook: false,
}

/**
 * Fetches books from backend with redux thunk
 */
export const fetchBooksBackend = createAsyncThunk("books/fetchBooksBackend", async (): Promise<LM_Book[] | any> => {
    let error: any = null;
    // const data = await Server.getBooks();
    let api = axios.create({
        baseURL: process.env.NODE_ENV === "development" ? `http://${process.env.BACKEND_DEV_PORT}/api` : `http://${process.env.BACKEND_IP_PRODUCTION}/api`, headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

    const data = await api.get("/book");
    if (error) return error;
    return data.data.books;
});


/**
 * Fetches books from frontend with redux thunk
 */
export const fetchBooksFrontend = createAsyncThunk("books/fetchBooksFrontend", async (): Promise<LM_Book[] | any> => {
    let error: any = null;
    let result = await FAPI.getBooks().then((res) => res).catch((err) => {
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
            state.selectedBook.book = action.payload;
        },
        removeSelectedBook: (state, action) => {
            state.selectedBook.book_id = null;
            state.selectedBook.book = null;
        },
    },
    extraReducers: (builder) => {
        /* ANCHOR BACKEND */
        // TODO Check metadata.notAsyncBooks if we should fetch books
        builder.addCase(fetchBooksBackend.pending, (state, action) => {
            state.books.loading = true;
        }),
            builder.addCase(fetchBooksBackend.fulfilled, (state, action: PayloadAction<LM_Book[]>) => {

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
                state.books.amountOfBooks = action.payload.length;
            }),
            builder.addCase(fetchBooksFrontend.rejected, (state, action) => {
                state.books.loading = false;
                state.books.error = action.payload;
            })


    }
})

export const { addBook, removeBook, updateBook, changeSelectedBook, removeSelectedBook, changeSelectedChapter, removeSelectedChapter, addChapter, toggleBooksViewerModal, changeChapterSummary, deleteChapter, toggleChapterModifierModal, changeSelectedFlashCard, changeNewFlashcard, toggleChapterState, toggleAddingNewBook } = bookSlice.actions;

export default bookSlice.reducer; 