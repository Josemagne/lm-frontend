import React, { useEffect } from "react"
import useAppSelector from "../../../../../../hooks/useAppSelector"
import {
  showAnswerSelector,
  currentFlashcardSelector,
} from "../../../../../../state/redux/features/Flashcard/flashcardSlice"
import { LM_Flashcard } from "../../../../../../types/Flashcard/flashcard"
import { flashcardsSelector } from "../../../../../../state/redux/features/Flashcard/flashcardSlice"
import "./flashcardtraineranswer.scss"

/**
 * Shows the current answer for the revision
 * @returns
 */
const FlashcardTrainerAnswer = () => {
  /**
   * The ID of the current flashcard
   */
  const currentFlashcard = useAppSelector(currentFlashcardSelector) as string

  const flashcards = useAppSelector(flashcardsSelector) as LM_Flashcard[]
  const flashcardsObject: { [id: string]: LM_Flashcard } = {}
  flashcards.forEach((f) => {
    flashcardsObject[f.flashcard_id] = f
  })
  const showAnswer = useAppSelector(showAnswerSelector) as boolean

  useEffect(() => {}, [showAnswer, currentFlashcard])

  if (showAnswer) {
    return (
      <div
        className={
          showAnswer
            ? "flashcardtrainer__answer showanswer"
            : "flashcardtrainer__answer"
        }
      >
        {showAnswer && currentFlashcard && (
          <div
            dangerouslySetInnerHTML={{
              __html: flashcardsObject[currentFlashcard].answer,
            }}
          ></div>
        )}
        $
      </div>
    )
  } else return null
}

export default FlashcardTrainerAnswer
