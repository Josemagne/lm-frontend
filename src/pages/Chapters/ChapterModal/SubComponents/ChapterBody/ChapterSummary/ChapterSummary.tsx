import React, { useMemo, useState, useRef } from "react"
import { LM_Book } from "../../../../../../types/Book/book"
import { useEffect } from "react"
import LM_Chapter from "../../../../../../types/Book/chapter"
import useAppSelector from "../../../../../../hooks/useAppSelector"
import useAppDispatch from "../../../../../../hooks/useAppDispatch"
import { Card, Container } from "react-bootstrap"
import ReactQuill from "react-quill"
import {
  changeSelectedChapter,
  selectedChapterSelector,
} from "../../../../../../state/redux/features/chapterSlice"
import { throttle, of, interval, Observable, throttleTime } from "rxjs"
import { LM_Summary } from "../../../../../../types/summary/summary"
import { selectedSummarySelector } from "../../../../../../state/redux/selectors/summarySelectors"

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

  const selectedChapter = useAppSelector(
    selectedChapterSelector
  ) as unknown as LM_Chapter
  const selectedSummary = useAppSelector(selectedSummarySelector)

  const handleChange = (v: string) => {
    const source = of(v)
    console.log("source:", source)
    const result = source.pipe(throttle((ev) => interval(5000)))
    result.subscribe(() => {
      setValue(v)
      console.log(v)
    })

    console.log("selectedChapter:", selectedChapter)
    const chapterCopy = JSON.parse(JSON.stringify(selectedChapter))
    chapterCopy.summary = v

    dispatch(changeSelectedChapter(chapterCopy))
  }

  const openSummary = () => {
    setOpen(!open)
  }

  useEffect(() => {
    if (!selectedChapter) return
    setValue(selectedChapter.summary)
  }, [selectedChapter])

  return (
    <div
      className={
        open
          ? "lm-chaptermodifier__summary open "
          : "lm-chaptermodifier__summary"
      }
      data-testid="lm-chaptermodifier__summary"
    >
      {selectedChapter && (
        <Container
          onClick={() => {
            // @ts-ignore
            editorRef.current.focus()
          }}
        >
          <Card>
            <div className="lm-textcontainer">
              <ReactQuill
                ref={editorRef}
                value={value}
                onChange={(v: string) => handleChange(v)}
              />
            </div>
          </Card>
          {/* NOTE If we click on it then we show the full summary */}
        </Container>
      )}
    </div>
  )
}

export default ChapterSummary
