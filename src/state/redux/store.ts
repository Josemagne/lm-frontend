import { configureStore } from "@reduxjs/toolkit"
import bookReducer from "./features/bookSlice"
import { Store } from "redux"
import chapterReducer from "./features/chapterSlice"
import summaryReducer from "./features/summarySlice/summarySlice"
import flashcardReducer from "./features/Flashcard/flashcardSlice"
import noteReducer from "./features/noteSlice"
import { noteAPI } from "./queries/noteQueries"
import authReducer from "./features/authSlice"
import characterSlice from './features/characterSlice';
import citationSlice from './features/citationSlice';
import vocabularySlice from "./features/vocabularySlice"

// @ts-ignore
export const store: Store = configureStore({
  reducer: {
    books: bookReducer,
    chapters: chapterReducer,
    summaries: summaryReducer,
    flashcards: flashcardReducer,
    [noteAPI.reducerPath]: noteAPI.reducer,
    notes: noteReducer,
    auth: authReducer,
    character: characterSlice,
    citation: citationSlice,
    vocabulary: vocabularySlice
  },
  // NOTE gDM: getDefaultMiddleware
  middleware: (gDM) =>
    gDM({
      thunk: true,
      serializableCheck: false,
    }).concat(noteAPI.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
