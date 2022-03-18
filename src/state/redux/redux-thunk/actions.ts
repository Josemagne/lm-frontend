import { Dispatch } from "redux"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux";
import Server from '../../../services/Server';

const dispatch = useDispatch();

/**
 * Loads books to redux
 */
export const loadBooks = (dispatch: Dispatch<any>) => {
    dispatch({ type: "LOAD_BOOKS_LOADING" });
    Server.getBooks()
}

export const getBooks = createAsyncThunk(
    "books/getBooks",
    async () => {
        const books = await Server.getBooks().then((books) => books);
        return books;
    }

)