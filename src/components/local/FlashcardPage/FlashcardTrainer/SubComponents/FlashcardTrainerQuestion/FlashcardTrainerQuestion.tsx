import React, { useEffect } from "react"
import useAppSelector from "../../../../../../hooks/useAppSelector"
import { RootState } from "../../../../../../state/redux/store"
import { LM_Flashcard } from "../../../../../../types/Flashcard/flashcard"
import { currentFlashcardSelector } from "../../../../../../state/redux/features/Flashcard/flashcardSlice"

type Props = {}

const FlashcardTrainerQuestion = (props: Props) => {
  const currentFlashcard: LM_Flashcard = useAppSelector(
    currentFlashcardSelector
  )

  useEffect(() => {}, [currentFlashcard])

  return (
    <div
      className="flashcardtrainer__question"
      data-testid="flashcardtrainer__question"
    >
      <p dangerouslySetInnerHTML={{ __html: currentFlashcard.question }}></p>
    </div>
  )
}

export default FlashcardTrainerQuestion
