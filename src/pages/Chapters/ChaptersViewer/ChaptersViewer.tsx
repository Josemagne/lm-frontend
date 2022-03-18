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

<<<<<<< HEAD
  // If we do not get the book id then we do not render the page
  // NOTE Without a book there is no chapter!
  if (!bookID) return;
  const getBook = async () => {
    let book: LM_Book | undefined = await books.books
      .get(bookID)
      .then((res) => res);
    if (!book) return;
    setChapters(book.chapters);
  };

  // Get books on first try
  // if (chapters.length < 1) {
  //   books.books.get(bookID).then((res) => {
  //     if (!res) return;
  //     setChapters((prev) => {
  //       return [...res.chapters];
  //     });
  //   });
  // }

  useEffect(() => {
    if (chapters.length < 1) {
      getBook();
    }
  }, []);
=======
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
>>>>>>> f5caf40e7bc0ab99c76d30677981b68fcde5847f

  useEffect(() => {}, []);

  return (
    <div className="lm-chaptersviewer">
      <p>{bookID}</p>
<<<<<<< HEAD
      {chapters && chapters.length > 0 ? (
        chapters.map((ch) => {
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
          <ChapterAdder book_id={bookID} />
        </div>
      )}
=======
      {chapters.map((ch) => {
        return (
          <ChapterContainer key={ch.chapter_id} book_id={bookID} chapter={ch} />
        );
      })}
>>>>>>> f5caf40e7bc0ab99c76d30677981b68fcde5847f
    </div>
  );
};

export default ChaptersViewer;
