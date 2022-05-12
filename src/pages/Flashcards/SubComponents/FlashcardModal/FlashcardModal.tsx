import React, { useRef, useEffect, useState } from "react"
import ReactQuill from "react-quill"
import useAppSelector from "../../../../hooks/useAppSelector"
import { LM_Flashcard } from "../../../../types/Flashcard/flashcard"
import useAppDispatch from "../../../../hooks/useAppDispatch"
import { changeSelectedFlashcard } from "../../../../state/redux/features/Flashcard/flashcardSlice"
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
    (state) => state.flashcards.selectedFlashcard
  )
  const editorRef = useRef(null)

  const handleClose = async () => {
    dispatch(changeSelectedFlashcard(null))
    if (!selectedFlashcardCopyLocal) return
    await API.updateFlashcard(selectedFlashcardCopyLocal)
  }

  function closeModal() {
    dispatch(changeSelectedFlashcard(null))
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
      size="full"
    >
      <div className="flashcardmodal__exit">
        <button className="btn btn-danger" onClick={closeModal}>
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
