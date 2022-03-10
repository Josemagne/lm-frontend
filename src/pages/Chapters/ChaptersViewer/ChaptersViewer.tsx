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
  console.log(bookID);

  //   Get the book from indexedDB
  const _book = useLiveQuery(() => {
    return books.books.get(bookID).then((res) => {
      setBook(res);
      console.log(book);
      return res;
    });
  });

  if (!_book) {
    return (
      <Fragment>
        <p>No Chapters yet</p>
        <ChapterAdder bookID={bookID} />
      </Fragment>
    );
  }

  console.log(book);

  // useEffect(() => {}, []);
  // return (
  //   <div className="lm-chaptersviewer">
  //     {_book.chapters.map((chapter) => {
  //       <Fragment>
  //         <ChapterContainer chapter={chapter} />;
  //         <ChapterAdder bookID={_book.book_id} />
  //       </Fragment>;
  //     })}
  //   </div>
  // );
};

export default ChaptersViewer;
