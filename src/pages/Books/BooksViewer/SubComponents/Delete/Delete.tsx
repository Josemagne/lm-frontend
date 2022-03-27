import { useState } from "react";
import Metadata from "../../../../../utils/Metadata";
import Book from "../../../../../storage/indexedDB/Book";
import Server from "../../../../../services/Server";
import useAppDispatch from "../../../../../hooks/useAppDispatch";
import { removeBook } from "../../../../../state/redux/features/bookSlice";

type Props = {
  book_id: string;
};

const Delete = ({ book_id }: Props) => {
  const [bookId, setBookId] = useState<string>(book_id);

  const dispatch = useAppDispatch();

  const deleteBook = async (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    // Frontend
    await Book.removeBook(book_id);
    // TODO Metadata remove
    await Metadata.removeFrontendBook(book_id);
    dispatch(removeBook(book_id));
    // Backend
    await Server.removeBook(book_id);
  };

  return (
    <div className="lm-deletebutton" onClick={(e) => deleteBook(e)}>
      x
    </div>
  );
};

export default Delete;
