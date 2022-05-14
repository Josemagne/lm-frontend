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
import generateQueue from "./utils/generateQueue"
import { flashcardsForTrainingSelector } from "../../../../state/redux/features/Flashcard/flashcardSlice"
import {
  isTrainingSelector,
  flashcardsSelector,
} from "../../../../state/redux/features/Flashcard/flashcardSlice"

type Props = {}

/**
 * Modal where we revise the flashcards
 * @param props
 * @returns
 */
const FlashcardTrainer = (props: Props) => {
  const dispatch = useAppDispatch()

  const isTraining: boolean = useAppSelector(isTrainingSelector)

  const flashcards: LM_Flashcard[] = useAppSelector(
    flashcardsSelector
  ) as LM_Flashcard[]

  const flashcardsForTraining: string[] = useAppSelector(
    flashcardsForTrainingSelector
  )

  function handleClose() {
    dispatch(toggleIsTraining(""))
  }

  useEffect(() => {
    if (flashcards.length < 1) return
    const filteredFlashcards = flashcardTrainerFilter(
      flashcards,
      flashcardsForTraining
    )
    generateQueue(filteredFlashcards)
  }, [flashcards])

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchFlashcardsBackend())
  }, [])

  return (
    <Modal
      open={isTraining}
      onClose={handleClose}
      className="lm-lc-flashcardtrainer"
    >
      <div className="flashcardtrainer__header">
        <div className="flashcardtrainer__exit">
          <div className="flashcardtrainer__metadata">
            <div className="subject"></div>
            <div className="title"></div>
          </div>
          <button className="btn btn-danger" onClick={handleClose}>
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
