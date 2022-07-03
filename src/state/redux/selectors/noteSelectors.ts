import { createSelector } from "@reduxjs/toolkit"
import { LM_Note } from "../../../types/Note/note"
import { RootState } from "../store"

const selectNotes = (store: RootState) => store.notes.notes.notes
export const notesSelector = createSelector(selectNotes, (s) => {
  return Object.values(s)
}) as unknown as () => LM_Note[]

const selectFilteredNotes = (store: RootState) => store.notes.filter.notes
export const filteredNotesSelector = createSelector(
  selectFilteredNotes,
  (s) => {
    return Object.values(s)
  }
) as unknown as () => LM_Note[]

const selectIsFilteringNotes = (store: RootState) =>
  store.notes.filter.isFiltering
export const isFilteringSelector = createSelector(
  selectIsFilteringNotes,
  (s) => s
) as unknown as () => boolean

const selectSelectedNote = (store: RootState) => store.notes.selection.note

export const selectedNoteSelector = createSelector(
  selectSelectedNote,
  (s) => s
) as unknown as () => LM_Note | null

const selectIsSelectingNote = (store: RootState) =>
  store.notes.selection.isSelecting
export const isSelectingNoteSelector = createSelector(
  selectIsSelectingNote,
  (s) => s
) as unknown as () => boolean

const selectNewNote = (store: RootState) => store.notes.new.newNote
export const newNoteSelector = createSelector(
  selectNewNote,
  (s) => s
) as unknown as () => LM_Note

const selectIsAddingNewNote = (store: RootState) =>
  store.notes.new.isAddingNewNote
export const isAddingNewNoteSelector = createSelector(
  selectIsAddingNewNote,
  (s) => s
) as unknown as () => boolean
