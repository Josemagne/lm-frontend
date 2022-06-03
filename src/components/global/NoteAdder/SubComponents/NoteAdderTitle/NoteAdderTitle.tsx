import React from "react"
import useAppSelector from "../../../../../hooks/useAppSelector"
import { newNoteSelector } from "../../../../../state/redux/selectors/noteSelectors"
import useAppDispatch from "../../../../../hooks/useAppDispatch"
import { updateNewNote } from "../../../../../state/redux/features/noteSlice"
import { FloatingLabel, Form } from "react-bootstrap"

const NoteAdderTitle = () => {
  const dispatch = useAppDispatch()
  const newNote = useAppSelector(newNoteSelector)

  const handleChange = (n: string) => {
    console.log("title: ", n)
    const newNoteCopy = JSON.parse(JSON.stringify(newNote))
    newNoteCopy.note = n
    dispatch(updateNewNote(newNoteCopy))
  }

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
            onChange={(e: any) => handleChange(e.target.value)}
          />
        </FloatingLabel>
      </Form>
    </div>
  )
}

export default NoteAdderTitle
