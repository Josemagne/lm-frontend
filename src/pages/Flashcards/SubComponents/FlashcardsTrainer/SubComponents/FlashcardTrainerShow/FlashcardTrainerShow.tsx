import React, { useEffect } from "react"
import useAppDispatch from "../../../../../../hooks/useAppDispatch"
import useAppSelector from "../../../../../../hooks/useAppSelector"
import { showAnswerSelector } from "../../../../../../state/redux/features/Flashcard/flashcardSlice"
import {
  isTrainingSelector,
  toggleShowAnswer,
} from "../../../../../../state/redux/features/Flashcard/flashcardSlice"
import "./flashcardtrainershow.scss"

/**
 * Button that shows the answer
 */
const FlashcardTrainerShow = () => {
  const dispatch = useAppDispatch()

  const isTraining = useAppSelector(isTrainingSelector)
  const showAnswer = useAppSelector(showAnswerSelector)

  function _showAnswer() {
    dispatch(toggleShowAnswer(""))
  }

  useEffect(() => {}, [isTraining])
  if (isTraining) {
    return (
      <div
        className={
          showAnswer
            ? "flashcardtrainer__show showanswer "
            : "flashcardtrainer__show"
        }
      >
        <button type="button" onClick={_showAnswer}>
          Show
        </button>
      </div>
    )
  } else if (isTraining && showAnswer) return null
  else return null
}

export default FlashcardTrainerShow
