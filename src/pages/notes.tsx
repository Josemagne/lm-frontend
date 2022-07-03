import React, { useEffect } from "react"
import BookSelector from "../components/BookSelector/BookSelector"
import NoteAdder from "../components/global/NoteAdder/NoteAdder"
import useAppSelector from "../hooks/useAppSelector"
import { useGetNotesQuery } from "../state/redux/queries/noteQueries"
import { RootState } from "../state/redux/store"
import { LM_Note } from "../types/Note/note"
import { notesSelector } from "../state/redux/selectors/noteSelectors"
import useAppDispatch from "../hooks/useAppDispatch"
import { toggleIsAddingNewNote } from "../state/redux/features/noteSlice"
import NotePage from "../components/local/NotePage/NotePage"

const NotesPage = () => {
  return (
    <div className="">
      <NotePage />
    </div>
  )
}

export default NotesPage
