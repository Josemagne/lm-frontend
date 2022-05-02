import {useEffect} from "react"
import useAppSelector from "../../../../hooks/useAppSelector"
import {Modal} from "rsuite"

/**
 * Handles Flashcard data in a modal
 */
export default function FlashcardModal() {
  const selectedFlashcard = useAppSelector((state) => state.flashcards.selectedFlashcard)

  useEffect(() => {

  }, [selectedFlashcard])
  return (
    <Modal open={selectedFlashcard ? true : false }className="lm-gc-flashcardmodal">
      
    </Modal>

  )
}
