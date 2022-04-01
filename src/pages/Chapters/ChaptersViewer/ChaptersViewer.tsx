import { useState, useEffect } from "react";
import ChapterContainer from "./SubComponents/ChapterContainer/ChapterContainer";
import ChapterAdder from "./SubComponents/ChapterAdder/ChapterAdder";
import LM_Chapter from "../../../types/Book/chapter";
import useAppSelector from "../../../hooks/useAppSelector";
import ChapterModifier from "../ChapterModifier/ChapterModifier";

// ANCHOR tinymce

type Props = {};

const ChaptersViewer = ({}: Props) => {
  const bookID = window.location.href.split("/").pop();
  if (!bookID) return <p>No book selected</p>;

  const selectedChapter = useAppSelector(
    (state) => state.books.selectedChapter
  );
  const chapters = useAppSelector(
    (state) => state.books.selectedBook.book.chapters
  );

  const openChapterModifierModal = useAppSelector(
    (state) => state.books.openChapterModifierModal
  );

  console.log("open???", openChapterModifierModal);

  useEffect(() => {}, [chapters, selectedChapter]);

  useEffect(() => {}, [openChapterModifierModal]);
  useEffect(() => {}, []);

  return (
    <div className="lm-chaptersviewer lm-page">
      <ChapterAdder book_id={bookID} />
      <div className="lm-chapters">
        {chapters && Object.keys(chapters).length > 0 ? (
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
      {selectedChapter.chapter ? <ChapterModifier /> : null}
    </div>
  );
};

export default ChaptersViewer;
