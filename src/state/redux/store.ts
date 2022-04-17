import { configureStore } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";
import bookReducer from "./features/bookSlice";
import { Store } from 'redux';

export const store: Store = configureStore({
    reducer: {
        books: bookReducer,
    },
    middleware: [reduxThunk]
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;