import React, { useRef, useEffect } from "react"
import ReactQuill from "react-quill"
import { Container, Modal } from "rsuite"
import Note from "../../../classes/Note"
import useAppDispatch from "../../../hooks/useAppDispatch"
import useAppSelector from "../../../hooks/useAppSelector"
import {
  toggleIsAddingNewNote,
  updateNewNote,
  addNote as addNewNote,
} from "../../../state/redux/features/noteSlice"
import { RootState } from "../../../state/redux/store"
import NoteAdderNote from "./SubComponents/NoteAdderNote/NoteAdderNote"
import {
  isAddingNewNoteSelector,
  newNoteSelector,
} from "../../../state/redux/selectors/noteSelectors"
import { useAddNoteMutation } from "../../../state/redux/queries/noteQueries"
import { selectedBookSelector } from "../../../state/redux/features/bookSlice"
import { LM_Book } from "../../../types/Book/book"
import NoteAdderTitle from "./SubComponents/NoteAdderTitle/NoteAdderTitle"
import { nanoid } from "nanoid"

type Props = { editable: boolean }

/**
 * Modal that adds a new note
 * @param props
 * @returns
 */
const NoteAdder = ({ editable }: Props) => {
  const dispatch = useAppDispatch()
  const isAddingNewNote = useAppSelector(isAddingNewNoteSelector)
  const selectedBook = useAppSelector(selectedBookSelector)
  const newNote = useAppSelector(newNoteSelector)

  const [addNote, { isSuccess, isLoading }] = useAddNoteMutation()

  /**
   * Executed when the modal is closed
   */
  function handleClose() {
    dispatch(toggleIsAddingNewNote(""))
  }

  const _addNote = () => {
    const newNoteCopy = JSON.parse(JSON.stringify(newNote))
    newNoteCopy.entity_id = selectedBook.book_id
    console.log("copy: ", newNoteCopy)
    if (!sessionStorage.getItem("isTesting")) {
      addNote(newNoteCopy)
    }
    dispatch(addNewNote(newNoteCopy))
    dispatch(updateNewNote(new Note("", "", "BOOK", nanoid())))
  }

  useEffect(() => {
    console.log("note: ", newNote)
  }, [])

  return (
    <Modal
      open={isAddingNewNote}
      className="lm-gc-noteadder"
      onClose={handleClose}
    >
      <div className="noteadder__container">
        <div className="noteadder__title"></div>
        <div className="noteadder__note">
          <NoteAdderTitle editable={editable} />
          <NoteAdderNote editable={editable} />
          <button type="button" className="btn btn-primary" onClick={_addNote}>
            +
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default NoteAdder
