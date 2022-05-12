import React, { useRef, useMemo, useEffect, useState } from "react"
import useAppDispatch from "../../../../hooks/useAppDispatch"
import useAppSelector from "../../../../hooks/useAppSelector"
import { changeSelectedBook } from "../../../../state/redux/features/bookSlice"
import {
  changeNewFlashcard,
  changeSelectedFlashcard,
} from "../../../../state/redux/features/Flashcard/flashcardSlice"
import ReactQuill from "react-quill"
import { LM_Flashcard } from "../../../../types/Flashcard/flashcard"
import { Container } from "rsuite"

type Props = {
  /**
   * Decides if the question is from selectedFlashcard or newFlashcard
   */
  isNew: boolean
}

const Answer = ({ isNew }: Props) => {
  const [value, setValue] = useState<string>("")
  const editorRef = useRef(null)
  const dispatch = useAppDispatch()

  const book = useAppSelector((state) => state.books.selectedBook)
  const chapter = useAppSelector((state) => state.chapters.selectedChapter)

  /* We use the component Question to change either selectedFlashcard or newFlashcard */

  let newFlashcard: LM_Flashcard | null = null
  let selectedFlashcard: LM_Flashcard | null = null

  if (isNew) {
    newFlashcard = useAppSelector((state) => state.flashcards.newFlashcard)
  } else {
    selectedFlashcard = useAppSelector(
      (state) => state.flashcards.selectedFlashcard
    )
  }

  let actualFlashcard!: LM_Flashcard

  if (newFlashcard) actualFlashcard = newFlashcard
  else if (selectedFlashcard) actualFlashcard = selectedFlashcard

  /**
   * Either changes newFlashcard or selectedFlashcard
   * @param v
   */
  const handleChange = (v: string) => {
    setValue(v)

    const actualFlashcardCopy = JSON.parse(JSON.stringify(actualFlashcard))
    actualFlashcardCopy.answer = v

    if (!isNew) {
      dispatch(changeSelectedFlashcard(actualFlashcardCopy))
    } else {
      dispatch(changeNewFlashcard(actualFlashcardCopy))
    }
  }

  useEffect(() => {
    // When a new flashcard was added
    if (actualFlashcard.answer === "" && value.length > 1)
      setValue(actualFlashcard.answer as string)
    if (actualFlashcard.answer) setValue(actualFlashcard.answer)
  }, [actualFlashcard])

  return (
    <div className="lm-gc-flashcard__question">
      <div className="answer__title">
        <h4>Answer</h4>
      </div>
      <Container
        onClick={() => {
          // @ts-ignore
          editorRef.current.focus()
        }}
      >
        <ReactQuill
          modules={{ toolbar: !isNew }}
          ref={editorRef}
          // defaultValue={""}
          value={value}
          onChange={(v: string) => handleChange(v)}
        />
      </Container>
    </div>
  )
}

export default Answer
