import React, { useEffect } from "react"
import useAppDispatch from "../../hooks/useAppDispatch"
import useAppSelector from "../../hooks/useAppSelector"
import BookSelector from "../../components/BookSelector/BookSelector"
import {
  fetchBooksBackend,
  selectedBookSelector,
} from "../../state/redux/features/bookSlice"
import FlashcardAdder from "../../components/FlashcardAdder/FlashcardAdder"
import { LM_EntityName } from "../../types/Entity/entity"
import FlashcardsPagination from "./SubComponents/FlashcardsPagination/FlashcardsPagination"
import {
  toggleIsAddingNewFlashcard,
  toggleOpenFlashcardTrainer,
} from "../../state/redux/features/Flashcard/flashcardSlice"
import FlashcardsFilter from "./SubComponents/FlashcardsFilter/FlashcardsFilter"
import { LM_Book } from "../../types/Book/book"
import FlashcardTrainer from "./SubComponents/FlashcardsTrainer/FlashcardTrainer"

const Flashcards = () => {
  const dispatch = useAppDispatch()

  const selectedBook = useAppSelector(selectedBookSelector)

  function openFlashcardTrainer() {
    dispatch(toggleOpenFlashcardTrainer(""))
  }

  useEffect(() => {}, [])

  useEffect(() => {}, [selectedBook])

  return (
    <div className="lm-flashcards lm-page">
      <div className="lm-flashcards__selector">
        <BookSelector />
        {selectedBook ? <FlashcardAdder type="BOOK" /> : null}
      </div>
      <hr />
      {selectedBook && (
        <>
          <div className="flashcards__add">
            <button
              className="btn btn-primary"
              // @ts-ignore
              onClick={() => dispatch(toggleIsAddingNewFlashcard(""))}
            >
              Add flashcard
            </button>
          </div>
          <hr />
          <div className="flashcards__training">
            <button
              className="btn btn-secondary"
              onClick={openFlashcardTrainer}
            >
              Start Revision
            </button>
          </div>{" "}
          <hr />{" "}
          <div className="flashcards__filter">
            <FlashcardsFilter />
          </div>
          <hr />
          <div className="flashcards__viewer">
            {selectedBook && <FlashcardsPagination />}
          </div>
        </>
      )}
      <FlashcardTrainer />
    </div>
  )
}

export default Flashcards
