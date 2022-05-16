import React, { useState, useEffect } from "react"
import ChapterContainer from "./SubComponents/ChapterContainer/ChapterContainer"
import ChapterAdder from "./SubComponents/ChapterAdder/ChapterAdder"
import LM_Chapter from "../../../types/Book/chapter"
import useAppSelector from "../../../hooks/useAppSelector"
import { LM_Book } from "../../../types/Book/book"
import BookSelector from "../../../components/BookSelector/BookSelector"
import useAppDispatch from "../../../hooks/useAppDispatch"
import {
  fetchChaptersBackend,
  fetchChaptersFrontend,
  toggleAddingNewChapter,
} from "../../../state/redux/features/chapterSlice"
import ChapterModal from "./../ChapterModal/ChapterModal"
import ChapterPagination from "./SubComponents/ChaptersPagination/ChaptersPagination"
import { selectedBookSelector } from "../../../state/redux/features/bookSlice"
import {
  selectedChapterSelector,
  isAddingNewChapterSelector,
} from "../../../state/redux/features/chapterSlice"
import {
  fetchBooksBackend,
  fetchBooksFrontend,
} from "../../../state/redux/features/bookSlice"

const ChaptersViewer = () => {
  const dispatch = useAppDispatch()

  const selectedBook: LM_Book | null = useAppSelector(selectedBookSelector)

  const isAddingNewChapter = useAppSelector(isAddingNewChapterSelector)

  const selectedChapter: LM_Chapter | null = useAppSelector(
    selectedChapterSelector
  )

  function openChapterAdder() {
    dispatch(toggleAddingNewChapter(""))
  }

  useEffect(() => {
    if (!selectedBook) return
    fetchChaptersBackend(selectedBook.book_id)
  }, [selectedBook])

  useEffect(() => {}, [isAddingNewChapter])

  useEffect(() => {}, [])

  return (
    <div className="lm-chaptersviewer lm-page">
      {/* NOTE Shows the book that we are treating at the moment */}
      <div className="lm-chaptersviewer__bookinformation">
        <h4>{selectedBook ? selectedBook.book_title : null}</h4>
      </div>
      <BookSelector />

      {selectedBook && <ChapterAdder />}

      {selectedBook && (
        <button className="btn btn-primary" onClick={openChapterAdder}>
          Add Chapter
        </button>
      )}

      <div className="lm-chapters"></div>
      {selectedChapter && <ChapterModal />}
      {selectedBook && <ChapterPagination />}
    </div>
  )
}

export default ChaptersViewer
