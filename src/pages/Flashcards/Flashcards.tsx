import React, { useEffect } from "react"
import useAppDispatch from "../../hooks/useAppDispatch"
import useAppSelector from "../../hooks/useAppSelector"
import BookSelector from "../../components/BookSelector/BookSelector"
import { fetchBooksBackend } from "../../state/redux/features/bookSlice"
import FlashcardAdder from "../../components/FlashcardAdder/FlashcardAdder"
import { LM_EntityName } from "../../types/Entity/entity"
import FlashcardsPagination from "./SubComponents/FlashcardsPagination/FlashcardsPagination"
import { switchAddingNewFlashcardStatus } from "../../state/redux/features/Flashcard/flashcardSlice"
import FlashcardsFilter from "./SubComponents/FlashcardsFilter/FlashcardsFilter"

type Props = {}

const Flashcards = (props: Props) => {
  const dispatch = useAppDispatch()

  const selectedBook = useAppSelector((state) => state.books.selectedBook)

  function toggleAddingNewFlashcard() {
    dispatch(switchAddingNewFlashcardStatus(""))
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
              onClick={toggleAddingNewFlashcard}
            >
              Add flashcard
            </button>
          </div>
          <hr />
          <div className="flashcards__filter">
            <FlashcardsFilter />
          </div>
          <hr />
          <div className="flashcards__viewer">
            {selectedBook && <FlashcardsPagination />}
          </div>
        </>
      )}
    </div>
  )
}

export default Flashcards
