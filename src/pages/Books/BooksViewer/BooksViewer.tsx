import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/redux/store";
import { LM_Book } from "../../../types/Book/book";
import AuthorViewer from "./SubComponents/AuthorViewer/AuthorViewer";
import PagesViewer from "./SubComponents/PagesViewer/PagesViewer";
import ProgressViewer from "./SubComponents/ProgressViewer/ProgressViewer";
import TitleViewer from "./SubComponents/TitleViewer/TitleViewer";
import Book from "../../../utils/Book";
import useBooks from "../../../hooks/useBooks";

type Props = {};

const BooksViewer = (props: Props) => {
  const [books, setBooks] = useState<LM_Book[]>([]);

  // const _books = useSelector((state: RootState) => state.book.books);
  // setBooks(_books);

  // Book.getBooks().then((res) => {
  //   if (!res) return;
  //   setBooks((prev) => {
  //     return [...prev, ...res];
  //   });
  // });
  const { data, error, isPending } = useBooks({ type: "frontend" });

  console.log(data);
  console.log("err: ", error);

  useEffect(() => {
    // getBooks();
    console.log(books);
  }, []);
  return (
    <div className="lm-page lm-booksviewer">
      {books.length > 0
        ? books.map((book) => {
            return (
              <Fragment>
                <AuthorViewer author_fullname={book.author} />
                <TitleViewer title={book.book_title} />
                <ProgressViewer progress={book.progress} />
                <PagesViewer pages={book.pages} />
              </Fragment>
            );
          })
        : "no books here"}
    </div>
  );
};

export default BooksViewer;
