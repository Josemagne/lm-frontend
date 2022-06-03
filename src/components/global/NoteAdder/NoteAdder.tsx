import React, { useRef, useEffect } from "react"
import ReactQuill from "react-quill"
import { Container, Modal } from "rsuite"
import Note from "../../../classes/Note"
import useAppDispatch from "../../../hooks/useAppDispatch"
import useAppSelector from "../../../hooks/useAppSelector"
import { toggleIsAddingNewNote } from "../../../state/redux/features/noteSlice"
import { RootState } from "../../../state/redux/store"
import NoteAdderNote from "./SubComponents/NoteAdderNote/NoteAdderNote"
import {
  isAddingNewNoteSelector,
  newNoteSelector,
} from "../../../state/redux/selectors/noteSelectors"
import { useAddNoteQuery } from "../../../state/redux/queries/noteQueries"
import { selectedBookSelector } from "../../../state/redux/features/bookSlice"
import { LM_Book } from "../../../types/Book/book"
import NoteAdderTitle from "./SubComponents/NoteAdderTitle/NoteAdderTitle"

type Props = {}

/**
 * Modal that adds a new note
 * @param props
 * @returns
 */
const NoteAdder = (props: Props) => {
  const dispatch = useAppDispatch()
  const isAddingNewNote = useAppSelector(isAddingNewNoteSelector)
  const newNote = useAppSelector(newNoteSelector)

  /**
   * Executed when the modal is closed
   */
  function handleClose() {
    dispatch(toggleIsAddingNewNote(""))
  }

  const addNote = () => {
    useAddNoteQuery(newNote)
  }

  useEffect(() => {}, [isAddingNewNote])

  return (
    <Modal
      open={isAddingNewNote}
      className="lm-gc-noteadder"
      onClose={handleClose}
    >
      <div className="noteadder__container">
        <div className="noteadder__title"></div>
        <div className="noteadder__note">
          <NoteAdderTitle />
          <NoteAdderNote />
          <button type="button" className="btn btn-primary" onClick={addNote}>
            +
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default NoteAdder
