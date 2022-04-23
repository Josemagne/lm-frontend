import { useState, useEffect } from "react";
import ChapterContainer from "./SubComponents/ChapterContainer/ChapterContainer";
import ChapterAdder from "./SubComponents/ChapterAdder/ChapterAdder";
import LM_Chapter from "../../../types/Book/chapter";
import useAppSelector from "../../../hooks/useAppSelector";
import ChapterModifier from "../ChapterModifier/ChapterModifier";
import { fetchChapters } from "../../../state/redux/features/chapterSlice";
import { LM_Book } from "../../../types/Book/book";
import BookSelector from "../../../components/BookSelector/BookSelector";

// ANCHOR tinymce

type Props = {};

const ChaptersViewer = ({}: Props) => {
  const bookID = window.location.href.split("/").pop();
  if (!bookID) return <p>No book selected</p>;

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

  /**
   * Contains the chapters
   */
  let chapters: LM_Chapter[] | null;
  try {
    chapters = useAppSelector(
      (state) => state.books.selectedBook.book.chapters
    );
  } catch (err) {
    chapters = null;
  }

  const openChapterModifierModal = useAppSelector(
    (state) => state.books.openChapterModifierModal
  );

  console.log("open???", openChapterModifierModal);

  useEffect(() => {}, [chapters, selectedChapter, selectedBook]);
  useEffect(() => {}, [openChapterModifierModal]);
  useEffect(() => {
    fetchChapters();
  }, []);

  return (
    <div className="lm-chaptersviewer lm-page">
      {/* NOTE Shows the book that we are treating at the moment */}
      {selectedBook ? (
        <>
          <div className="lm-chaptersviewer__bookinformation">
            <h4>
              <span>{selectedBook.author}</span>
              <span>{selectedBook.book_title}</span>
            </h4>
          </div>
          <ChapterAdder />
          <div className="lm-chapters">
            {chapters && Object.keys(chapters).length > 0 ? (
              // @ts-ignore
              Object.values(chapters as { [id: string]: LM_Chapter }).map(
                (ch: LM_Chapter) => {
                  return (
                    <ChapterContainer
                      key={ch.chapter_id}
                      book_id={bookID}
                      chapter={ch}
                    />
                  );
                }
              )
            ) : (
              <div>
                <p>No chapters yet...</p>
              </div>
            )}
          </div>
          {selectedChapter ? <ChapterModifier /> : null}
        </>
      ) : (
        <BookSelector />
      )}
    </div>
  );
};

export default ChaptersViewer;
