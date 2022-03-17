import { useSelector } from "react-redux";
import { store, RootState } from "../../../state/redux/store";
import { useLiveQuery } from "dexie-react-hooks";
import books from "../../../storage/indexedDB/books";
import { Fragment, useState, useEffect, useMemo } from "react";
import { LM_Book } from "../../../types/Book/book";
import ChapterModifier from "../ChapterModifier/ChapterModifier";
import ChapterContainer from "./SubComponents/ChapterContainer/ChapterContainer";
import ChapterAdder from "./SubComponents/ChapterAdder/ChapterAdder";
import LM_Chapter from "../../../types/Book/chapter";
type Props = {};

const ChaptersViewer = ({}: Props) => {
  const [chapters, setChapters] = useState<LM_Chapter[] | []>([]);
  const bookID = window.location.href.split("/").pop();

  // If we can't get the id then we return nothing
  if (!bookID) return;

  // Get books on first try
  if (chapters.length < 1) {
    books.books.get(bookID).then((res) => {
      if (!res) return;
      setChapters((prev) => {
        return [...res.chapters];
      });
    });
  }

  useEffect(() => {}, []);

  return (
    <div className="lm-chaptersviewer">
      <p>{bookID}</p>
      {chapters.map((ch) => {
        return (
          <ChapterContainer key={ch.chapter_id} book_id={bookID} chapter={ch} />
        );
      })}
    </div>
  );
};

export default ChaptersViewer;
