import { useState, useEffect } from "react";
import { changeSelectedBook } from "../../../../../state/redux/features/bookSlice";
import { useNavigate } from "react-router";
import { LM_Book } from "../../../../../types/Book/book";
import { useDispatch } from "react-redux";
import Delete from "../Delete/Delete";
import useAppDispatch from "../../../../../hooks/useAppDispatch";
import Server from "../../../../../services/Server";

type Props = {
  children: any;
  book: LM_Book;
  book_id: string;
};

const BookContainer = ({ children, book_id: bookId, book }: Props) => {
  const [book_id, SetBook_id] = useState<string>(bookId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // We lead the user to /bookmodifier/{book_id}
  const handleClick = () => {
    dispatch(changeSelectedBook({ book_id: book_id, book: book }));
  };

  useEffect(() => {});
  return (
    <div
      onClick={() => {
        handleClick();
      }}
      className="lm-bookcontainer"
    >
      {children}
      <Delete book_id={book_id} />
    </div>
  );
};

export default BookContainer;
