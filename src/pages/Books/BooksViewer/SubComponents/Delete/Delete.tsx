import { useState } from "react";
import useAppDispatch from "../../../../../hooks/useAppDispatch";
import { removeBook } from "../../../../../state/redux/features/bookSlice";
import FAPI from "../../../../../storage/indexedDB/FAPI";
import API from "../../../../../api/API";

type Props = {
  book_id: string;
};

const Delete = ({ book_id }: Props) => {
  const [bookId, setBookId] = useState<string>(book_id);

  const dispatch = useAppDispatch();

  const deleteBook = async (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeBook(book_id));

    await FAPI.deleteBook(book_id);

    await API.deleteBook(book_id);
  };

  return (
    <div className="lm-deletebutton" onClick={(e) => deleteBook(e)}>
      x
    </div>
  );
};

export default Delete;
