import { Dispatch, useState } from "react";
import { addSelectedBook } from "../../../../../state/redux/features/bookSlice";
import { LM_Book } from "../../../../../types/Book/book";
import Info from "../Info/Info";
import { useDispatch } from "react-redux";

type Props = {
  children: any;
  book_id: string;
};

const BookContainer = ({ children, book_id: bookId }: Props) => {
  const [book_id, SetBook_id] = useState<string>(bookId);
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(addSelectedBook(book_id))}
      className="lm-bookcontainer"
    >
      {children}
      <Info book_id={book_id} />
    </div>
  );
};

export default BookContainer;
