import React, { useEffect } from "react"
import useAppDispatch from "../../../../../../hooks/useAppDispatch"
import useAppSelector from "../../../../../../hooks/useAppSelector"
import { showAnswerSelector } from "../../../../../../state/redux/features/Flashcard/flashcardSlice"
import {
  isTrainingSelector,
  toggleShowAnswer,
} from "../../../../../../state/redux/features/Flashcard/flashcardSlice"

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

  useEffect(() => {}, [isTraining, showAnswer])
  if (isTraining && !showAnswer) {
    return (
      <div className="flashcardtrainer__show">
        <button type="button" onClick={_showAnswer}>
          Show
        </button>
      </div>
    )
  } else return null
}

export default FlashcardTrainerShow
