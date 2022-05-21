import React, { useEffect } from "react"
import useAppDispatch from "../../../../../../hooks/useAppDispatch"
import useAppSelector from "../../../../../../hooks/useAppSelector"
import {
  isTrainingSelector,
  showAnswerSelector,
} from "../../../../../../state/redux/features/Flashcard/flashcardSlice"
import {
  changeFlashcardTrainerSelection,
  toggleHasSelected,
  nextQuestion,
} from "../../../../../../state/redux/features/Flashcard/flashcardSlice"

type Props = {}

const FlashcardTrainerWrong = (props: Props) => {
  const dispatch = useAppDispatch()
  const isTraining = useAppSelector(isTrainingSelector)
  const showAnswer = useAppSelector(showAnswerSelector)

  function selectedWrong() {
    dispatch(toggleHasSelected(""))
    dispatch(changeFlashcardTrainerSelection(false))
    dispatch(nextQuestion(false))
  }

  useEffect(() => {}, [isTraining])
  if (isTraining && showAnswer) {
    return (
      <div
        className="flashcardtrainer__wrong"
        data-testid="flashcardtrainer__wrong"
      >
        <button
          type="button"
          className="btn btn-danger"
          onClick={selectedWrong}
        >
          Repeat
        </button>
      </div>
    )
  } else return null
}

export default FlashcardTrainerWrong
