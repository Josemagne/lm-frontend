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
import Metadata from "../../../utils/Metadata";
import {
  fetchBooksBackend,
  fetchBooksFrontend,
} from "../../../state/redux/features/bookSlice";
import { LM_Metadata } from "../../../types/common/metadata";

type Props = {};

const BooksViewer = (props: Props) => {
  /* STATE */

  /* METHODS */
  const dispatch = useAppDispatch();

  // Get the loading status
  const loading = useAppSelector((state) => state.books.books.loading);
  const _books = useAppSelector((state) => state.books.books.data);
  const openBooksViewerModal = useAppSelector(
    (state) => state.books.openBooksViewerModal
  );
  const _selectedBook = useAppSelector(
    (state) => state.books.selectedBook.book
  );

  // const getBooks = async () => {
  //   let result = await Book.getBooks();
  //   if (!result) return;
  //   setBooks(result);
  // };

  /**
   * Checks if there are no books in the frontend and only then requests the backend
   */
  const noFrontendBooks = async (): Promise<boolean> => {
    let result: boolean = false;
    await Metadata.getMetadata().then((m) => {
      if (!m) return;
      if (m?.frontendBooks.books.length < 1) result = true;
    });
    return result;
  };

  // only runs at the mounting
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchBooksBackend());
    // @ts-ignore
    dispatch(fetchBooksFrontend());
    // if (books.length < 1) getBooks();
  }, []);

  useEffect(() => {}, [_selectedBook]);

  useEffect(() => {}, [_books]);

  return (
    <div className="lm-page lm-booksviewer">
      {loading ? <p>Loading...</p> : null}
      {_books.length > 0 ? (
        (_books as LM_Book[]).map((book) => {
          return (
            <BookContainer
              book={book}
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
                ></Panel>
              }
            />
          );
        })
      ) : (
        <p>no books here</p>
      )}
      {openBooksViewerModal ? <BookModal selectedBook={_selectedBook} /> : null}
    </div>
  );
};

export default BooksViewer;
