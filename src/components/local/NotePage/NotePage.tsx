import React from "react"
import BookSelector from "../../BookSelector/BookSelector"
import NoteAdder from "../../global/NoteAdder/NoteAdder"
import useAppDispatch from "../../../hooks/useAppDispatch"
import { toggleIsAddingNewNote } from "../../../state/redux/features/noteSlice"
import NotePagination from "./SubComponents/NotePagination/NotePagination"
import NoteFilter from "./SubComponents/NoteFilter/NoteFilter"

const NotePage = () => {
  const dispatch = useAppDispatch()

  const openNoteAdder = () => {
    dispatch(toggleIsAddingNewNote(""))
  }
  return (
    <div className="lm-notes lm-page">
      <BookSelector />
      <button
        type="button"
        className="note__adder btn btn-primary"
        onClick={openNoteAdder}
      >
        Add Note
      </button>
      <NoteAdder />
      <NotePagination />
      <NoteFilter />
    </div>
  )
}

export default NotePage
