import { configureStore, Store } from "@reduxjs/toolkit";
import bookReducer from "./features/bookSlice";

export const store: Store = configureStore({
    // Here we unite our reducers
    reducer: {
        book: bookReducer
    }
})

/**
 * State of our app
 */
export type RooteState = ReturnType<typeof store.getState>;

/**
 * Type of the dispatch
 */
export type AppDispatch = typeof store.dispatch;


