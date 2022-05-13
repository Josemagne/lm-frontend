import Note from "../../../classes/Note";
import { LM_Note } from "../../../types/Note/note"
import { Slice, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { noteAPI } from '../queries/noteQueries';
import { result } from "cypress/types/lodash";

interface NoteState {
    notes: {
        notes: {
            [id: string]: LM_Note;
        }
        error: string;
        loading: boolean;
        amountOfNotes: number;
    },
    filteredNotes: {
        [id: string]: LM_Note;
    },
    selectedNote: LM_Note | null;
    /**
     * The note that is being edited
     */
    newNote: LM_Note;
    isAddingNewNote: boolean;

}

const initialState: NoteState = {
    notes: {
        notes: {

        },
        error: "",
        loading: false,
        amountOfNotes: 0
    },
    filteredNotes: {

    },
    selectedNote: null,
    newNote: new Note("", "", ""),
    isAddingNewNote: false
}


export const noteSlice: Slice<NoteState> = createSlice({
    name: "notes",
    initialState: initialState,
    reducers: {
        addNote: (state: NoteState, { payload: note }: PayloadAction<LM_Note>) => {
            state.notes.notes[note.note_id] = note;
        },
        // ANCHOR newNote
        updateNewNote: (state: NoteState, { payload: newNote }: PayloadAction<any>) => {
            state.newNote = newNote;
        },
        // ANCHOR selectedNote
        // ANCHOR State
        toggleIsAddingNewState: (state: NoteState, action: PayloadAction<any>) => {
            state.isAddingNewNote = !state.isAddingNewNote;
        }

    },
    extraReducers: (builder) => {
        builder.addMatcher(noteAPI.endpoints.getNotes.matchFulfilled, (state: NoteState, action) => {
            Object.keys(state.notes.notes).forEach((key) => {
                delete state.notes.notes[key];
            })

            const notes = action.payload;

            notes.forEach((note) => {
                state.notes.notes[note.note_id] = note;
            })
        })



    }
})

export default noteSlice.reducer;
export const { updateNewNote, addNote, toggleIsAddingNewNote } = noteSlice.actions;