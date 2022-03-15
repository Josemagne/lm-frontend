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
  const [chapters, setChapters] = useState<LM_Chapter[] | undefined>(undefined);
  const [book, setBook] = useState<LM_Book | undefined>(undefined);

  let _book: LM_Book | undefined = undefined;
  //   Get the book from indexedDB

  const res = useLiveQuery(() => {
    let bookID = window.location.href.split("/").pop();
    if (!bookID) return;
    return books.books.get(bookID).then((res) => {
      console.log("res:", res);
      if (!res) return;
      setChapters(res.chapters);
      setBook(res);
      _book = res;
      return res;
      // setBook(res);
    });
  });

  useEffect(() => {
    console.log("chpaters: ", chapters);
  }, [chapters, book]);

  useEffect(() => {
    if (_book) setBook(_book);
    if (res) setBook(res);
  }, []);
  // useEffect(() => {
  //   console.log("book: ", _book);
  // }, [_book]);

  if (chapters && book) {
    return (
      <div className="lm-chaptersviewer">
        {chapters.map((chapter) => {
          <ChapterContainer chapter={chapter} book_id={book.book_id} />;
        })}
      </div>
    );
  }

  return (
    <div className="lm-chaptersviewer">
      {/* {_book ? (
        <div className="lm-chaptersviewer lm-page">
          {_book.chapters.map((chapter) => {
            <ChapterContainer chapter={chapter} book_id={_book.book_id} />;
          })}
          <ChapterAdder />
        </div>
      ) : null} */}

      {!chapters ? (
        <Fragment>
          <p>No Chapters yet</p>
          {book ? <ChapterAdder book_id={book?.book_id} /> : null}
        </Fragment>
      ) : null}
    </div>
  );
};

export default ChaptersViewer;
