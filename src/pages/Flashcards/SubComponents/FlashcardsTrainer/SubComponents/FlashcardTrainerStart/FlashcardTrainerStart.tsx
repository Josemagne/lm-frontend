import React, { useEffect } from "react"
import useAppSelector from "../../../../../../hooks/useAppSelector"
import {
  changeCurrentFlashcard,
  changeFlashcardsForTraining,
  isTrainingSelector,
  toggleIsTraining,
  toggleOpenFlashcardTrainer,
} from "../../../../../../state/redux/features/Flashcard/flashcardSlice"
import useAppDispatch from "../../../../../../hooks/useAppDispatch"
import "./flashcardtrainerstart.scss"
import getFlashcardsForTraining from "../../utils/getFlaschardsForTraining"
import {
  flashcardsSelector,
  flashcardsForTrainingSelector,
} from "../../../../../../state/redux/features/Flashcard/flashcardSlice"
import { LM_Flashcard } from "../../../../../../types/Flashcard/flashcard"
import Queue from "../../utils/Queue"
import { Subject } from "rxjs"
import flashcardService from "../../utils/flashcardController"
import { nextQuestion } from "../../utils/flashcardController"

/**
 * Button that starts revision
 * @param props
 * @returns
 */
const FlashcardTrainerStart = () => {
  const dispatch = useAppDispatch()
  const isTraining = useAppSelector(isTrainingSelector) as boolean
  const flashcards = useAppSelector(flashcardsSelector) as LM_Flashcard[]
  // Move to global utils
  /**
   * Key value pair for flashcards arr
   */
  const flashcardsObject: { [id: string]: LM_Flashcard } = {}
  flashcards.forEach((f) => {
    flashcardsObject[f.flashcard_id] = f
  })
  const flashcardsForTraining = useAppSelector(
    flashcardsForTrainingSelector
  ) as string[]

  // let queue = new Queue<string>(flashcardsForTraining, dispatch)
  // console.log("queue: ", queue)
  /**
   * Starts the training
   */
  function toggleTraining() {
    if (isTraining) {
      dispatch(toggleIsTraining(""))
      dispatch(toggleOpenFlashcardTrainer(""))
    } else {
      // Load the flashcards IDs into the store

      getFlashcardsForTraining(flashcards).subscribe((flashcardIDs) => {
        dispatch(changeFlashcardsForTraining(flashcardIDs))
        dispatch(changeCurrentFlashcard(flashcardIDs[0]))
      })

      // let flashcardsForTraining: any[] = flashcards.filter(
      //   (f) => f.status === "NEW" || f.status === "LEARNING"
      // )
      // flashcardsForTraining = flashcardsForTraining.map((f) => f.flashcard_id)
      // dispatch(changeFlashcardsForTraining(flashcardsForTraining))
      dispatch(toggleIsTraining(""))
      // nextQuestion(queue)
    }
  }

  useEffect(() => {}, [isTraining])

  return (
    <div className="flashcardtrainer__start istraining">
      {!isTraining && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={toggleTraining}
        >
          Start
        </button>
      )}
      {isTraining && (
        <button
          type="button"
          className="btn btn-danger"
          onClick={toggleTraining}
        >
          x
        </button>
      )}
    </div>
  )
}

export default FlashcardTrainerStart
