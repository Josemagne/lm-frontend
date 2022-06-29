import React, { useEffect } from "react"
import BookSelector from "../../BookSelector/BookSelector"
import NoteAdder from "../../global/NoteAdder/NoteAdder"
import useAppDispatch from "../../../hooks/useAppDispatch"
import { toggleIsAddingNewNote } from "../../../state/redux/features/noteSlice"
import NotePagination from "./SubComponents/NotePagination/NotePagination"
import NoteFilter from "./SubComponents/NoteFilter/NoteFilter"
import "./notepage.scss"
import useAppSelector from "../../../hooks/useAppSelector"
import {
  selectedBookSelector,
  isSelectingBookSelector,
} from "../../../state/redux/features/bookSlice"
import NoteModal from "./SubComponents/NoteModal/NoteModal"

const NotePage = () => {
  const dispatch = useAppDispatch()

  const selectedBook = useAppSelector(selectedBookSelector)

  const openNoteAdder = () => {
    dispatch(toggleIsAddingNewNote(""))
  }

  useEffect(() => {}, [selectedBook])

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
      <NoteAdder editable={false} />
      {selectedBook && <NotePagination />}
      <NoteFilter />
      <NoteModal />
    </div>
  )
}

export default NotePage
