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
  const [book, setBook] = useState<LM_Book | undefined>(undefined);
  const bookID = useSelector((state: RootState) => state.books.selectedBook);
  console.log(bookID);

  //   Get the book from indexedDB
  useLiveQuery(() => {
    return books.books.get(bookID).then((res) => {
      setBook(res);
      console.log(book);
      return res;
    });
  });

  // useEffect(() => {}, []);
  useEffect(() => {
    console.log("1");
  }, [book]);

  if (!book) {
    return (
      <Fragment>
        <p>No Chapters yet</p>
    {/* <ChapterAdder /> */}
      </Fragment>
    );
  } else {
    return (
      <div className="lm-chaptersviewer">
        {book.chapters.map((chapter) => {
          <Fragment>
            <ChapterContainer chapter={chapter} />;
            <ChapterAdder />
          </Fragment>;
        })}
      </div>
    );
  }
};

export default ChaptersViewer;
