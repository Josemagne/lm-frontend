import React, { useMemo, useState, useRef } from "react"
import { LM_Book } from "../../../../../../types/Book/book"
import { useEffect } from "react"
import LM_Chapter from "../../../../../../types/Book/chapter"
import useAppSelector from "../../../../../../hooks/useAppSelector"
import useAppDispatch from "../../../../../../hooks/useAppDispatch"
import { Card, Container } from "react-bootstrap"
import ReactQuill from "react-quill"
import { changeSelectedChapter } from "../../../../../../state/redux/features/chapterSlice"

type Props = {}

/**
 * Handles the summary for the chapter
 * @param param0
 * @returns
 */
const ChapterSummary = ({}: Props) => {
  // Decides if we open the summarymodifier to the fullest
  const [open, setOpen] = useState<boolean>(false)

  const editorRef = useRef(null)
  const [value, setValue] = useState<string>("")
  const dispatch = useAppDispatch()

  const selectedChapter = useAppSelector((state) => {
    state.chapters.selectedChapter
  }) as unknown as LM_Chapter

  const handleChange = (v: string) => {
    setValue(v)

    const chapterCopy = JSON.parse(JSON.stringify(selectedChapter))
    chapterCopy.summary = v

    dispatch(changeSelectedChapter(chapterCopy))
  }

  const openSummary = () => {
    setOpen(!open)
  }

  useEffect(() => {
    setValue(selectedChapter.summary)
  }, [selectedChapter.summary])

  useEffect(() => {}, [])

  return (
    <div
      className={
        open
          ? "lm-chaptermodifier__summary open"
          : "lm-chaptermodifier__summary"
      }
    >
      <Container
        onClick={() => {
          // @ts-ignore
          editorRef.current.focus()
        }}
      >
        <Card>
          <Card.Title className="title">Summary</Card.Title>
          <div className="lm-textcontainer">
            <ReactQuill
              ref={editorRef}
              defaultValue={selectedChapter.summary}
              value={value}
              onChange={(v) => handleChange(v)}
            />
          </div>
        </Card>
        {/* NOTE If we click on it then we show the full summary */}
      </Container>
    </div>
  )
}

export default ChapterSummary
