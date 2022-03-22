import { useState, useEffect } from "react";
import { addSelectedBook } from "../../../../../state/redux/features/bookSlice";
import { useNavigate } from "react-router";
import { LM_Book } from "../../../../../types/Book/book";
import Info from "../Info/Info";
import { useDispatch } from "react-redux";
import Delete from "../Delete/Delete";
import useAppDispatch from "../../../../../hooks/useAppDispatch";
import Server from "../../../../../services/Server";

type Props = {
  children: any;
  book_id: string;
};

const BookContainer = ({ children, book_id: bookId }: Props) => {
  const [book_id, SetBook_id] = useState<string>(bookId);
  const [book, setBook] = useState<LM_Book>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // We lead the user to /bookmodifier/{book_id}
  const handleClick = () => {
    dispatch(addSelectedBook(book_id));
    // navigate(`chaptersviewer/${book_id}`);
  };

  useEffect(() => {});
  return (
    <div
      onClick={() => {
        // navigate(`chaptersviewer/${book_id}`, {
        //   replace: true,
        // });
        handleClick();
      }}
      className="lm-bookcontainer"
    >
      {children}
      <Delete book_id={book_id} />
      <Info book_id={book_id} />
    </div>
  );
};

export default BookContainer;
