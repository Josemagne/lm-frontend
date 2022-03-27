import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LM_Book } from "../../../types/Book/book"
import { createAsyncThunk } from "@reduxjs/toolkit";
import Server from '../../../services/Server';
import axios from 'axios';
import Book from '../../../storage/indexedDB/Book';
import LM_Chapter from '../../../types/Book/chapter';

interface LM_InitialState {
    books: {
        data: LM_Book[];
        /**
         * book_id strings of the books 
         */
        ids: string[],
        loading: boolean;
        error: any;
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
         * The index of the chapter in LM_Book.chapters
         */
        chapterIndex: number | null;
    },
    /**
     * Decides if we open the modal in BooksViewer
     */
    openBooksViewerModal: boolean;
}

const initialState: LM_InitialState = {
    books: {
        data: [],
        ids: [],
        loading: false,
        error: null
    },
    selectedBook: {
        book_id: null,
        book: null,
    },
    selectedChapter: {
        chapter: null,
        chapter_id: null
        , chapterIndex: null
    },
    openBooksViewerModal: false

}

/**
 * Fetches books from backend with redux thunk
 */
export const fetchBooksBackend = createAsyncThunk("books/fetchBooksBackend", async (): Promise<LM_Book[] | any> => {
    let error: any = null;
    // const data = await Server.getBooks();
    const { data } = await axios.get("http://localhost:4000/books");
    if (error) return error;
    return data;
});

/**
 * Fetches books from frontend with redux thunk
 */
export const fetchBooksFrontend = createAsyncThunk("books/fetchBooksFrontend", async (): Promise<LM_Book[] | any> => {
    let error: any = null;
    let result = await Book.getBooks().then((res) => res).catch((err) => {
        error = err;
    })
    if (error) return error;
    return result;
})

// export const addSelectedBook = createAsyncThunk("books/addSelectedBook", async (book_id: string): Promise<LM_Book | any> => {
//     let error: any = null;
//     let book = await Book.getBook(book_id).then((res) => res).catch((err) => { error = err });
//     if (error) return error;

//     if (!book) return;
//     return book;
// })

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
            const id = action.payload.book_id;

            let arrayIndex = 0;
            state.books.data.find((book, index) => {
                if (book.book_id === id) {
                    arrayIndex = index;
                    return 1;
                }
            });

            if (!arrayIndex) return;
            // Change the old book with the new book
            state.books.data[arrayIndex] = action.payload;
        },
        // ANCHOR chapter
        /**
         * Adds chapter to the book in the store
         * @param state 
         * @param action 
         */
        addChapter: (state, action: PayloadAction<{ chapter: LM_Chapter, book_id: string }>) => {
            /* BOOKS */
            state.books.data.find((book) => {
                if (book.book_id === action.payload.book_id) {
                    book.chapters.push(action.payload.chapter)
                }
                console.log("Inserted chpater in the store")
                return book;
            })

            /* SELECTEDBOOK */
            if (!state.selectedBook.book) return;
            state.selectedBook.book.chapters.push(action.payload.chapter)

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
        deleteChapter: (state, action: PayloadAction<{ chpater_id: string, book_id: string }>) => {

        },
        /* ANCHOR selectedBook */
        changeSelectedBook: (state, action: PayloadAction<{ book_id: string, book: LM_Book | null }>) => {
            state.selectedBook.book_id = action.payload.book_id;
            if (!action.payload.book) return;
            state.selectedBook.book = action.payload.book;


        },
        removeSelectedBook: (state, action) => {
            state.selectedBook.book_id = null;
            state.selectedBook.book = null;
        },
        // ANCHOR selectedChapter
        changeSelectedChapter: (state, action: PayloadAction<{ chapter_id: string, chapter: LM_Chapter }>) => {
            state.selectedBook.book?.chapters.push(action.payload.chapter)
            state.selectedChapter.chapter = action.payload.chapter;
            state.selectedChapter.chapter_id = action.payload.chapter_id;

            let index = 0;
            (state.selectedBook.book as LM_Book).chapters.find((ch, i) => {
                if (ch.chapter_id === action.payload.chapter_id) {
                    index = i;
                }
            })
            console.log("index in store", index)

            state.selectedChapter.chapterIndex = index;

        },

        removeSelectedChapter: (state, action) => {
            state.selectedChapter.chapter = null;
            state.selectedChapter.chapter_id = null;
            state.selectedChapter.chapterIndex = null;
        },
        toggleBooksViewerModal: (state, action) => {
            state.openBooksViewerModal = !state.openBooksViewerModal;
        }

    },
    extraReducers: (builder) => {
        /* ANCHOR BACKEND */
        // TODO Check metadata.notAsyncBooks if we should fetch books
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

export const { addBook, removeBook, updateBook, changeSelectedBook, removeSelectedBook, changeSelectedChapter, removeSelectedChapter, addChapter, toggleBooksViewerModal } = bookSlice.actions;

export default bookSlice.reducer; 