import { useSelector } from "react-redux";
import { store, RootState } from "../../../state/redux/store";
import { useLiveQuery } from "dexie-react-hooks";
import books from "../../../storage/indexedDB/books";
import { Fragment, useState, useEffect } from "react";
import { LM_Book } from "../../../types/Book/book";
import ChapterModifier from "../ChapterModifier/ChapterModifier";
import ChapterContainer from "./SubComponents/ChapterContainer/ChapterContainer";
import ChapterAdder from "./SubComponents/ChapterAdder/ChapterAdder";
type Props = {};

const ChaptersViewer = ({}: Props) => {
  const [book, setBook] = useState<LM_Book>();
  const bookID = useSelector((state: RootState) => state.book.selectedBook);
  //   Get the book from indexedDB
  const _book = useLiveQuery(() => books.books.get(bookID));
  setBook(_book);

  useEffect(() => {}, []);
  return (
    <div className="lm-chaptersviewer">
      {book.chapters.map((chapter) => {
        <Fragment>
          <ChapterContainer chapter={chapter} />;
          <ChapterAdder bookID={book.book_id} />
        </Fragment>;
      })}
    </div>
  );
};

export default ChaptersViewer;
