import React, { Fragment, useEffect, useState } from "react";
import BookModal from "./SubComponents/BookModal/BookModal";
import useAppSelector from "../../../hooks/useAppSelector";
import useAppDispatch from "../../../hooks/useAppDispatch";
import {
  fetchBooksBackend,
  fetchBooksFrontend,
  toggleAddingNewBook,
} from "../../../state/redux/features/bookSlice";
import BookAdder from "../BookAdder/BookAdder";
import BooksPagination from "./SubComponents/BooksPagination/BooksPagination";
import Dragging from "../../../components/Dragging/Dragging";


/**
 * Lists all the books
 * @param props
 * @returns
 */
const BooksViewer = () => {
  /* STATE */

  /* METHODS */
  const dispatch = useAppDispatch();

  const books = useAppSelector((state) => state.books.books.books);
  const selectedBook = useAppSelector(
    // @ts-ignore
    (state) => state.books.selectedBook
  );

  const [windowWidth, setWindowWith] = useState(window.innerWidth);

  window.addEventListener("resize", () => {
    setWindowWith(window.innerWidth);
  });

  /**
   * Opens bookmodifier
   */
  function openBookAdder() {
    dispatch(toggleAddingNewBook(""));
  }

  useEffect(() => {}, [books]);

  useEffect(() => {
    /* Fetch the books and save them in the store */
    // @ts-ignore
    //dispatch(fetchBooksFrontend());
    // @ts-ignore
    dispatch(fetchBooksBackend());
    // if (books.length < 1) getBooks();
  }, []);

  return (
    <div className="lm-page lm-booksviewer">
      <div className="lm-booksviewer__adding">
        <button className="btn btn-primary" onClick={openBookAdder}>
          Add a book
        </button>
      </div>
        <BookAdder />
      {!books ? <p>Loading...</p> : null}
      {windowWidth < 768 && books ? <BooksPagination /> : <Dragging type="BOOK" title="Books" />}
      {selectedBook ? <BookModal /> : null}
    </div>
  );
};

export default BooksViewer;
