import React, { Fragment, useState, useEffect } from "react";
import { Pagination, Panel } from "rsuite";
import { LM_Book } from "../../../../../types/Book/book";
import AuthorViewer from "../AuthorViewer/AuthorViewer";
import BookContainer from "../BookContainer/BookContainer";
import useAppDispatch from "../../../../../hooks/useAppDispatch";
import useAppSelector from "../../../../../hooks/useAppSelector";

type Props = {};

/**
 * Handles which books are being showed
 * @param props
 * @returns
 */
const BooksPagination = (props: Props) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [booksPerPage, setBooksPerPage] = useState<number>(10);

  const dispatch = useAppDispatch();

  let books = Object.values(
    useAppSelector((state) => state.books.books.books)
  );

  const amountOfBooks = useAppSelector(
    (state) => state.books.books.amountOfBooks
  );

  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });

  if (books) books = Object.values(books);

  let indexOfLastBook = 0;
  let indexOfFirstBook = 0;
  if (books.length < 10) {
    indexOfLastBook = books.length - 1;
  } else {
    indexOfLastBook = currentPage * booksPerPage;
    indexOfFirstBook = indexOfLastBook - booksPerPage;
  }

  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook + 1);
  console.log("books: ", books);
  console.log("currentbooks: ", currentBooks);

  useEffect(() => {}, []);

  return (
    <div className="lm-lc-booksviewer__bookspagination">
      <div className="lm-booksviewer__bookspagination__books">
        {Object.keys(currentBooks).length > 0 ? (
          (Object.values(currentBooks) as LM_Book[]).map((book) => {
            return <BookContainer book={book} key={book.book_id} />;
          })
        ) : (
          <p>no books</p>
        )}
      </div>
      <div className="lm-booksviewer__bookspagination__rule">
        {windowWidth < 768 ? (
          <Pagination
            prev
            last
            next
            first
            size="sm"
            total={amountOfBooks}
            limit={10}
          />
        ) : (
          <Pagination
            prev
            last
            next
            first
            size="md"
            total={amountOfBooks}
            limit={10}
          />
        )}
      </div>
    </div>
  );
};

export default BooksPagination;
