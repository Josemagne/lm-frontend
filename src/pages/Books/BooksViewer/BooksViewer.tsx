import { Fragment, useEffect, useState } from "react";
import BookModal from "./SubComponents/BookModal/BookModal";
import { Panel } from "rsuite";
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

type Props = {};

/**
 * Lists all the books
 * @param props
 * @returns
 */
const BooksViewer = (props: Props) => {
  /* STATE */

  /* METHODS */
  const dispatch = useAppDispatch();

  // Get the loading status
  const loading = useAppSelector((state) => state.books.books.loading);
  const _books = useAppSelector((state) => state.books.books.books);
  const selectedBook = useAppSelector(
    // @ts-ignore
    (state) => state.books.selectedBook.book
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

  useEffect(() => {}, [loading]);

  useEffect(() => {}, [_books]);

  useEffect(() => {
    /* Fetch the books and save them in the store */
    // @ts-ignore
    dispatch(fetchBooksFrontend());
    // @ts-ignore
    dispatch(fetchBooksBackend());
    // if (books.length < 1) getBooks();
  }, []);

  return (
    <div className="lm-page lm-booksviewer">
      <button className="btn btn-primary" onClick={openBookAdder}>
        Add a book
      </button>
      <BookAdder />
      {loading ? <p>Loading...</p> : null}
      {windowWidth < 576 ? <BooksPagination /> : <Dragging type="BOOK" />}
      {selectedBook ? <BookModal /> : null}
    </div>
  );
};

export default BooksViewer;
