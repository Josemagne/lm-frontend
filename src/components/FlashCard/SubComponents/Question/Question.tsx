import React, { useMemo, useEffect, useRef, useState } from "react"
import useAppDispatch from "../../../../hooks/useAppDispatch"
import useAppSelector from "../../../../hooks/useAppSelector"
import {
  changeSelectedFlashcard,
  changeNewFlashcard,
} from "../../../../state/redux/features/Flashcard/flashcardSlice"
import ReactQuill from "react-quill"
import { LM_Flashcard } from "../../../../types/Flashcard/flashcard"

type Props = {
  /**
   * Decides if the question is from selectedFlashcard or newFlashcard
   */
  isNew: boolean
}

const Question = ({ isNew }: Props) => {
  const [value, setValue] = useState<string>("")
  const editorRef = useRef(null)
  const dispatch = useAppDispatch()

  const book = useAppSelector((state) => state.books.selectedBook)
  const chapter = useAppSelector((state) => state.books.selectedChapter)

  /* We use the component Question to change either selectedFlashcard or newFlashcard */

  let newFlashcard: null | LM_Flashcard = null
  let selectedFlashcard: null | LM_Flashcard = null

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
    actualFlashcardCopy.question = v
    if (!isNew) {
      dispatch(changeSelectedFlashcard(actualFlashcardCopy))
    } else {
      dispatch(changeNewFlashcard(actualFlashcardCopy))
    }
  }

  useEffect(() => {
    // When a new flashcard was added
    if (actualFlashcard.question === "" && value.length > 1)
      setValue(actualFlashcard.question as string)
    if (actualFlashcard.question) setValue(actualFlashcard.question)
  }, [actualFlashcard])

  return (
    <div className="lm-gc-flashcard__question">
      <div className="question__title">
        <h4>Question</h4>
      </div>
      <ReactQuill
        modules={{ toolbar: false }}
        ref={editorRef}
        // defaultValue={""}
        value={value}
        onChange={(v) => handleChange(v)}
      />
    </div>
  )
}

export default Question
