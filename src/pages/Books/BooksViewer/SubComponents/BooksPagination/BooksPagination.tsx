import React, { Fragment, useState, useEffect } from "react";
import { Pagination, Panel } from "rsuite";
import { LM_Book } from "../../../../../types/Book/book";
import AuthorViewer from "../AuthorViewer/AuthorViewer";
import BookContainer from "../BookContainer/BookContainer";
import ImageViewer from "../ImageViewer/ImageViewer";
import PagesViewer from "../PagesViewer/PagesViewer";
import ProgressViewer from "../ProgressViewer/ProgressViewer";
import TitleViewer from "../TitleViewer/TitleViewer";
import useAppDispatch from "../../../../../hooks/useAppDispatch";
import useAppSelector from "../../../../../hooks/useAppSelector";
import {
  fetchBooksFrontend,
  fetchBooksBackend,
} from "../../../../../state/redux/features/bookSlice";

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

  const books = Object.values(
    useAppSelector((state) => state.books.books.books)
  );
  const amountOfBooks = useAppSelector(
    (state) => state.books.books.amountOfBooks
  );

  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });

  let indexOfLastBook = 0;
  let indexOfFirstBook = 0;
  if (books.length < 10) {
    indexOfLastBook = books.length - 1;
    indexOfFirstBook = 0;
  } else {
    indexOfLastBook = currentPage * booksPerPage;
    indexOfFirstBook = indexOfLastBook - booksPerPage;
  }

  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  console.log("books: ", books);
  console.log("currentbooks: ", currentBooks);

  useEffect(() => {}, []);

  return (
    <div className="lm-lc-booksviewer__bookspagination">
      <div className="lm-booksviewer__bookspagination__books">
        {Object.keys(currentBooks).length > 0 ? (
          (Object.values(currentBooks) as LM_Book[]).map((book) => {
            return (
              <BookContainer
                book={book}
                book_id={book.book_id}
                key={book.book_id}
                children={
                  <Panel
                    header={
                      <Fragment>
                        <AuthorViewer
                          author_prename={book.author_prename}
                          author_name={book.author_name}
                        />
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
          <p>no books</p>
        )}
      </div>
      <div className="lm-booksviewer__bookspagination__rule">
        {windowWidth < 576 ? (
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
