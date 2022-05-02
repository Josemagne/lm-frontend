import React, { useState, useEffect } from "react";
import ChapterContainer from "./SubComponents/ChapterContainer/ChapterContainer";
import ChapterAdder from "./SubComponents/ChapterAdder/ChapterAdder";
import LM_Chapter from "../../../types/Book/chapter";
import useAppSelector from "../../../hooks/useAppSelector";
import { LM_Book } from "../../../types/Book/book";
import BookSelector from "../../../components/BookSelector/BookSelector";
import useAppDispatch from "../../../hooks/useAppDispatch";
import {
  fetchChaptersBackend,
  fetchChaptersFrontend,
  toggleAddingNewChapter,
  updateSelectedChapter,
} from "../../../state/redux/features/chapterSlice";
import ChapterModal from "./../ChapterModal/ChapterModal"
import ChapterPagination from "./SubComponents/ChaptersPagination/ChaptersPagination";
import {fetchBooksBackend, fetchBooksFrontend} from "../../../state/redux/features/bookSlice"

const ChaptersViewer = () => {
  const dispatch = useAppDispatch();

  const selectedBook: LM_Book | null = useAppSelector((state) => state.books.selectedBook);
  let chapters: LM_Chapter[] | null = null;
  let filteredChapters:LM_Chapter[] | null;
  const addingNewChapter = useAppSelector(
    (state) => state.chapters.addingNewChapter
  );

  try {
    if (selectedBook) {
      // @ts-ignore
        filteredChapters = chapters.filter((chapter) => chapter.book_id === selectedBook.book_id);
    }
  } catch (err) {
    filteredChapters = null;
  }

  let selectedChapter: LM_Chapter | null;
  try {
    selectedChapter = useAppSelector((state) => state.chapters.selectedChapter);
  } catch (err) {
    selectedChapter = null;
  }

	
  function openChapterAdder() {
    dispatch(toggleAddingNewChapter(""));
  }

  useEffect(() => {
    console.log("selectedBOok: ", selectedBook)
    console.log("addingNewChapter: ", addingNewChapter)
    if (!selectedBook)  return;
   fetchChaptersBackend(selectedBook.book_id);
    fetchChaptersFrontend(selectedBook.book_id);
  }, [selectedBook]);

  useEffect(() => {

  },[addingNewChapter])

  useEffect(()=> {
  },[])

  return (
    <div className="lm-chaptersviewer lm-page">
      {/* NOTE Shows the book that we are treating at the moment */}
      <div className="lm-chaptersviewer__bookinformation">
        <h4>{selectedBook ? selectedBook.book_title : null}</h4>
      </div>
      <BookSelector />

      {
      selectedBook ?
      <ChapterAdder /> 
      : null
      }
      <button className="btn btn-primary" onClick={openChapterAdder}>
        Add Chapter
      </button>

      <div className="lm-chapters"></div>
      <ChapterModal />
      <ChapterPagination />
    </div>
  );
};

export default ChaptersViewer;


