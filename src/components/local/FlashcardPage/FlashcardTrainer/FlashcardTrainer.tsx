import React, { useEffect } from "react"
import { Modal } from "rsuite"
import useAppDispatch from "../../../../hooks/useAppDispatch"
import useAppSelector from "../../../../hooks/useAppSelector"
import {
  fetchFlashcardsBackend,
  toggleIsTraining,
} from "../../../../state/redux/features/Flashcard/flashcardSlice"
import { RootState } from "../../../../state/redux/store"
import { LM_Flashcard } from "../../../../types/Flashcard/flashcard"
import flashcardTrainerFilter from "./utils/flashcardTrainerFilter"

type Props = {}

/**
 * Modal where we revise the flashcards
 * @param props
 * @returns
 */
const FlashcardTrainer = (props: Props) => {
  const dispatch = useAppDispatch()

  const isTraining: boolean = useAppSelector(
    (state: RootState) => state.flashcards.isTraining
  )

  const flashcards: LM_Flashcard[] = Object.values(
    useAppSelector((state: RootState) => state.flashcards.flashcards.flashcards)
  )
  const flashcardsForTraining: string[] = useAppSelector(
    (state: RootState) =>
      state.flashcards.flashcardTraining.flashcardsForTraining
  )

  function handleClose() {
    dispatch(toggleIsTraining(""))
  }

  function exitTrainingSession() {
    dispatch(toggleIsTraining(""))
  }

  useEffect(() => {
    if (flashcards.length < 1) return
    flashcardTrainerFilter(flashcards, flashcardsForTraining)
  }, [flashcards])

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchFlashcardsBackend())
  }, [])

  return (
    <Modal open={isTraining} className="lm-lc-flashcardtrainer">
      <div className="flashcardtrainer__header">
        <div className="flashcardtrainer__exit">
          <div className="flashcardtrainer__metadata">
            <div className="subject"></div>
            <div className="title"></div>
          </div>
          <button className="btn btn-danger" onClick={exitTrainingSession}>
            x
          </button>
        </div>
      </div>
      <div className="flashcardtrainer__body">
        <div className="flashcardtrainer__question"></div>
        <div className="flashcardtrainer__answer"></div>
      </div>
      <div className="flashcardtrainer__footer">
        <div className="flashcardtrainer__status"></div>
      </div>
    </Modal>
  )
}

export default FlashcardTrainer
