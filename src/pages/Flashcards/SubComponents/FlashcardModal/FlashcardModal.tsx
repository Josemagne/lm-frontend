import React, { useRef, useEffect, useState } from "react"
import ReactQuill from "react-quill"
import useAppSelector from "../../../../hooks/useAppSelector"
import { LM_Flashcard } from "../../../../types/Flashcard/flashcard"
import useAppDispatch from "../../../../hooks/useAppDispatch"
import {
  changeSelectedFlashcard,
  isSelectingFlashcardSelector,
  selectedFlashcardSelector,
} from "../../../../state/redux/features/Flashcard/flashcardSlice"
import API from "../../../../api/API"
import Flashcard from "../../../../classes/base/Flashcard"
import { Container, Modal } from "rsuite"
import Question from "../../../../components/FlashCard/SubComponents/Question/Question"
import Answer from "../../../../components/FlashCard/SubComponents/Answer/Answer"

type Props = {}

/**
 * Shows a flashcard that we can edit
 * @param props
 * @returns
 */
const FlashcardModal = (props: Props) => {
  const [selectedFlashcardCopyLocal, setSelectedFlashcardCopyLocal] = useState<
    LM_Flashcard | undefined
  >()

  const dispatch = useAppDispatch()

  const selectedFlashcard: LM_Flashcard = useAppSelector(
    selectedFlashcardSelector
  )

  // const isSelectingFlashcard: boolean = useAppSelector(
  //   isSelectingFlashcardSelector
  // )

  const editorRef = useRef(null)

  const handleClose = () => {
    dispatch(changeSelectedFlashcard(null))
    if (!selectedFlashcardCopyLocal) return
    API.updateFlashcard(selectedFlashcardCopyLocal)
  }

  useEffect(() => {
    setSelectedFlashcardCopyLocal(selectedFlashcard)
  }, [selectedFlashcard])

  return (
    <Modal
      overflow={true}
      open={selectedFlashcard ? true : false}
      onClose={handleClose}
      className="lm-gc-flashcardmodal"
    >
      <div className="flashcardmodal__exit">
        <button className="btn btn-danger" onClick={handleClose}>
          x
        </button>
      </div>
      <div className="flashcardmodal__flashcard">
        <div className="flashcardmodal__question">
          <Question isNew={false} />
        </div>
        <div className="flashcardmodal__answer">
          <Answer isNew={false} />
        </div>
      </div>
    </Modal>
  )
}

export default FlashcardModal
