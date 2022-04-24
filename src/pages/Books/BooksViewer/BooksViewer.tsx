import { Fragment, useEffect, useState } from "react";
import BookModal from "./SubComponents/BookModal/BookModal";
import { Panel } from "rsuite";
import useAppSelector from "../../../hooks/useAppSelector";
import useAppDispatch from "../../../hooks/useAppDispatch";
import {
  fetchBooksBackend,
  fetchBooksFrontend,
} from "../../../state/redux/features/bookSlice";
import BookModifier from "../BookModifier/BookModifier";
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

  useEffect(() => {}, [loading]);

  useEffect(() => {}, [_books]);

  return (
    <div className="lm-page lm-booksviewer">
      <BookModifier />
      {loading ? <p>Loading...</p> : null}
      <Dragging type="BOOK" />
      <BooksPagination />
      {selectedBook ? <BookModal /> : null}
    </div>
  );
};

export default BooksViewer;
