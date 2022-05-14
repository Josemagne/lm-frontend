import { boolean } from "yup";
import Flashcard from "../../../../classes/base/Flashcard";
import { LM_Flashcard } from "../../../../types/Flashcard/flashcard";
import { nanoid } from 'nanoid';
import { createAsyncThunk, createSlice, Slice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import FAPI from '../../../../storage/indexedDB/FAPI';
import API from "../../../../api/API";
import { RootState } from '../../store';

interface InitialFlashcardState {
  flashcards: {
    flashcards: {
      [flashcard_id: string]: LM_Flashcard;
    },
    loading: boolean,
    error: string | null
  },
  filter: {
    /**
     * The flashcards that fit in FlashcardsFilter
     */
    filteredFlashcards: string[];
    isFiltering: boolean;
  };
  selection: {
    selectedFlashcard: null | LM_Flashcard;
    isSelectingFlashcard: boolean;
  }
  newFlashcard: LM_Flashcard;
  addingNewFlashcard: boolean;
  training: {
    /**
     * Decides if the user is training with the flashcards
     */
    isTraining: boolean

  };
}

const initialFlashcardState: InitialFlashcardState = {
  flashcards: {
    flashcards: {},
    loading: false,
    error: null
  },
  filter: {
    filteredFlashcards: [],
    isFiltering: false,
  },
  newFlashcard: new Flashcard(nanoid(), "BOOK", "", ""),
  addingNewFlashcard: false,
  selection: {
    selectedFlashcard: null,
    isSelectingFlashcard: false
  },
  training: {
    isTraining: false,
  }
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

      state.flashcards.flashcards[flashcard.flashcard_id] = flashcard;

      state.selection.selectedFlashcard = flashcard;
    },
    deleteFlashcard: (state: InitialFlashcardState, action: PayloadAction<string>) => {
      const flashcardID = action.payload;
      delete state.flashcards.flashcards[flashcardID];
    },
    changeSelectedFlashcard: (state: InitialFlashcardState, action: PayloadAction<LM_Flashcard | null>) => {
      const newSelectedFlashcard = action.payload;
      state.selection.selectedFlashcard = newSelectedFlashcard;

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
    updateFilteredFlashcards: (state: InitialFlashcardState, action: PayloadAction<string[]>) => {

      const filteredFlashcards = action.payload;

      state.filter.filteredFlashcards = filteredFlashcards;
    },
    deleteFilteredFlashcards: (state: InitialFlashcardState, action: PayloadAction<any>) => {
      state.filter.filteredFlashcards = [];
    },
    toggleFilteringState: (state: InitialFlashcardState, action: PayloadAction<boolean>) => {
      state.filter.isFiltering = !state.filter.isFiltering;
    },
    changeNewFlashcard: (state: InitialFlashcardState, action: PayloadAction<LM_Flashcard>) => {
      const newFlashcard = action.payload;

      state.newFlashcard = newFlashcard
    },
    switchAddingNewFlashcardStatus: (state: InitialFlashcardState, action: PayloadAction<any>) => {
      state.addingNewFlashcard = !state.addingNewFlashcard;
    },
    toggleIsTraining: (state: InitialFlashcardState, action: PayloadAction<any>) => {
      state.training.isTraining = !state.training.isTraining;
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

const selectFlashcards = (state: RootState) => state.flashcards.flashcards.flashcards;

/**
 * Returns the flashcards in array form
 */
export const flashcardsSelector = createSelector(selectFlashcards, (flashcards) => Object.values(flashcards))

const selectSelectedFlashcard = (state: RootState) => state.flashcards.selection.selectedFlashcard;

export const selectedFlashcardSelector = createSelector(selectSelectedFlashcard, (selectedFlashcard) => selectedFlashcard)

const selectIsTraining = (state: RootState) => state.flashcards.training.isTraining;

export const isTrainingSelector = createSelector(selectIsTraining, (isTraining) => isTraining);

const selectFlashcardsForTraining = (state: RootState) => state.flashcards.training.flashcardsForTraining;

export const flashcardsForTrainingSelector = createSelector(selectFlashcardsForTraining, (flashcardsForTraining) => flashcardsForTraining)

export const { changeNewFlashcard, addFlashcard, updateFlashcard, deleteFlashcard, changeSelectedFlashcard, switchAddingNewFlashcardStatus, updateFilteredFlashcards, deleteFilteredFlashcards, toggleFilteringState, toggleIsTraining } = flashcardSlice.actions;

export default flashcardSlice.reducer
