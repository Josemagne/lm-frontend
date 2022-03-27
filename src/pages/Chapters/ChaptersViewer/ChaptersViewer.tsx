import { useState, useEffect } from "react";
import ChapterContainer from "./SubComponents/ChapterContainer/ChapterContainer";
import ChapterAdder from "./SubComponents/ChapterAdder/ChapterAdder";
import LM_Chapter from "../../../types/Book/chapter";
import useAppSelector from "../../../hooks/useAppSelector";

// ANCHOR tinymce

type Props = {};

const ChaptersViewer = ({}: Props) => {
  const bookID = window.location.href.split("/").pop();
  if (!bookID) return;

  const book = useAppSelector((state) => state.books.selectedBook.book);

  useEffect(() => {
    console.log("book: ", book);
  }, [book]);

  console.log("chpaters: ", book.chapters);

  useEffect(() => {}, []);

  return (
    <div className="lm-chaptersviewer">
      <ChapterAdder book_id={bookID} />
      <div className="lm-chapters">
        {book.chapters && book.chapters.length > 0 ? (
          book.chapters.map((ch: LM_Chapter) => {
            return (
              <ChapterContainer
                key={ch.chapter_id}
                book_id={bookID}
                chapter={ch}
              />
            );
          })
        ) : (
          <div>
            <p>No chapters yet...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChaptersViewer;
