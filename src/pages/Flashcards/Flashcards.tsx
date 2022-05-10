import React, { useEffect } from "react"
import useAppDispatch from "../../hooks/useAppDispatch"
import useAppSelector from "../../hooks/useAppSelector"
import BookSelector from "../../components/BookSelector/BookSelector"
import Flashcardsviewer from "./SubComponents/Flashcardsviewer/Flashcardsviewer"
import { fetchBooksBackend } from "../../state/redux/features/bookSlice"
import FlashcardAdder from "../../components/FlashcardAdder/FlashcardAdder"
import { LM_EntityName } from "../../types/Entity/entity"
import FlashcardsPagination from "./SubComponents/FlashcardsPagination/FlashcardsPagination"

type Props = {}

const Flashcards = (props: Props) => {
  const dispatch = useAppDispatch()

  const selectedBook = useAppSelector((state) => state.books.selectedBook)

  useEffect(() => {}, [])

  useEffect(() => {}, [selectedBook])

  return (
    <div className="lm-flashcards lm-page">
      <div className="lm-flashcards__selector">
        <BookSelector />
        {selectedBook ? <FlashcardAdder type="BOOK" /> : null}
      </div>
      <div className="lm-flashcards__viewer">
        <FlashcardsPagination />
      </div>
    </div>
  )
}

export default Flashcards
