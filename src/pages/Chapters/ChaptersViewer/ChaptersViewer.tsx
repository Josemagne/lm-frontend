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

type Props = {};

const ChaptersViewer = ({}: Props) => {
  const dispatch = useAppDispatch();
  let selectedBook: LM_Book | null;
  try {
    selectedBook = useAppSelector((state) => state.books.selectedBook.book);
  } catch (err) {
    selectedBook = null;
  }

  let selectedChapter: LM_Chapter | null;
  try {
    selectedChapter = useAppSelector((state) => state.books.selectedChapter);
  } catch (err) {
    selectedChapter = null;
  }

  let chapters: LM_Chapter[] | null;
  try {
    chapters = Object.values(
      useAppSelector((state) => state.chapters.chapters.chapters)
    );
  } catch (err) {
    chapters = null;
  }

  const addingNewChapter = useAppSelector(
    (state) => state.chapters.addingNewChapter
  );

  function openChapterAdder() {
    dispatch(toggleAddingNewChapter(""));
  }

  useEffect(() => {}, [chapters, selectedChapter, selectedBook]);
  useEffect(() => {
    fetchChaptersBackend();
    fetchChaptersFrontend();
  }, []);

  return (
    <div className="lm-chaptersviewer lm-page">
      {/* NOTE Shows the book that we are treating at the moment */}
      <div className="lm-chaptersviewer__bookinformation">
        <h4></h4>
      </div>
      <button className="btn btn-primary" onClick={openChapterAdder}>
        Add a book
      </button>
      {selectedBook && addingNewChapter ? <ChapterAdder /> : null}
      <div className="lm-chapters"></div>
      <BookSelector />
    </div>
  );
};

export default ChaptersViewer;
