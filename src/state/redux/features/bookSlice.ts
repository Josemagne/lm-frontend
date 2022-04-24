import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit"
import { LM_Book } from "../../../types/Book/book"
import { createAsyncThunk } from "@reduxjs/toolkit";
import Server from '../../../services/Server';
import axios from 'axios';
import Book from '../../../storage/indexedDB/Book';
import LM_Chapter from '../../../types/Book/chapter';
import { LM_Flashcard } from "../../../types/flashcards/flashcard";
import Flashcard from "../../../classes/base/Flashcard";
import LM_Summary from "../../../types/Book/booksummary";
import LM_BookSummary from '../../../types/Book/booksummary';
import { nanoid } from 'nanoid';
import FAPI from "../../../storage/indexedDB/FAPI";

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

    selectedChapter: {
        chapter: null | LM_Chapter;
        chapter_id: null | string;
        /**
         * The flashcard that is being edited
         */
        selectedFlashcard: null | LM_Flashcard;
        /**
         * The new flashcard that is about to be added
         */
        newFlashcard: LM_Flashcard;
    },
    summaries: {
        loading: boolean;
        error: null | string;
    },
    /**
     * Decides if we open the modal in BooksViewer
     */
    openBooksViewerModal: boolean;

    /**
     * Decides if we open the modal to modify a chapter
     */
    openChapterModifierModal: boolean;
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
    selectedChapter: {
        chapter: null,
        chapter_id: null,
        selectedFlashcard: null,
        newFlashcard: new Flashcard(nanoid(), "BOOK", "", "")
    },
    summaries: {
        loading: false,
        error: null
    },
    openBooksViewerModal: false,
    openChapterModifierModal: false

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

    const data = await api.get("/books");
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
        // ANCHOR chapter
        /**
         * Adds chapter to the book in the store
         * @param state 
         * @param action 
         */
        addChapter: (state, action: PayloadAction<{ chapter: LM_Chapter, book_id: string }>) => {
            /* BOOKS */
            // @ts-ignore
            state.books.books[action.payload.book_id].chapters[action.payload.chapter.chapter_id] = action.payload.chapter;

            /* SELECTEDBOOK */
            if (!state.selectedBook.book) return;
            // @ts-ignore
            state.selectedBook.book.chapters[action.payload.book_id] = action.payload.chapter;

        },
        /**
         * Updates chapter in the store
         * @param state 
         * @param action 
         */
        changeChapter: (state, action: PayloadAction<{ chpater: LM_Chapter, book_id: string }>) => {

        },
        /**
         * Removes chapter from the store
         * @param state 
         * @param action 
         */
        deleteChapter: (state, action: PayloadAction<{ chapter_id: string, book_id: string }>) => {


            /* selectedBook */
            if (!state.selectedBook.book) return;
            // @ts-ignore
            delete state.selectedBook.book.chapters[action.payload.chapter_id]

        },
        // ANCHOR toggleChapterState
        toggleChapterState: (state, action: PayloadAction<{ bookId: string, chapterId: string }>) => {
            const { bookId, chapterId } = action.payload;

            // @ts-ignore
            const read = state.selectedBook.book.chapters[chapterId].read;
            // @ts-ignore
            state.selectedBook.book.chapters[chapterId].read = !read;
            // @ts-ignore
            state.books.books[bookId].chapters[chapterId].read = !read;
        },
        /* ANCHOR selectedBook */
        changeSelectedBook: (state, action: PayloadAction<LM_Book | null>) => {
            state.selectedBook.book = action.payload;
        },
        removeSelectedBook: (state, action) => {
            state.selectedBook.book_id = null;
            state.selectedBook.book = null;
        },
        // ANCHOR selectedChapter
        changeSelectedChapter: (state, action: PayloadAction<{ chapter_id: string, chapter: LM_Chapter }>) => {
            // /* BOOK */
            // (state.selectedBook.book as LM_Book).chapters[action.payload.chapter_id] = action.payload.chapter;

            // /* SELECTED BOOK */
            // (state.selectedBook.book as LM_Book).chapters[action.payload.chapter_id] = action.payload.chapter;

            /* SELECTED CHAPTER */
            state.selectedChapter.chapter = action.payload.chapter;

            state.selectedChapter.chapter_id = action.payload.chapter_id;

            state.openChapterModifierModal = true;

        },

        removeSelectedChapter: (state, action) => {
            state.selectedChapter.chapter = null;
            state.selectedChapter.chapter_id = null;
            state.openChapterModifierModal = false;
        },


        // ANCHOR chapterSummary
        changeChapterSummary: (state, action: PayloadAction<{ bookId: string, chapter: LM_Chapter }>) => {
            const chapter = action.payload.chapter;
            /* books */

            /* selectedBook */
            if (!state.selectedBook.book) return;

            // NOTE Delete the previous chapter
            const previousChapterID = state.selectedChapter.chapter_id;

            // if (!previousChapterID) return;
            // delete state.selectedBook.book.chapters[previousChapterID];

            // state.selectedBook.book.chapters[chapter.chapter_id] = chapter;

            /* selectedChapter */
            state.selectedChapter.chapter = action.payload.chapter;
            state.selectedChapter.chapter_id = action.payload.chapter.chapter_id;
        },
        /**
         * 
         * @param state 
         * @param action 
         */
        addFlashcard: (state, action: PayloadAction<LM_Flashcard>) => {
            const flashcard = action.payload;

            const selectedBook = state.selectedBook.book;
            const selectedChapter = state.selectedChapter.chapter;
            const selectedFlashcard = state.selectedChapter.selectedFlashcard;
        },
        /**
         * Changes newFlashcard
         * newFlashcard is the flashcard that we want to add
         * newFlashcard != selectedFlashcard
         * @param state 
         * @param action 
         */
        changeNewFlashcard: (state, action: PayloadAction<LM_Flashcard>) => {
            state.selectedChapter.newFlashcard = action.payload;
        },
        /**
         * Changes the selected flashcard in the store
         * @param state 
         * @param action 
         */
        changeSelectedFlashCard: (state, action: PayloadAction<LM_Flashcard>) => {
            state.selectedChapter.selectedFlashcard = action.payload;
        },

        toggleChapterModifierModal: (state, action) => {
            state.openChapterModifierModal = !state.openChapterModifierModal;
            console.log(state.openChapterModifierModal)
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

export const { addBook, removeBook, updateBook, changeSelectedBook, removeSelectedBook, changeSelectedChapter, removeSelectedChapter, addChapter, toggleBooksViewerModal, changeChapterSummary, deleteChapter, toggleChapterModifierModal, changeSelectedFlashCard, changeNewFlashcard, toggleChapterState } = bookSlice.actions;

export default bookSlice.reducer; 