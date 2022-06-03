import Note from "../../../classes/Note"
import { LM_Note } from "../../../types/Note/note"
import { Slice, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { noteAPI } from "../queries/noteQueries"
import { result } from "cypress/types/lodash"
import { nanoid } from "nanoid"

interface NoteState {
  notes: {
    notes: {
      [id: string]: LM_Note
    }
    error: string
    loading: boolean
    amountOfNotes: number
  }
  filter: {
    notes: {
      [id: string]: LM_Note
    }
    isFiltering: boolean
  }
  selection: {
    note: LM_Note | null
    isSelecting: boolean
  }
  new: {
    isAddingNewNote: boolean
    newNote: LM_Note
  }
}

const initialState: NoteState = {
  notes: {
    notes: {},
    error: "",
    loading: false,
    amountOfNotes: 0,
  },
  filter: {
    notes: {},
    isFiltering: false,
  },
  selection: {
    note: null,
    isSelecting: false,
  },
  new: {
    newNote: new Note("", "", "BOOK", nanoid()),
    isAddingNewNote: false,
  },
}

export const noteSlice: Slice<NoteState> = createSlice({
  name: "notes",
  initialState: initialState,
  reducers: {
    addNote: (state: NoteState, { payload: note }: PayloadAction<LM_Note>) => {
      state.notes.notes[note.note_id] = note
    },
    // ANCHOR newNote
    updateNewNote: (
      state: NoteState,
      { payload: newNote }: PayloadAction<any>
    ) => {
      state.new.newNote = newNote
    },
    // ANCHOR selectedNote
    toggleIsAddingNewNote: (state: NoteState, action: PayloadAction<any>) => {
      state.new.isAddingNewNote = !state.new.isAddingNewNote
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      noteAPI.endpoints.getNotes.matchFulfilled,
      (state: NoteState, action) => {
        const notes = action.payload
        notes.forEach((note) => {
          state.notes.notes[note.note_id] = note
        })
      }
    )
  },
})

export default noteSlice.reducer
export const { updateNewNote, addNote, toggleIsAddingNewNote } =
  noteSlice.actions
