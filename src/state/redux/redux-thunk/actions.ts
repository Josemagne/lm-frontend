import { Dispatch } from "redux"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux";
import Server from '../../../services/Server';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { AppDispatch } from '../store';
import { getBooksFulfilled, getBooksRequest } from "../features/bookSlice";

const dispatch = useDispatch();

/**
 * Loads books to redux
 */
export const loadBooks = (useAppDispatch: AppDispatch) => {
    // Start request
    useAppDispatch(getBooksRequest());
    Server.getBooks().then((res) => {
        const books = res;
        useAppDispatch(getBooksFulfilled(books));
    }).catch((err) => {
        const error = err.message;
        useAppDispatch(error);
    })
}

export const changeBook = (useAppDispatch: AppDispatch) => {

}

// export const getBooks = createAsyncThunk(
//     "books/getBooks",
//     async () => {
//         const books = await Server.getBooks().then((books) => books).catch((err) => err)
//         return books;
//     }

// )