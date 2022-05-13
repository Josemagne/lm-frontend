import React, { useEffect } from "react"
import useAppSelector from "../../../../../../hooks/useAppSelector"
import { RootState } from "../../../../../../state/redux/store"
import { LM_Flashcard } from "../../../../../../types/Flashcard/flashcard"

type Props = {}

const FlashcardTrainerQuestion = (props: Props) => {
  const currentFlashcard: LM_Flashcard = useAppSelector(
    (state: RootState) => state.flashcards.flashcardTraining.currentFlashcard
  )

  useEffect(() => {}, [currentFlashcard])

  return (
    <div className="lm-lc-flashcardtrainerquestion">
      <p dangerouslySetInnerHTML={{ __html: currentFlashcard.question }}></p>
    </div>
  )
}

export default FlashcardTrainerQuestion
