import React, { useEffect, useRef, useState } from "react"
import { Container } from "rsuite"
import ReactQuill from "react-quill"
import useAppSelector from "../../../../../hooks/useAppSelector"
import useAppDispatch from "../../../../../hooks/useAppDispatch"
import { RootState } from "../../../../../state/redux/store"
import "./noteaddernote.scss"
import { updateNewNote } from "../../../../../state/redux/features/noteSlice"
import { LM_Note } from "../../../../../types/Note/note"
import { newNoteSelector } from "../../../../../state/redux/selectors/noteSelectors"

type Props = {}

const NoteAdderNote = (props: Props) => {
  const dispatch = useAppDispatch()

  const [value, setValue] = useState("")
  const editorRef = useRef(null)

  const newNote = useAppSelector(newNoteSelector)

  // TODO Add rxjs throttle
  function handleNoteChange(note: string) {
    const newNoteCopy: LM_Note = JSON.parse(JSON.stringify(newNote))
    newNoteCopy.note = note

    dispatch(updateNewNote(newNoteCopy))
  }

  useEffect(() => {
    setValue(newNote.note)
  }, [])

  return (
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
          onChange={(v: string) => handleNoteChange(v)}
        />
      </div>
    </Container>
  )
}

export default NoteAdderNote
