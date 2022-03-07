import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useFormik } from "formik";
import { LM_Book } from "../../../types/Book/book";
import Book from "../../../utils/Book";
import LocalPersistence from '../../localpersistence/LocalPersistance';
import Server from '../../../services/Server';
import * as yup from "yup";

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

/**
 * Contains the form data and how it is changed
 */
export const formik = useFormik({
    initialValues: initialValues,
    /**
     * Persists the data locally and on the backend
     * @param values LM_Book
     */
    onSubmit: (values) => {
        // Persists locally
        Book.addBook(values);
        // Persist on backend
        Server.addBook(values);
    },
    validationSchema: yup.object({
        author_name: yup.string().max(30, "Must be 30 characters or less").required("required")
    })
});

interface BookState {
    /**
     * The book for BookModifier
     */
    book: typeof initialValues;
    /**
     * The books that we have in indexedDB (BookViewer)
     */
    books: LM_Book[];
}

const initialState: BookState = {
    /**
     * The book for BookModifier
     */
    book: initialValues,
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
        addToBooks: () => {

        }
    }
})

export const { } = booksSlice.actions;


export default booksSlice.reducer;