import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useFormik } from "formik";
import { LM_Book } from "../../../types/Book/book";
import Book from "../../../utils/Book";
import LocalPersistence from '../../localpersistence/LocalPersistance';

const initialValues: LM_Book = {
    author_name: "",
    author_prename: "",
    book_id: "",
    book_title: "",
    pages: 0,
    progress: 0,
    read: false,
    summary: "",
    chapters: null,
};

export const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => Book.addBook(values)
});

interface BookState {
    /**
     * The book for BookModifier
     */
    book: typeof initialValues;
    /**
     * The books that we have in indexedDB (BookViewer)
     */
    books: LM_Book[] | {};
}

const initialState: BookState = {
    /**
     * The book for BookModifier
     */
    book: initialValues,
    /**
     * The books for BookViewer
     */
    books: {}
}

const booksSlice = createSlice({
    name: "booksSlice",
    initialState,
    // Here we create the reducer for booksSlice
    reducers: {

    }
})

export const { } = booksSlice.actions;


export default booksSlice.reducer;