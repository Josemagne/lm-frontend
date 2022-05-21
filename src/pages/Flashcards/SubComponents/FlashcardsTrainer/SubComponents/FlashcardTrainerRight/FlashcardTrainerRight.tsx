import React, { useEffect } from "react"
import useAppDispatch from "../../../../../../hooks/useAppDispatch"
import {
  changeFlashcardTrainerSelection,
  hasSelectedSelector,
  nextQuestion,
  toggleHasSelected,
  toggleShowAnswer,
} from "../../../../../../state/redux/features/Flashcard/flashcardSlice"
import useAppSelector from "../../../../../../hooks/useAppSelector"
import {
  showAnswerSelector,
  currentFlashcardSelector,
} from "../../../../../../state/redux/features/Flashcard/flashcardSlice"
import flashcardService from "../../utils/flashcardController"
import { isTrainingSelector } from "../../../../../../state/redux/features/Flashcard/flashcardSlice"

type Props = {}

/**
 * Shows the right button
 * @param props
 * @returns
 */
const FlashcardTrainerRight = (props: Props) => {
  const dispatch = useAppDispatch()
  const showAnswer = useAppSelector(showAnswerSelector)
  const isTraining = useAppSelector(isTrainingSelector)

  function selectedRight() {
    dispatch(toggleHasSelected(""))
    dispatch(changeFlashcardTrainerSelection(true))
    dispatch(nextQuestion(true))
  }

  useEffect(() => {}, [showAnswer])

  if (isTraining && showAnswer) {
    return (
      <div
        className="flashcardtrainer__right"
        data-testid="flashcardtrainer__right"
      >
        <button
          type="button"
          className="btn btn-success"
          onClick={selectedRight}
        >
          Right
        </button>
      </div>
    )
  } else return null
}

export default FlashcardTrainerRight
