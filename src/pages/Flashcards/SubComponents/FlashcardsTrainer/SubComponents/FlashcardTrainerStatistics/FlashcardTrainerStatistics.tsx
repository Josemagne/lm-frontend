import React from "react"
import useAppSelector from "../../../../../../hooks/useAppSelector"
import {
  flashcardsSelector,
  isTrainingSelector,
} from "../../../../../../state/redux/features/Flashcard/flashcardSlice"
import { LM_Flashcard } from "../../../../../../types/Flashcard/flashcard"
import "./flashcardtrainerstatistics.scss"

/**
 * Shows the current status of the flashcards that are ready for revision
 * @returns
 */
const FlashcardTrainerStatistics = () => {
  const flashcards = useAppSelector(flashcardsSelector) as LM_Flashcard[]
  const isTraining = useAppSelector(isTrainingSelector)

  if (isTraining) return null
  else {
    return (
      <div className="flashcardtrainer__statistics">
        {/* The flashcards that are left to learn */}
        <div className="statistics__learning">
          <p>
            You have
            {
              flashcards.filter(
                (f) => f.status === "LEARNING" || f.status === "NEW"
              ).length
            }
            left to learn
          </p>
        </div>
      </div>
    )
  }
}

export default FlashcardTrainerStatistics
