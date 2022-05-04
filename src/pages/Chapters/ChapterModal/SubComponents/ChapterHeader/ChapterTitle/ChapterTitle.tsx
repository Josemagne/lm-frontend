import { FloatingLabel, Form } from "react-bootstrap"
import { useState, useEffect } from "react"
import useAppSelector from "../../../../../../hooks/useAppSelector"
import useAppDispatch from "../../../../../../hooks/useAppDispatch"
import { changeSelectedBook } from "../../../../../../state/redux/features/bookSlice"
import { LM_Book } from "../../../../../../types/Book/book"
import LM_Chapter from "../../../../../../types/Book/chapter"
import { changeSelectedChapter } from "../../../../../../state/redux/features/chapterSlice"

type Props = {}

/**
 * Manages the state of the chaptertitle
 * @param props
 * @returns
 */
const ChapterTitle = ({}: Props) => {
  const dispatch = useAppDispatch()

  const selectedChapter = useAppSelector(
    (state) => state.chapters.selectedChapter
  )

  const handleChange = (newTitle: string) => {
    const chapterCopy: LM_Chapter = JSON.parse(JSON.stringify(selectedChapter))
    chapterCopy.title = newTitle
    dispatch(changeSelectedChapter(chapterCopy))
  }

  useEffect(() => {}, [selectedChapter])

  return (
    <div className="lm-chaptertitle">
      <FloatingLabel controlId="chapter" label="Kapitel">
        <Form.Control
          defaultValue={selectedChapter.title}
          type="text"
          placeholder="Kapitel"
          onChange={(e) => handleChange(e.target.value)}
        />
      </FloatingLabel>
    </div>
  )
}

export default ChapterTitle
