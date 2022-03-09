import { Dispatch, useState } from "react";
import { LM_Book } from "../../../../../types/Book/book";
import Info from "../Info/Info";

type Props = {
  children: any;
  book_id: string;
  setSelectedBook: Dispatch<React.SetStateAction<string | undefined>>;
};

const BookContainer = ({
  children,
  book_id: bookId,
  setSelectedBook,
}: Props) => {
  const [book_id, SetBook_id] = useState<string>(bookId);
  return (
    <div className="lm-bookcontainer" onClick={() => setSelectedBook(book_id)}>
      {children}
      <Info book_id={book_id} />
    </div>
  );
};

export default BookContainer;
