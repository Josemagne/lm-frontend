import React, { useEffect } from "react"
import useAppSelector from "../../../../hooks/useAppSelector"
import {
  changeFlashcardsForTraining,
  isTrainingSelector,
  toggleIsTraining,
  toggleOpenFlashcardTrainer,
} from "../../../../state/redux/features/Flashcard/flashcardSlice"
import useAppDispatch from "../../../../hooks/useAppDispatch"
import { Modal } from "rsuite"
import FlashcardTrainerQuestion from "./SubComponents/FlashcardTrainerQuestion/FlashcardTrainerQuestion"
import getFlashcardsForTraining from "./utils/getFlaschardsForTraining"
import {
  flashcardsSelector,
  hasSelectedSelector,
} from "../../../../state/redux/features/Flashcard/flashcardSlice"
import { LM_Flashcard } from "../../../../types/Flashcard/flashcard"
import FlashcardTrainerStart from "./SubComponents/FlashcardTrainerStart/FlashcardTrainerStart"
import FlashcardTrainerRight from "./SubComponents/FlashcardTrainerRight/FlashcardTrainerRight"
import FlashcardTrainerWrong from "./SubComponents/FlashcardTrainerWrong/FlashcardTrainerWrong"
import FlashcardTrainerAnswer from "./SubComponents/FlashcardTrainerAnswer/FlashcardTrainerAnswer"
import {
  openFlashcardTrainerSelector,
  showAnswerSelector,
} from "../../../../state/redux/features/Flashcard/flashcardSlice"
import FlashcardTrainerShow from "./SubComponents/FlashcardTrainerShow/FlashcardTrainerShow"
import FlashcardTrainerStatistics from "./SubComponents/FlashcardTrainerStatistics/FlashcardTrainerStatistics"
import "./flashcardtrainer.scss"

/**
 * Modal where we train for the flashcards
 * @returns
 */
const FlashcardTrainer = () => {
  const dispatch = useAppDispatch()
  const flashcards = useAppSelector(flashcardsSelector) as LM_Flashcard[]

  const isTraining = useAppSelector(isTrainingSelector) as boolean
  const hasSelected = useAppSelector(hasSelectedSelector) as boolean
  const showAnswer = useAppSelector(showAnswerSelector)
  const openFlashcardTrainer = useAppSelector(
    openFlashcardTrainerSelector
  ) as boolean

  function handleClose() {
    if (isTraining) dispatch(toggleIsTraining(""))
    dispatch(toggleOpenFlashcardTrainer(""))
  }

  useEffect(() => {}, [])
  useEffect(() => {}, [isTraining])

  return (
    // NOTE The modal is the outermost layer. We must put our content inside a div inside the modal!!!
    <Modal
      open={openFlashcardTrainer}
      // NOTE If we show the answer then we want another grid layout
      onClose={handleClose}
      // NOTE Each modal component must have a modal class. This is the wrapper
      className="flashcardtrainer__modal"
    >
      <div
        className={
          isTraining
            ? showAnswer
              ? "lm-lc-flashcardtrainer istraining showanswer"
              : "lm-lc-flashcardtrainer istraining"
            : "lm-lc-flashcardttrainer"
        }
      >
        <FlashcardTrainerStatistics />
        <FlashcardTrainerStart />
        <FlashcardTrainerQuestion />
        <FlashcardTrainerRight />
        <FlashcardTrainerWrong />
        <FlashcardTrainerShow />
        {hasSelected && <FlashcardTrainerAnswer />}
      </div>
    </Modal>
  )
}

export default FlashcardTrainer
