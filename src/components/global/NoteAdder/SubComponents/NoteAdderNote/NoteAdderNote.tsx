import React, { useEffect, useRef, useState } from "react"
import { Container } from "rsuite"
import ReactQuill from "react-quill"
import useAppSelector from "../../../../../hooks/useAppSelector"
import useAppDispatch from "../../../../../hooks/useAppDispatch"
import { RootState } from "../../../../../state/redux/store"
import "./noteaddernote.scss"
import {
  updateNewNote,
  updateNote,
} from "../../../../../state/redux/features/noteSlice"
import { LM_Note } from "../../../../../types/Note/note"
import {
  newNoteSelector,
  selectedNoteSelector,
} from "../../../../../state/redux/selectors/noteSelectors"

type Props = {
  /**
   * Decides if we edit the note
   */
  editable: boolean
}

const NoteAdderNote = ({ editable }: Props) => {
  const dispatch = useAppDispatch()

  const [value, setValue] = useState("")
  const editorRef = useRef(null)

  const newNote = useAppSelector(newNoteSelector)
  const selectedNote = useAppSelector(selectedNoteSelector)

  // TODO Add rxjs throttle
  function handleNoteChange(note: string, editable: boolean) {
    setValue(note)
    const newNoteCopy: LM_Note = JSON.parse(JSON.stringify(newNote))
    newNoteCopy.note = note

    if (editable) dispatch(updateNote(newNoteCopy))
    else dispatch(updateNewNote(newNoteCopy))
  }

  useEffect(() => {
    if (editable && selectedNote) setValue(selectedNote.note)
    else if (newNote.note !== value && !editable) setValue(newNote.note)
    else if (!editable) setValue(newNote.note)
  }, [newNote, selectedNote])

  return (
    <>
      {!editable && (
        <Container
          onClick={() => {
            // @ts-ignore
            editorRef.current.focus()
          }}
          className="lm-lc-noteaddernote"
        >
          <div className="noteadder__note__editor">
            <ReactQuill
              ref={editorRef}
              value={value}
              onChange={(v: string) => handleNoteChange(v, false)}
            />
          </div>
        </Container>
      )}
      {editable && selectedNote && (
        <Container
          onClick={() => {
            // @ts-ignore
            editorRef.current.focus()
          }}
          className="lm-lc-noteaddernote"
        >
          <div className="noteadder__note__editor">
            <ReactQuill
              ref={editorRef}
              value={value}
              onChange={(v: string) => handleNoteChange(v, true)}
            />
          </div>
        </Container>
      )}
    </>
  )
}

export default NoteAdderNote
