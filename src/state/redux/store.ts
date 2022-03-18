import { configureStore, Store, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import bookReducer from "./features/bookSlice";

export const store: Store = configureStore({
    middleware: [thunk],
    // Here we unite our reducers
    reducer: {
        book: bookReducer
    }
})

/**
 * State of our app
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Type of the dispatch
 */
export type AppDispatch = typeof store.dispatch;


