import { Dispatch, useState } from "react";
import {} from "../../../../../state/redux/features/bookSlice";
import { useNavigate } from "react-router";
import { LM_Book } from "../../../../../types/Book/book";
import Info from "../Info/Info";
import { useDispatch } from "react-redux";
import Delete from "../Delete/Delete";

type Props = {
  children: any;
  book_id: string;
};

const BookContainer = ({ children, book_id: bookId }: Props) => {
  const [book_id, SetBook_id] = useState<string>(bookId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // We lead the user to /bookmodifier/{book_id}
  const handleClick = () => {
    navigate(`chaptersviewer/${book_id}`);
  };
  return (
    <div
      onClick={() => {
        navigate(`chaptersviewer/${book_id}`, {
          replace: true,
        });
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
