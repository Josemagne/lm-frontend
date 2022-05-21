import React, { useEffect, useState } from "react"
import useAppSelector from "../../../../../../hooks/useAppSelector"
import {
  currentFlashcardSelector,
  flashcardsSelector,
  isTrainingSelector,
} from "../../../../../../state/redux/features/Flashcard/flashcardSlice"
import { LM_Flashcard } from "../../../../../../types/Flashcard/flashcard"
import flashcardService from "../../utils/flashcardController"
import { Observable } from "rxjs"
import "./flashcardtrainerquestion.scss"

type Props = {}

/**
 * Shows the currentquestion for the revision
 * @param props
 * @returns
 */
const FlashcardTrainerQuestion = (props: Props) => {
  const [currentQuestion, setCurrentQuestion] = useState<string>()
  // const currentFlashcard = useAppSelector(
  //   currentFlashcardSelector
  // ) as LM_Flashcard
  const isTraining = useAppSelector(isTrainingSelector) as boolean
  // const currentFlashcard = flashcardService.getFlashcard() as Observable<string>
  const currentFlashcard = useAppSelector(currentFlashcardSelector)

  const flashcards = useAppSelector(flashcardsSelector) as LM_Flashcard[]

  const flashcardsObject: { [id: string]: LM_Flashcard } = {}

  flashcards.forEach((f) => {
    flashcardsObject[f.flashcard_id] = f
  })

  useEffect(() => {
    // flashcardService.getFlashcard().subscribe((f) => {
    //   console.log("f: ", f)
    //   setCurrentQuestion(flashcardsObject[f].question)
    // })
  }, [currentFlashcard, isTraining])

  if (isTraining) {
    return (
      <div
        className={
          isTraining
            ? "flashcardtrainer__question istraining"
            : "flashcardtrainer__question"
        }
      >
        {isTraining && currentFlashcard && (
          <div
            dangerouslySetInnerHTML={{
              __html: flashcardsObject[currentFlashcard].question,
            }}
          ></div>
        )}
      </div>
    )
  } else return null
}

export default FlashcardTrainerQuestion
