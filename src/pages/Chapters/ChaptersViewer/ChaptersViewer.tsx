import { useState, useEffect } from "react";
import ChapterContainer from "./SubComponents/ChapterContainer/ChapterContainer";
import ChapterAdder from "./SubComponents/ChapterAdder/ChapterAdder";
import LM_Chapter from "../../../types/Book/chapter";
import useAppSelector from "../../../hooks/useAppSelector";
import ChapterModifier from "../ChapterModal/ChapterModal";
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
type Props = {};

const ChaptersViewer = ({}: Props) => {
  const dispatch = useAppDispatch();

  let selectedBook: LM_Book | null;
  let chapters: LM_Chapter[] | null;
  let filteredChapters:LM_Chapter[] | null;

  try {
    selectedBook = useAppSelector((state) => state.books.selectedBook);
    chapters = Object.values(
      useAppSelector((state) => state.chapters.chapters.chapters))
    
    if (selectedBook) {
      // @ts-ignore
        filteredChapters = chapters.filter((chapter) => chapter.book_id === selectedBook.book_id);
    }
  } catch (err) {
    selectedBook = null;
    chapters = null
    filteredChapters = null;
  }

  let selectedChapter: LM_Chapter | null;
  try {
    selectedChapter = useAppSelector((state) => state.chapters.selectedChapter);
  } catch (err) {
    selectedChapter = null;
  }

  const addingNewChapter = useAppSelector(
    (state) => state.chapters.addingNewChapter
  );
	
  function openChapterAdder() {
    dispatch(toggleAddingNewChapter(""));
  }

  useEffect(() => {
    if (!selectedBook)  return;
    fetchChaptersBackend(selectedBook.book_id);
    fetchChaptersFrontend(selectedBook.book_id);
  }, [selectedBook]);

  return (
    <div className="lm-chaptersviewer lm-page">
      {/* NOTE Shows the book that we are treating at the moment */}
      <div className="lm-chaptersviewer__bookinformation">
        <h4></h4>
      </div>
      <BookSelector />

      {selectedBook && addingNewChapter ? 
        <>
      <ChapterAdder /> 
        </>
      : null}
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


