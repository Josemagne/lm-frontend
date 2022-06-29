import React, { useEffect, useRef, useState } from "react"
import ReactQuill from "react-quill"
import { Modal } from "rsuite"
import useAppDispatch from "../../../../../hooks/useAppDispatch"
import useAppSelector from "../../../../../hooks/useAppSelector"
import {
  changeSelectedNote,
  toggleIsSelectingNote,
  updateNote,
} from "../../../../../state/redux/features/noteSlice"
import {
  isSelectingNoteSelector,
  selectedNoteSelector,
} from "../../../../../state/redux/selectors/noteSelectors"
import { LM_Note } from "../../../../../types/Note/note"
import NoteAdder from "../../../../global/NoteAdder/NoteAdder"
import NoteAdderNote from "../../../../global/NoteAdder/SubComponents/NoteAdderNote/NoteAdderNote"

type Props = {}

const NoteModal = (props: Props) => {
  const dispatch = useAppDispatch()

  const [noteText, setNoteText] = useState("")

  const isSelectingNote = useAppSelector(isSelectingNoteSelector)
  const selectedNote = useAppSelector(selectedNoteSelector)

  const editorRef = useRef(null)

  const handleClose = () => {
    dispatch(toggleIsSelectingNote)
    dispatch(changeSelectedNote(null))
  }

  const handleNoteChange = (s: string) => {
    const updatedNoteCopy: LM_Note = JSON.parse(JSON.stringify(selectedNote))
    updatedNoteCopy.note = s

    dispatch(updateNote(updatedNoteCopy))
  }

  useEffect(() => {
    if (selectedNote) setNoteText(selectedNote.note)
  }, [isSelectingNote, selectedNote])
  useEffect(() => {
    console.log("selectedNote: ", selectedNote)
  }, [])

  return (
    <>
      {isSelectingNote && selectedNote && (
        <Modal
          className="lm-notemodal"
          open={isSelectingNote && selectedNote ? true : false}
          onClose={handleClose}
          data-testid="notemodal"
        >
          <Modal.Header>{(selectedNote as LM_Note).title}</Modal.Header>
          <Modal.Body>
            <div className="notemodal__note">
              <ReactQuill
                ref={editorRef}
                value={noteText}
                onChange={(v: string) => handleNoteChange(v)}
              />
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  )
}

export default NoteModal
