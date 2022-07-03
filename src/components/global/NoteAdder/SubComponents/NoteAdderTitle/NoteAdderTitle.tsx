import React, { useEffect, useState } from "react"
import useAppSelector from "../../../../../hooks/useAppSelector"
import {
  newNoteSelector,
  selectedNoteSelector,
} from "../../../../../state/redux/selectors/noteSelectors"
import useAppDispatch from "../../../../../hooks/useAppDispatch"
import { updateNewNote } from "../../../../../state/redux/features/noteSlice"
import { FloatingLabel, Form } from "react-bootstrap"

type Props = {
  editable: boolean
}

const NoteAdderTitle = ({ editable }: Props) => {
  const dispatch = useAppDispatch()
  const newNote = useAppSelector(newNoteSelector)
  const [value, setValue] = useState("")

  const selectedNote = useAppSelector(selectedNoteSelector)

  const handleChange = (t: string) => {
    const newNoteCopy = JSON.parse(JSON.stringify(newNote))

    newNoteCopy.title = t

    dispatch(updateNewNote(newNoteCopy))
  }

  useEffect(() => {
    if (editable && selectedNote) setValue(selectedNote.title)
    setValue(newNote.title)
  }, [newNote, selectedNote])

  return (
    <div className="noteadder__title">
      <Form className="noteadder__title__form">
        <FloatingLabel
          controlId="note_title"
          label="Title"
          className="noteadder__title__form__title"
        >
          <Form.Control
            type="text"
            placeholder="Title"
            name="note_title"
            value={value}
            onChange={(e: any) => handleChange(e.target.value)}
          />
        </FloatingLabel>
      </Form>
    </div>
  )
}

export default NoteAdderTitle
