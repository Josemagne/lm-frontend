import { boolean } from "yup";
import Flashcard from "../../../../classes/base/Flashcard";
import { LM_Flashcard } from "../../../../types/Flashcard/flashcard";
import { nanoid } from 'nanoid';
import { createAsyncThunk, createSlice, Slice, PayloadAction } from '@reduxjs/toolkit';
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
  // ---
  /**
   * Contains everything related to the training session
   */
  flashcardTraining: {
    /**
     * The flashcards that have stat
     */
    flashcardsForTraining: string[];
    /**
     * The flashcard that is shown at the momemt
     */
    currentFlashcard: LM_Flashcard | null;
  }
  // ---
  /**
   * The flashcards id that fit in FlashcardsFilter
   */
  filteredFlashcards: string[],
  isFiltering: boolean,
  // ---
  newFlashcard: LM_Flashcard,
  addingNewFlashcard: boolean,
  // ---
  selectedFlashcard: null | LM_Flashcard,
  /**
   * Decides if the user is training with the flashcards
   */
  isTraining: boolean,
  /**
   * The flashcards that are being revised
   */
  flashcardsForTraining: {
    [id: string]: LM_Flashcard
  }

}

const initialFlashcardState: InitialFlashcardState = {
  flashcards: {
    flashcards: {},
    loading: false,
    error: null
  },
  filteredFlashcards: [],
  flashcardTraining: {
    flashcardsForTraining: [],
    currentFlashcard: null
  },
  isFiltering: false,
  newFlashcard: new Flashcard(nanoid(), "BOOK", "", ""),
  addingNewFlashcard: false,
  selectedFlashcard: null,
  isTraining: false,
  flashcardsForTraining: {}
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
    addFlashcard: (state: InitialFlashcardState, action: PayloadAction<LM_Flashcard>) => {
      const flashcard = action.payload;
      if (!state.flashcards.flashcards) state.flashcards.flashcards = {};
      state.flashcards.flashcards[flashcard.flashcard_id] = flashcard;

      // NOTE Each new flashcard was a newFlashcard
      state.newFlashcard = new Flashcard(nanoid(), "BOOK", "", "")
    },
    updateFlashcard: (state: InitialFlashcardState, action: PayloadAction<LM_Flashcard>) => {
      const flashcard = action.payload;
      if (!state.flashcards.flashcards) return;
      state.flashcards.flashcards[flashcard.flashcard_id] = flashcard;

      // We only update the selectedFlashcard
      state.selectedFlashcard = flashcard;
    },
    deleteFlashcard: (state: InitialFlashcardState, action: PayloadAction<string>) => {
      const flashcardID = action.payload;
      if (!state.flashcards.flashcards) return;
      delete state.flashcards.flashcards[flashcardID];
    },
    changeSelectedFlashcard: (state: InitialFlashcardState, action: PayloadAction<LM_Flashcard | null>) => {
      const newSelectedFlashcard = action.payload;
      state.selectedFlashcard = newSelectedFlashcard;

      // If it is a new flashcard
      if (newSelectedFlashcard) {
        state.flashcards.flashcards[newSelectedFlashcard.flashcard_id] = newSelectedFlashcard;
      }
    },
    /**
     * Updates the 'selectedFlashcards' by mapping the values of 'flashcards' to 'selectedFlashcards' by the provided flashcard_id in the array
     * @param state 
     * @param action 
     */
    updateFilteredFlashcards: (state: InitialFlashcardState, action: PayloadAction<LM_Flashcard[]>) => {
      const updatedFilteredFlashcards = action.payload;

      state.filteredFlashcards = updatedFilteredFlashcards.map((f) => f.flashcard_id);
    },
    deleteFilteredFlashcards: (state: InitialFlashcardState, action: PayloadAction<any>) => {
      state.filteredFlashcards = []
    },
    toggleFilteringState: (state: InitialFlashcardState, action: PayloadAction<boolean>) => {
      const newState = action.payload;
      state.isFiltering = newState ?? !state.isFiltering;
    },
    changeNewFlashcard: (state: InitialFlashcardState, action: PayloadAction<LM_Flashcard>) => {
      const newFlashcard = action.payload;

      state.newFlashcard = newFlashcard
    },
    switchAddingNewFlashcardStatus: (state: InitialFlashcardState, action: PayloadAction<any>) => {
      state.addingNewFlashcard = !state.addingNewFlashcard;
    },
    toggleIsTraining: (state: InitialFlashcardState, action: PayloadAction<any>) => {
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

export const { changeNewFlashcard, addFlashcard, updateFlashcard, deleteFlashcard, changeSelectedFlashcard, switchAddingNewFlashcardStatus, updateFilteredFlashcards, deleteFilteredFlashcards, toggleFilteringState, toggleIsTraining } = flashcardSlice.actions;

export default flashcardSlice.reducer
