import { useEffect } from "react"

import Flashcard from "../../classes/base/Flashcard"
import {
  changeSelectedBook,
  selectedBookSelector,
} from "../../state/redux/features/bookSlice"
import { LM_Book } from "../../types/Book/book"
import Answer from "../FlashCard/SubComponents/Answer/Answer"
import Question from "../FlashCard/SubComponents/Question/Question"
import LM_Chapter from "../../types/Book/chapter"
import useAppDispatch from "../../hooks/useAppDispatch"
import useAppSelector from "../../hooks/useAppSelector"
import { nanoid } from "nanoid"
import { LM_EntityName } from "../../types/Entity/entity"
import API from "../../api/API"
import {
  changeNewFlashcard,
  addFlashcard,
  newFlashcardSelector,
  isAddingNewFlashcardSelector,
  toggleIsAddingNewFlashcard,
} from "../../state/redux/features/Flashcard/flashcardSlice"
import { Modal } from "rsuite"
import { RootState } from "../../state/redux/store"

type Props = {
  type: LM_EntityName
}

/**
 * Modal that adds a flashcard to a chapter or to a book
 * @param props
 * @returns
 */
const FlashcardAdder = ({ type }: Props) => {
  const dispatch = useAppDispatch()

  const newFlashcard = useAppSelector(newFlashcardSelector)
  const isAddingNewFlashcard = useAppSelector(isAddingNewFlashcardSelector)

  const selectedBook = useAppSelector(selectedBookSelector)

  /**
   * Changes the book with the new flashcard
   */
  async function submitHandler() {
    let flashcardCopy = JSON.parse(JSON.stringify(newFlashcard))
    flashcardCopy.flashcardType = type
    flashcardCopy.book_id = selectedBook.book_id
    await API.addFlashcard(flashcardCopy)
    dispatch(addFlashcard(flashcardCopy))
  }

  async function handleClose() {
    dispatch(toggleIsAddingNewFlashcard(""))
    dispatch(
      changeNewFlashcard(
        new Flashcard(nanoid(), "", "", "BOOK", selectedBook.book_id)
      )
    )
  }

  useEffect(() => {}, [isAddingNewFlashcard])

  return (
    <Modal
      open={isAddingNewFlashcard ? true : false}
      onClose={handleClose}
      className="lm-gc-flashcardadder"
    >
      <div className="flashcard__header">
        <div className="flashcardadder__exit">
          <button className="btn btn-danger" onClick={handleClose}>
            x
          </button>
        </div>
      </div>
      <div className="container">
        <div className="lm-gc-flashcardadder__question">
          <Question isNew={true} />
        </div>
        <div className="lm-gc-flashcardadder__answer">
          <Answer isNew={true} />
        </div>
        <div className="lm-gc-flashcardadder__button">
          <button className="btn btn-primary" onClick={submitHandler}>
            +
          </button>
        </div>
      </div>
      {/*Shows the last 3 flashcards that were added from lg and onward */}
      <div className="lm-gc-flashcardadder__preview"></div>
    </Modal>
  )
}

export default FlashcardAdder
