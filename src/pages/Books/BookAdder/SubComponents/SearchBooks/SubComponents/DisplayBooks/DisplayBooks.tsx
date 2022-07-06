import React, { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import useAppSelector from "../../../../../../../hooks/useAppSelector"
import { RootState } from "../../../../../../../state/redux/store"
import "./displaybooks.scss"
import useAppDispatch from "../../../../../../../hooks/useAppDispatch"
import {
  addBook,
  changeSearchSelectedBook,
} from "../../../../../../../state/redux/features/bookSlice"
import Book from "../../../../../../../classes/Book"
import { nanoid } from "nanoid"

const DisplayBooks = () => {
  const dispatch = useAppDispatch()
  const searchedBooks = Object.values(
    useAppSelector((store: RootState) => store.books.search.books)
  ) as unknown as any[]
  const searchSelectedBook = useAppSelector(
    (store: RootState) => store.books.search.selectedBook
  )
  const [selectedBook, setSelectedBook] = useState("")

  const selectBook = (isbn: string) => {
    setSelectedBook(isbn)
    dispatch(
      changeSearchSelectedBook(
        searchedBooks.filter((b) => {
          return b.key[0] === b
        })
      )
    )
  }

  const _addBook = () => {
    const author_prename = searchSelectedBook.by_statement.split(" ")[0]
    dispatch(
      addBook(
        new Book(
          nanoid(),
          "",
          author_prename,
          searchSelectedBook.title,
          searchSelectedBook.number_of_pages,
          0,
          ""
        )
      )
    )
  }

  useEffect(() => {}, [searchedBooks])
  return (
    <div className="lm-displaybooks">
      {searchedBooks.length > 1 &&
        searchedBooks.map((s) => {
          return (
            <div
              className={`displaybooks__book ${
                s.key === selectedBook && "selected"
              }`}
              onClick={() => selectBook(s.key)}
            >
              <div className="book__cover">
                {s.cover && s.cover.small && <img src={s.cover.small} />}
              </div>
              <div className="book__title">
                <h3>
                  {s.authors && s.authors[0].name}- {s.title}
                </h3>
              </div>
              <div className="book__pages">
                <p>pages: {s.number_of_pages}</p>
              </div>
              <div className="book__subtitle">{s.subtitle && s.subtitle}</div>
            </div>
          )
        })}
      <div className="displaybooks__add" onClick={_addBook}>
        <button
          className={`btn btn-primary`}
          disabled={!(selectedBook.length > 1)}
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default DisplayBooks
