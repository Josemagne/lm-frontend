import React, { useEffect } from "react"
import useAppSelector from "../../../../hooks/useAppSelector"
import {
  isTrainingSelector,
  toggleIsTraining,
} from "../../../../state/redux/features/Flashcard/flashcardSlice"
import useAppDispatch from "../../../../hooks/useAppDispatch"
import { Modal } from "rsuite"
import FlashcardTrainerQuestion from "./SubComponents/FlashcardTrainerQuestion/FlashcardTrainerQuestion"

type Props = {}

/**
 * Modal where we train for the flashcards
 * @param props
 * @returns
 */
const FlashcardTrainer = (props: Props) => {
  const dispatch = useAppDispatch()
  const flashcards = useAppSelector(
    (state) => state.flashcards.flashcards.flashcards
  )

  const isTraining = useAppSelector(isTrainingSelector)

  function startFlashcardTraining() {}

  function handleClose() {
    dispatch(toggleIsTraining(""))
  }

  useEffect(() => {}, [])
  useEffect(() => {}, [isTraining])

  return (
    <Modal
      open={isTraining}
      className="lm-lc-flashcardtrainer"
      onClose={handleClose}
    >
      <div
        className="flashcardtrainer__button"
        onClick={startFlashcardTraining}
      >
        <button className="btn btn-primary">Start</button>
        <FlashcardTrainerQuestion />
      </div>
    </Modal>
  )
}

export default FlashcardTrainer
