import { useState, useEffect } from "react"
import {
  changeSelectedBook,
  toggleIsSelectingBook,
} from "../../../../../state/redux/features/bookSlice"
import { useNavigate } from "react-router"
import { LM_Book } from "../../../../../types/Book/book"
import { useDispatch } from "react-redux"
import useAppDispatch from "../../../../../hooks/useAppDispatch"
import Server from "../../../../../services/Server"
import Delete from "../Delete/Delete"

type Props = {
  book: LM_Book
}

const BookContainer = ({ book }: Props) => {
  const dispatch = useAppDispatch()

  const { author_name, author_prename, pages, progress, book_id, book_title } =
    book

  // We lead the user to /bookmodifier/{book_id}
  const handleClick = () => {
    dispatch(changeSelectedBook(book))
    dispatch(toggleIsSelectingBook(""))
  }

  useEffect(() => {})
  return (
    <div
      onClick={() => {
        handleClick()
      }}
      className="lm-bookcontainer"
    >
      <div className="lm-authorviewer">
        <span>{author_prename}</span>
        <span> - </span>
        <span>{author_name}</span>
      </div>
      <div className="lm-titleviewer">
        <span>{book_title}</span>
      </div>
      <div className="lm-progressviewer">{progress.toString() + "%"}</div>
      <div className="lm-pagesviewer">pages: {pages}</div>
      <div className="lm-imageviewer"></div>
      <Delete book_id={book_id} />
    </div>
  )
}

export default BookContainer
