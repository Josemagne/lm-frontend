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
import BookOverview from "./SubComponents/BookOverview/BookOverview"
import PdfOverview from "./SubComponents/BookOverview/SubComponents/PDFOverview/PDFOverview"
import { summariesSelector } from "../../../../../state/redux/selectors/summarySelectors"
import { LM_Flashcard } from "../../../../../types/Flashcard/flashcard"
import { LM_Note } from "../../../../../types/Note/note"
import { fetchFlashcardsBackend } from "../../../../../state/redux/features/Flashcard/flashcardSlice"
import html2canvas from "html2canvas"
import jsPdf from "jspdf"
import axios from "axios"

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

  const summaries = useAppSelector(summariesSelector)
  const flashcards = Object.values(
    useAppSelector((s) => s.flashcards.flashcards.flashcards)
  ) as LM_Flashcard[]
  const notes = Object.values(
    useAppSelector((s) => s.notes.notes.notes)
  ) as LM_Note[]

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
    if (!sessionStorage.getItem("isTesting")) {
      API.deleteBook(selectedBook.book_id)
    }
  }

  const savePdf = () => {
    const domElement = document.querySelector(".bookmodal__bookoverview")
    if (!domElement) return
    // @ts-ignore
    html2canvas(domElement, {
      onclone: (document) => {},
    }).then((canvas) => {
      const img = canvas.toDataURL("image/jpeg")

      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      const pdf = new jsPdf("p", "mm", "a4")
      let position = 0

      pdf.addImage(img, "JPEG", 15, 2, imgWidth, imgHeight)

      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(img, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }
      pdf.save("file.pdf")
    })

    // return axios({
    //   url: "http://localhost:4000/api/v1/pdf",
    //   method: "GET",
    // }).then((pdfData) => {
    //   // @ts-ignore
    //   const blob = new Blob([pdfData], { type: "application/pdf" })
    //   const link = document.createElement("a")
    //   link.href = window.URL.createObjectURL(blob)
    //   link.download = `file-name.pdf`
    //   link.click()
    // })
  }

  useEffect(() => {
    console.log("selected: ", selectedBook)
  }, [selectedBook])

  useEffect(() => {
    if (isSelectingBook && selectedBook) {
      // @ts-ignore
      dispatch(fetchFlashcardsBackend(selectedBook.book_id))
    }
  }, [isSelectingBook, selectedBook])

  return (
    <Modal
      className="lm-bookmodal"
      overflow={true}
      open={selectedBook && isSelectingBook}
      onClose={handleClose}
      data-testid="bookmodal"
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

            <div className="bookmodal__pdfviewer">
              <p>You can download your flashcards. Here you go:</p>
              <button className="btn btn-primary" onClick={savePdf}>
                Download
              </button>
            </div>
            <BookOverview
              flashcards={flashcards}
              summaries={summaries}
              notes={notes}
              book={selectedBook}
            />
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
