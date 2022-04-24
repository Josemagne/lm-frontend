import { boolean } from "yup";
import Flashcard from "../../../../classes/base/Flashcard";
import { LM_Flashcard } from "../../../../types/flashcards/flashcard";
import { nanoid } from 'nanoid';
import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import axios from "axios";
import FAPI from '../../../../storage/indexedDB/FAPI';

interface InitialFlashcardState {
    flashcards: {
        flashcards: {
            [flashcard_id: string]: LM_Flashcard;
        },
        loading: boolean,
        error: string | null
    },
    newFlashcard: LM_Flashcard,
    selectedFlashcard: null | LM_Flashcard
}

const initialFlashcardState: InitialFlashcardState = {
    flashcards: {
        flashcards: {

        },
        loading: false,
        error: null
    },
    newFlashcard: new Flashcard(nanoid(), "BOOK", "", ""),
    selectedFlashcard: null
}

export const fetchFlashcardsBackend = createAsyncThunk("flashcardsBackend", async (): Promise<LM_Flashcard[] | any> => {
    let error: any = null;

    let api = axios.create({
        baseURL: process.env.NODE_ENV === "development" ? `http://${process.env.BACKEND_DEV_PORT}/api` : `http://${process.env.BACKEND_IP_PRODUCTION}/api`, headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

    const flashcards = await api.get("/flashcard");

    return flashcards;
})

export const fetchFlashcardsFrontend = createAsyncThunk("flashcardsFrontend/", async (): Promise<LM_Flashcard[]> => {

    const flashcards = await FAPI.getFlashcards("ANY");

    return flashcards;
})


export const flashcardSlice: Slice<InitialFlashcardState> = createSlice({
    name: "flashcard",
    initialState: initialFlashcardState,
    reducers: {
        addFlashcard: (state, action) => {
            const flashcard = action.payload;
            state.flashcards.flashcards[flashcard.flashcard_id] = flashcard;

            // NOTE Each new flashcard was a newFlashcard
            state.newFlashcard = new Flashcard(nanoid(), "ANY", "", "")
        },
        updateFlashcard: (state, action) => {
            const flashcard = action.payload;
            state.flashcards.flashcards[flashcard.flashcard_id] = flashcard;

            // We only update the selectedFlashcard
            state.selectedFlashcard = flashcard;
        },
        deleteFlashcard: (state, action) => {
            const flashcardID = action.payload;

            delete state.flashcards.flashcards[flashcardID];
        },



    },
    extraReducers: (builder) => {
        builder.addCase(fetchFlashcardsBackend.pending, (state, action) => {
            state.flashcards.loading = true;
        }),
            builder.addCase(fetchFlashcardsBackend.fulfilled, (state, action) => {

            }),
            builder.addCase(fetchFlashcardsBackend.rejected, (state, action) => {
                state.flashcards.loading = false;
                state.flashcards.error = action.payload as string;
            })

    }
})