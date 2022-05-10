import { boolean } from "yup";
import Flashcard from "../../../../classes/base/Flashcard";
import { LM_Flashcard } from "../../../../types/Flashcard/flashcard";
import { nanoid } from 'nanoid';
import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import axios from "axios";
import FAPI from '../../../../storage/indexedDB/FAPI';
import API from "../../../../api/API";

interface InitialFlashcardState {
  flashcards: {
    flashcards: {
      [flashcard_id: string]: LM_Flashcard;
    },
    loading: boolean,
    error: string | null
  },
  newFlashcard: LM_Flashcard,
  selectedFlashcard: null | LM_Flashcard,
  /**
   * Decides if the user is training with the flashcards
   */
  isTraining: boolean
}

const initialFlashcardState: InitialFlashcardState = {
  flashcards: {
    flashcards: {},
    loading: false,
    error: null
  },
  newFlashcard: new Flashcard(nanoid(), "BOOK", "", ""),
  selectedFlashcard: null,
  isTraining: false
}

export const fetchFlashcardsBackend = createAsyncThunk("flashcardsBackend", async (bookId: string): Promise<LM_Flashcard[] | any> => {
  let error: any = null;

  const flashcards = await API.getFlashcards(bookId);

  return flashcards;
})

//export const fetchFlashcardsFrontend = createAsyncThunk("flashcardsFrontend/", async (): Promise<LM_Flashcard[]> => {

//const flashcards = await FAPI.getFlashcards("ANY");

//return flashcards;
//})


export const flashcardSlice: Slice<InitialFlashcardState> = createSlice({
  name: "flashcard",
  initialState: initialFlashcardState,
  reducers: {
    addFlashcard: (state, action) => {
      const flashcard = action.payload;
      if (!state.flashcards.flashcards) state.flashcards.flashcards = {};
      state.flashcards.flashcards[flashcard.flashcard_id] = flashcard;

      // NOTE Each new flashcard was a newFlashcard
      state.newFlashcard = new Flashcard(nanoid(), "BOOK", "", "")
    },
    updateFlashcard: (state, action) => {
      const flashcard = action.payload;
      if (!state.flashcards.flashcards) return;
      state.flashcards.flashcards[flashcard.flashcard_id] = flashcard;

      // We only update the selectedFlashcard
      state.selectedFlashcard = flashcard;
    },
    deleteFlashcard: (state, action) => {
      const flashcardID = action.payload;
      if (!state.flashcards.flashcards) return;
      delete state.flashcards.flashcards[flashcardID];
    },
    changeSelectedFlashcard: (state, action) => {
      const newSelectedFlashcard: LM_Flashcard = action.payload;
      state.selectedFlashcard = newSelectedFlashcard;

      // If it is a new flashcard
      if (newSelectedFlashcard) {
        state.flashcards.flashcards[newSelectedFlashcard.flashcard_id] = newSelectedFlashcard;
      }
    },
    changeNewFlashcard: (state, action) => {
      const newFlashcard = action.payload;

      state.newFlashcard = newFlashcard
    },
    switchTrainingStatus: (state, action) => {
      state.isTraining = !state.isTraining;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFlashcardsBackend.pending, (state, action) => {
      state.flashcards.loading = true;
    }),
      builder.addCase(fetchFlashcardsBackend.fulfilled, (state, action) => {
        const flashcards = action.payload;
        state.flashcards.flashcards = {};

        flashcards.forEach((flashcard: LM_Flashcard) => {
          // @ts-ignore
          state.flashcards.flashcards[flashcard.flashcard_id] = flashcard;
        })

      }),
      builder.addCase(fetchFlashcardsBackend.rejected, (state, action) => {
        state.flashcards.loading = false;
        state.flashcards.error = action.payload as string;
      })
    //builder.addCase(fetchFlashcardsFrontend.pending, (state, action) => {
    //state.flashcards.loading = true;
    //}),
    //builder.addCase(fetchFlashcardsFrontend.fulfilled, (state, action) => {
    //if (!state.flashcards.flashcards) state.flashcards.flashcards = {};
    //const flashcards: LM_Flashcard[] = action.payload;

    //flashcards.forEach((flashcard) => {
    // @ts-ignore
    //if (state.flashcards.flashcards[flashcard.flashcard_id]) {
    //  @ts-ignore
    //state.flashcards.flashcards[flashcard.flashcard_id] = flashcard;
    //}
    //})
    //}),
    //builder.addCase(fetchFlashcardsFrontend.rejected, (state, action) => {
    //state.flashcards.error = action.payload as string;
    //state.flashcards.loading = false;
    //})

  }
})

export const { changeNewFlashcard, addFlashcard, updateFlashcard, deleteFlashcard, changeSelectedFlashcard } = flashcardSlice.actions;

export default flashcardSlice.reducer
