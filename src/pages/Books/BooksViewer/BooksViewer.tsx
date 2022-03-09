import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/redux/store";
import { LM_Book } from "../../../types/Book/book";
import AuthorViewer from "./SubComponents/AuthorViewer/AuthorViewer";
import PagesViewer from "./SubComponents/PagesViewer/PagesViewer";
import ProgressViewer from "./SubComponents/ProgressViewer/ProgressViewer";
import TitleViewer from "./SubComponents/TitleViewer/TitleViewer";
import useBooks from "../../../hooks/useBooks";
import { useLiveQuery } from "dexie-react-hooks";
import mybooks from "../../../storage/indexedDB/books";
import BookContainer from "./SubComponents/BookContainer/BookContainer";
import ImageViewer from "./SubComponents/ImageViewer/ImageViewer";
import Book from "../../../utils/Book";

import BookModal from "./SubComponents/BookModal/BookModal";

type Props = {};

const BooksViewer = (props: Props) => {
  /* STATE */
  const [books, setBooks] = useState<LM_Book[]>([]);
  // The selected book that should be viewed
  const [selectedBook, setSelectedBook] = useState<string>();

  /* METHODS */
  // NOTE Gets books and puts them in books: LM_Book[]
  useLiveQuery(() => {
    return mybooks.books.toArray().then((res) => {
      setBooks((prev) => {
        return [...prev, ...res];
      });
    });
  });

  useEffect(() => {}, []);

  return (
    <div className="lm-page lm-booksviewer">
      {books.length > 0
        ? books.map((book) => {
            return (
              <BookContainer
                book_id={book.book_id}
                setSelectedBook={setSelectedBook}
                children={
                  <Fragment>
                    <AuthorViewer author_fullname={book.author} />
                    <TitleViewer title={book.book_title} />
                    <ProgressViewer progress={book.progress} />
                    <PagesViewer pages={book.pages} />
                    <ImageViewer />
                  </Fragment>
                }
              />
            );
          })
        : "no books here"}
      {selectedBook ? (
        <BookModal
          setSelectedBook={setSelectedBook}
          selectedBook={selectedBook}
        />
      ) : null}
    </div>
  );
};

export default BooksViewer;
