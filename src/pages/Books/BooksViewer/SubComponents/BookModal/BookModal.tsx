import React, { Fragment, useState, useEffect } from "react"
import { LM_Book } from "../../../../../types/Book/book"
import { Button, Modal } from "rsuite"
import { useNavigate } from "react-router"
import {
  changeSelectedBook,
  deleteSelectedBook,
  isSelectingBookSelector,
  toggleIsSelectingBook,
} from "../../../../../state/redux/features/bookSlice"
import useAppDispatch from "../../../../../hooks/useAppDispatch"
import useAppSelector from "../../../../../hooks/useAppSelector"
import FlashcardAdder from "../../../../../components/FlashcardAdder/FlashcardAdder"
import API from "../../../../../api/API"
import { selectedBookSelector } from "../../../../../state/redux/features/bookSlice"

type Props = {}

/**
 * Shows Modal for the book
 * @param param0
 * @returns
 */
const BookModal = ({}: Props) => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const isSelectingBook: boolean = useAppSelector(isSelectingBookSelector)
  const selectedBook: LM_Book = useAppSelector(selectedBookSelector)

  const handleClose = () => {
    dispatch(changeSelectedBook(null))
    dispatch(toggleIsSelectingBook(""))
  }

  /**
   * Remove book
   */
  function removeBook() {
    dispatch(deleteSelectedBook(""))
    dispatch(toggleIsSelectingBook(""))
    API.deleteBook(selectedBook.book_id)
  }

  useEffect(() => {
    console.log("selected: ", selectedBook)
  }, [selectedBook])

  return (
    <Modal
      className="lm-bookmodal"
      overflow={true}
      open={selectedBook && isSelectingBook}
      onClose={handleClose}
    >
      {isSelectingBook && selectedBook ? (
        <Fragment>
          <Modal.Header>
            <h3 className="lm-bookmodal-title">
              <span>{selectedBook.author_prename}</span>
              <span>{selectedBook.author_name}</span>
              <span> - </span>
              <span>{selectedBook.book_title}</span>
            </h3>
          </Modal.Header>
          <Modal.Body className="lm-bookmodal__body">
            {selectedBook && <p>pages: {selectedBook.pages}</p>}

            {/* NOTE The links lead to other parts of the website */}
            <div className="lm-bookmodal__links">
              <div
                onClick={() => {
                  if (!selectedBook) return
                  handleClose()
                  dispatch(changeSelectedBook(selectedBook))
                  navigate(`/flashcards`, {
                    replace: true,
                  })
                }}
              >
                <Button>Go to flashcards</Button>
              </div>
              <div
                className="lm-bookmodal__btn"
                onClick={() => {
                  if (!selectedBook.book_id) return
                  handleClose()
                  dispatch(changeSelectedBook(selectedBook))
                  navigate(`/chaptersviewer/${selectedBook.book_title}`, {
                    replace: true,
                  })
                }}
              >
                <Button>Go to chapters</Button>
              </div>
            </div>
            <button className="btn btn-danger" onClick={removeBook}>
              Delete the book
            </button>
            <hr className="my-3" />
            {/* TODO FlashcardAdder */}
            <FlashcardAdder type="BOOK" />
            {/* TODO Summary */}
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
          {/* Author */}
          {/* Title */}
          {/* Chapters */}
        </Fragment>
      ) : null}
    </Modal>
  )
}

export default BookModal
