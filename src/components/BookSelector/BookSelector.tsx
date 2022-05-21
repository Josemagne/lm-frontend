import { useEffect, useState } from "react"
import useAppDispatch from "../../hooks/useAppDispatch"
import { AutoComplete } from "rsuite"
import useAppSelector from "../../hooks/useAppSelector"
import { LM_Book } from "../../types/Book/book"
import {
  changeSelectedBook,
  fetchBooksBackend,
  deleteSelectedBook,
  selectedBookSelector,
  booksSelector,
} from "../../state/redux/features/bookSlice"
import Flashcard from "../../classes/base/Flashcard"
import { changeNewFlashcard } from "../../state/redux/features/Flashcard/flashcardSlice"
import { nanoid } from "nanoid"

/**
 * Lets us select the book for the flashcards.
 * @param props
 * @returns
 */
const BookSelector = () => {
  const [titles, setTitles] = useState<string[]>([])
  const dispatch = useAppDispatch()

  const selectedBook: LM_Book = useAppSelector(selectedBookSelector)

  const books: LM_Book[] = useAppSelector(booksSelector) as LM_Book[]

  if (!books)
    return (
      <div className="lm-lc-bookselector">
        <p>No books yet!</p>
      </div>
    )

  /**
   * Gets each title from the book and sets it int titles: string[]
   * @param books
   * @returns
   */
  function getTitles(books: LM_Book[]) {
    const _books = Object.values(books)
    const _titles: string[] = []

    if (books.length < 1) return

    for (let i = 0; i < _books.length; i++) {
      let title = ""

      if (books[i].author_name) {
        title =
          books[i].author_prename +
          books[i].author_name +
          " - " +
          books[i].book_title
      } else {
        title = books[i].author_prename + " - " + books[i].book_title
      }

      _titles.push(title)
    }

    setTitles(_titles)
  }

  if (titles.length < 1) {
    getTitles(Object.values(books))
  }

  /*
   * Gets title from the main title
   */
  function getTitle(mainTitle: string) {
    return mainTitle.split("-")[1].trim()
  }

  const selectionHandler = (v: string) => {
    const _selectedBook = books.find((b) => {
      if (b.book_title === getTitle(v)) return b
    })

    if (!_selectedBook) return

    dispatch(changeSelectedBook(_selectedBook))
  }

  function removeSelectedBook() {
    dispatch(changeSelectedBook(null))
  }

  useEffect(() => {
    console.log("selectedBook", selectedBook)
  }, [selectedBook])

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchBooksBackend())
  }, [])

  useEffect(() => {
    if (!books) return
    getTitles(Object.values(books))
  }, [books])

  const TitlePlaceHolder = () => {
    return (
      <div className="bookselector__placeholder">
        <h3>{selectedBook.book_title}</h3>
        <div className="bookselector__placeholder__delete">
          <button
            className="btn btn-close"
            onClick={() => removeSelectedBook()}
          ></button>
        </div>
      </div>
    )
  }

  return (
    <div className="lm-gc-bookselector">
      {selectedBook && <TitlePlaceHolder />}
      {!selectedBook && (
        <>
          <div className="bookselector__title">
            <h3>Select a book</h3>
          </div>
          {titles ? (
            //   @ts-ignore
            <AutoComplete
              renderMenuItem={(item) => {
                return <div className="fs-2">{item}</div>
              }}
              onSelect={(v) => selectionHandler(v)}
              // @ts-ignore
              data={titles}
              data-test-id="bookselectorinput"
            />
          ) : null}
        </>
      )}
    </div>
  )
}

export default BookSelector
