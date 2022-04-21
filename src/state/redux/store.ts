import { configureStore } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";
import bookReducer from "./features/bookSlice";
import { Store } from 'redux';
import chapterReducer from "./features/chapterSlice"

// @ts-ignore
export const store: Store = configureStore({
    reducer: {
        books: bookReducer,
        chapters: chapterReducer
    },
    middleware: [reduxThunk]
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;