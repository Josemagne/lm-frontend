import { Fragment, useEffect, useState } from "react";
import { LM_Book } from "../../../types/Book/book";
import AuthorViewer from "./SubComponents/AuthorViewer/AuthorViewer";
import PagesViewer from "./SubComponents/PagesViewer/PagesViewer";
import ProgressViewer from "./SubComponents/ProgressViewer/ProgressViewer";
import TitleViewer from "./SubComponents/TitleViewer/TitleViewer";
import BookContainer from "./SubComponents/BookContainer/BookContainer";
import ImageViewer from "./SubComponents/ImageViewer/ImageViewer";
import BookModal from "./SubComponents/BookModal/BookModal";
import { Panel } from "rsuite";
import ChapterModifier from "../../Chapters/ChapterModifier/ChapterModifier";
import useAppSelector from "../../../hooks/useAppSelector";
import useAppDispatch from "../../../hooks/useAppDispatch";
import {
  fetchBooksBackend,
  fetchBooksFrontend,
} from "../../../state/redux/features/bookSlice";

type Props = {};

const BooksViewer = (props: Props) => {
  // TODO Implement redux-thunk
  /* STATE */
  const [books, setBooks] = useState<LM_Book[]>([]);
  // The selected book that should be viewed
  const [selectedBook, setSelectedBook] = useState<string>();
  // ID of the chapter that was opened
  const [openChapter, setOpenChapter] = useState<string>();

  /* METHODS */
  const dispatch = useAppDispatch();

  // Get the loading status
  const loading = useAppSelector((state) => state.books.books.loading);
  const _books = useAppSelector((state) => state.books.books.data);
  const _selectedBook = useAppSelector(
    (state) => state.books.selectedBook.book_id
  );

  // const getBooks = async () => {
  //   let result = await Book.getBooks();
  //   if (!result) return;
  //   setBooks(result);
  // };

  // only runs at the mounting
  useEffect(() => {
    dispatch(fetchBooksBackend());
    dispatch(fetchBooksFrontend());
    console.log("Called fetchBooks()");
    // if (books.length < 1) getBooks();
  }, []);

  useEffect(() => {
    console.log(_selectedBook);
  }, [_selectedBook]);

  useEffect(() => {}, [_books]);

  return (
    <div className="lm-page lm-booksviewer">
      {loading ? <p>Loading...</p> : null}
      {_books ? (
        <p>
          We got the books: {_books.length}{" "}
          {_books.map((b) => {
            return <p>{b.book_id}</p>;
          })}
        </p>
      ) : (
        <p>We did not get the book</p>
      )}
      <p>{_books.length > 0 ? _books[0].book_id : null}</p>

      {_books.length > 0
        ? _books.map((book) => {
            return (
              <BookContainer
                book_id={book.book_id}
                key={book.book_id}
                children={
                  <Panel
                    header={
                      <Fragment>
                        <AuthorViewer author_fullname={book.author} />
                        <TitleViewer title={book.book_title} />
                        <ProgressViewer progress={book.progress} />
                        <PagesViewer pages={book.pages} />
                        <ImageViewer />
                      </Fragment>
                    }
                  >
                    {openChapter ? <ChapterModifier /> : null}
                  </Panel>
                }
              />
            );
          })
        : "no books here"}
      {_selectedBook ? <BookModal /> : null}
    </div>
  );
};

export default BooksViewer;
