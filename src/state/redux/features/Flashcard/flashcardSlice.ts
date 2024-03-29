import { boolean } from "yup"
import Flashcard from "../../../../classes/base/Flashcard"
import { LM_Flashcard } from "../../../../types/Flashcard/flashcard"
import { nanoid } from "nanoid"
import {
  createAsyncThunk,
  createSlice,
  Slice,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit"
import API from "../../../../api/API"
import { RootState } from "../../store"

interface InitialFlashcardState {
  flashcards: {
    flashcards: {
      [flashcard_id: string]: LM_Flashcard
    }
    loading: boolean
    error: string | null
  }
  filter: {
    /**
     * The flashcards that fit in FlashcardsFilter
     */
    filteredFlashcards: string[]
    isFiltering: boolean
  }
  selection: {
    selectedFlashcard: null | LM_Flashcard
    isSelectingFlashcard: boolean
  }
  new: {
    newFlashcard: LM_Flashcard
    isAddingNewFlashcard: boolean
  }

  training: {
    /**
     * Decides if the user is training with the flashcards
     */
    isTraining: boolean
    /**
     * IDs of the strings that are being used
     */
    flashcardsForTraining: string[]
    /**
     * ID of the flashcard that is is being displayed at the moment
     */
    currentFlashcard: string | null
    /**
     * Decides if we open the FlashcardTrainer
     */
    openFlashcardTrainer: boolean
    /**
     * The selection of the user i.e. right or wrong
     */
    showAnswer: boolean
    selection: {
      selection: boolean | null
      /**
       * Decides if the user has selected right or wrong
       */
      hasSelected: boolean
    }
  }
}

const initialFlashcardState: InitialFlashcardState = {
  flashcards: {
    flashcards: {},
    loading: false,
    error: null,
  },
  filter: {
    filteredFlashcards: [],
    isFiltering: false,
  },
  new: {
    newFlashcard: new Flashcard(nanoid(), "", "", "BOOK", nanoid()),
    isAddingNewFlashcard: false,
  },
  selection: {
    selectedFlashcard: null,
    isSelectingFlashcard: false,
  },
  training: {
    flashcardsForTraining: [],
    isTraining: false,
    currentFlashcard: null,
    openFlashcardTrainer: false,
    showAnswer: false,
    selection: {
      hasSelected: false,
      selection: null,
    },
  },
}

export const fetchFlashcardsBackend = createAsyncThunk(
  "flashcardsBackend",
  async (bookId: string): Promise<LM_Flashcard[] | any> => {
    let error: any = null

    const flashcards = await API.getFlashcards(bookId)

    return flashcards
  }
)

//export const fetchFlashcardsFrontend = createAsyncThunk("flashcardsFrontend/", async (): Promise<LM_Flashcard[]> => {

//const flashcards = await FAPI.getFlashcards("ANY");

//return flashcards;
//})

export const flashcardSlice: Slice<InitialFlashcardState> = createSlice({
  name: "flashcard",
  initialState: initialFlashcardState,
  reducers: {
    addFlashcard: (
      state: InitialFlashcardState,
      action: PayloadAction<LM_Flashcard>
    ) => {
      const flashcard = action.payload

      state.flashcards.flashcards[flashcard.flashcard_id] = flashcard

      // NOTE Each new flashcard was a newFlashcard
      state.new.newFlashcard = new Flashcard(nanoid(), "", "", "BOOK", nanoid())
    },
    updateFlashcard: (
      state: InitialFlashcardState,
      action: PayloadAction<LM_Flashcard>
    ) => {
      const flashcard = action.payload

      state.flashcards.flashcards[flashcard.flashcard_id] = flashcard

      state.selection.selectedFlashcard = flashcard
    },
    deleteFlashcard: (
      state: InitialFlashcardState,
      action: PayloadAction<string>
    ) => {
      const flashcardID = action.payload
      delete state.flashcards.flashcards[flashcardID]
    },
    changeSelectedFlashcard: (
      state: InitialFlashcardState,
      action: PayloadAction<LM_Flashcard | null>
    ) => {
      const newSelectedFlashcard = action.payload
      state.selection.selectedFlashcard = newSelectedFlashcard

      // If it is a new flashcard
      if (newSelectedFlashcard) {
        state.flashcards.flashcards[newSelectedFlashcard.flashcard_id] =
          newSelectedFlashcard
      }
    },
    /**
     * Updates the 'selectedFlashcards' by mapping the values of 'flashcards' to 'selectedFlashcards' by the provided flashcard_id in the array
     * @param state
     * @param action
     */
    updateFilteredFlashcards: (
      state: InitialFlashcardState,
      action: PayloadAction<string[]>
    ) => {
      const filteredFlashcards = action.payload

      state.filter.filteredFlashcards = filteredFlashcards
    },
    deleteFilteredFlashcards: (
      state: InitialFlashcardState,
      action: PayloadAction<any>
    ) => {
      state.filter.filteredFlashcards = []
    },
    toggleFilteringState: (
      state: InitialFlashcardState,
      action: PayloadAction<boolean>
    ) => {
      state.filter.isFiltering = !state.filter.isFiltering
    },
    changeNewFlashcard: (
      state: InitialFlashcardState,
      action: PayloadAction<LM_Flashcard>
    ) => {
      const newFlashcard = action.payload

      state.new.newFlashcard = newFlashcard
    },
    toggleIsAddingNewFlashcard: (
      state: InitialFlashcardState,
      action: PayloadAction<any>
    ) => {
      state.new.isAddingNewFlashcard = !state.new.isAddingNewFlashcard
    },
    // ANCHOR Training
    toggleIsTraining: (
      state: InitialFlashcardState,
      action: PayloadAction<any>
    ) => {
      state.training.isTraining = !state.training.isTraining
    },
    changeFlashcardsForTraining: (
      state: InitialFlashcardState,
      { payload: newFlashcardsForTraining }: PayloadAction<null | string[]>
    ) => {
      if (newFlashcardsForTraining) {
        state.training.flashcardsForTraining = newFlashcardsForTraining
      } else {
        state.training.flashcardsForTraining = []
      }
    },
    /**
     * Changes the current flashcard id
     * @param state
     * @param action
     */
    changeCurrentFlashcard: (
      state: InitialFlashcardState,
      { payload: newCurrentFlashcard }: PayloadAction<string | null>
    ) => {
      if (newCurrentFlashcard === null) {
        state.training.currentFlashcard = null
      } else {
        state.training.currentFlashcard = newCurrentFlashcard
      }
    },
    toggleOpenFlashcardTrainer: (
      state: InitialFlashcardState,
      action: PayloadAction<void>
    ) => {
      state.training.openFlashcardTrainer = !state.training.openFlashcardTrainer
    },
    toggleHasSelected: (
      state: InitialFlashcardState,
      action: PayloadAction<void>
    ) => {
      state.training.selection.hasSelected =
        !state.training.selection.hasSelected
    },
    changeFlashcardTrainerSelection: (
      state: InitialFlashcardState,
      { payload: flashcardTrainerSelection }: PayloadAction<boolean | null>
    ) => {
      state.training.selection.selection = flashcardTrainerSelection
    },
    toggleShowAnswer: (
      state: InitialFlashcardState,
      action: PayloadAction<void>
    ) => {
      state.training.showAnswer = !state.training.showAnswer
    },
    nextQuestion: (
      state: InitialFlashcardState,
      { payload: isRight }: PayloadAction<boolean>
    ) => {
      const flashcards = state.flashcards.flashcards
      const currentFlashcardID = state.training.currentFlashcard
      if (!currentFlashcardID) return
      const currentFlashcard = flashcards[currentFlashcardID]

      if (currentFlashcard.status === "NEW") {
        currentFlashcard.status = "LEARNING"
      }
      // If the choice was right
      // Then we do not want the flashcard to be in the training
      if (isRight) {
        state.training.flashcardsForTraining.shift()

        currentFlashcard.status = "LEARNT"
      } else {
        const wrongFlashcard = state.training.flashcardsForTraining.shift()

        if (!wrongFlashcard) return
        state.training.flashcardsForTraining.push(wrongFlashcard)
      }
      state.training.currentFlashcard = state.training.flashcardsForTraining[0]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFlashcardsBackend.pending, (state, action) => {
      state.flashcards.loading = true
    }),
      builder.addCase(
        fetchFlashcardsBackend.fulfilled,
        (state, action: PayloadAction<LM_Flashcard[]>) => {
          const flashcards = action.payload
          state.flashcards.flashcards = {}

          flashcards.forEach((flashcard: LM_Flashcard) => {
            // @ts-ignore
            state.flashcards.flashcards[flashcard.flashcard_id] = flashcard
          })
        }
      ),
      builder.addCase(fetchFlashcardsBackend.rejected, (state, action) => {
        state.flashcards.loading = false
        state.flashcards.error = action.payload as string
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
  },
})

const selectFlashcards = (state: RootState) =>
  state.flashcards.flashcards.flashcards

/**
 * Returns the flashcards in array form
 */
export const flashcardsSelector = createSelector(
  selectFlashcards,
  (flashcards) => Object.values(flashcards)
)

const selectSelectedFlashcard = (state: RootState) =>
  state.flashcards.selection.selectedFlashcard

export const selectedFlashcardSelector = createSelector(
  selectSelectedFlashcard,
  (selectedFlashcard) => selectedFlashcard
)

const selectIsTraining = (state: RootState) =>
  state.flashcards.training.isTraining

export const isTrainingSelector = createSelector(
  selectIsTraining,
  (isTraining) => isTraining
)

const selectFlashcardsForTraining = (state: RootState) =>
  state.flashcards.training.flashcardsForTraining

export const flashcardsForTrainingSelector = createSelector(
  selectFlashcardsForTraining,
  (flashcardsForTraining) => flashcardsForTraining
)

const selectIsFilteringFlashcards = (state: RootState) =>
  state.flashcards.filter.isFiltering

export const isFilteringFlashcardsSelector = createSelector(
  selectIsFilteringFlashcards,
  (isFilteringFlashcards) => isFilteringFlashcards
)

const selectFilteredFlashcards = (state: RootState) =>
  state.flashcards.filter.filteredFlashcards

export const filteredFlashcardsSelector = createSelector(
  selectFilteredFlashcards,
  (filteredFlashcards) => filteredFlashcards
)

const selectIsSelectingFlashcard = (state: RootState) =>
  state.flashcards.selection.isSelectingFlashcard

export const isSelectingFlashcardSelector = createSelector(
  selectIsSelectingFlashcard,
  (isSelectingFlashcard) => isSelectingFlashcard
)

const selectNewFlashcard = (state: RootState) =>
  state.flashcards.new.newFlashcard

export const newFlashcardSelector = createSelector(
  selectNewFlashcard,
  (newFlashcard) => newFlashcard
)

const selectIsAddingNewFlashcard = (state: RootState) =>
  state.flashcards.new.isAddingNewFlashcard

export const isAddingNewFlashcardSelector = createSelector(
  selectIsAddingNewFlashcard,
  (isAddingNewFlashcard) => isAddingNewFlashcard
)

// ANCHOR TRAINING-SELECTOR

const selectCurrentFlashcard = (state: RootState) =>
  state.flashcards.training.currentFlashcard

export const currentFlashcardSelector = createSelector(
  selectCurrentFlashcard,
  (currentFlashcard) => currentFlashcard
)

const selectHasSelected = (state: RootState) =>
  state.flashcards.training.selection.hasSelected

export const hasSelectedSelector = createSelector(
  selectHasSelected,
  (hasSelected) => hasSelected
)

const selectTrainingSelection = (state: RootState) =>
  state.flashcards.training.selection.selection

export const trainingSelectionSelector = createSelector(
  selectTrainingSelection,
  (trainingSelection) => trainingSelection
)

const selectOpenFlashcardTrainer = (state: RootState) =>
  state.flashcards.training.openFlashcardTrainer

export const openFlashcardTrainerSelector = createSelector(
  selectOpenFlashcardTrainer,
  (openFlashcardTrainer) => openFlashcardTrainer
)

const selectFlashcardTrainerSelection = (state: RootState) =>
  state.flashcards.training.selection.selection

export const flashcardTrainerSelectionSelector = createSelector(
  selectFlashcardTrainerSelection,
  (flashcardTrainerSelection) => flashcardTrainerSelection
)

const selectShowAnswer = (state: RootState) =>
  state.flashcards.training.showAnswer

export const showAnswerSelector = createSelector(
  selectShowAnswer,
  (showAnswer) => showAnswer
)

export const {
  changeNewFlashcard,
  addFlashcard,
  updateFlashcard,
  deleteFlashcard,
  changeSelectedFlashcard,
  toggleIsAddingNewFlashcard,
  updateFilteredFlashcards,
  deleteFilteredFlashcards,
  toggleFilteringState,
  // TRAINING
  toggleIsTraining,
  changeFlashcardsForTraining,
  toggleOpenFlashcardTrainer,
  toggleHasSelected,
  changeFlashcardTrainerSelection,
  toggleShowAnswer,
  changeCurrentFlashcard,
  nextQuestion,
} = flashcardSlice.actions

export default flashcardSlice.reducer
