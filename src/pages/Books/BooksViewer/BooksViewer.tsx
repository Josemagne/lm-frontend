import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RooteState } from "../../../state/redux/store";
import { LM_Book } from "../../../types/Book/book";

type Props = {};

const BooksViewer = (props: Props) => {
  const [books, setBooks] = useState<LM_Book[]>([]);

  // useEffect(() => {
  //   const books = useSelector((state: RooteState) => state.book);
  //   setBooks(books);
  // }, []);
  return <div className="lm-page lm-booksviewer">BooksViewer</div>;
};

export default BooksViewer;
