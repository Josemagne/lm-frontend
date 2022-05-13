import React, { useRef, useEffect } from "react"
import ReactQuill from "react-quill"
import { Container, Modal } from "rsuite"
import Note from "../../../classes/Note"
import useAppDispatch from "../../../hooks/useAppDispatch"
import useAppSelector from "../../../hooks/useAppSelector"
import { toggleIsAddingNewNote } from "../../../state/redux/features/noteSlice"
import { RootState } from "../../../state/redux/store"
import NoteAdderNote from "./SubComponents/NoteAdderNote/NoteAdderNote"

type Props = {}

const NoteAdder = (props: Props) => {
  const dispatch = useAppDispatch()
  const isAddingNewNote = useAppSelector(
    (state: RootState) => state.notes.isAddingNewNote
  )

  /**
   * Executed when the modal is closed
   */
  function handleClose() {
    dispatch(toggleIsAddingNewNote(""))
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
          <NoteAdderNote />
        </div>
      </div>
    </Modal>
  )
}

export default NoteAdder
