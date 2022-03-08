import { Dispatch, Fragment, useState, SetStateAction } from "react";
import { LM_Book } from "../../../../../types/Book/book";
import { Modal } from "rsuite";
import { useLiveQuery } from "dexie-react-hooks";
import books from "../../../../../storage/indexedDB/books";

type Props = {
  selectedBook: string;
  setSelectedBook: Dispatch<SetStateAction<string | undefined>>;
};

const BookModal = ({ selectedBook, setSelectedBook }: Props) => {
  // That book that is will be displayed
  const [book, setBook] = useState<LM_Book>();
  const [open, setOpen] = useState<boolean>(false);

  useLiveQuery(() => {
    books.books.get(selectedBook).then((res) => {
      if (!res) return;
      setBook(res);
      setOpen(true);
    });
  });

  const handleClose = () => {
    setOpen(false);
    setSelectedBook(undefined);
  };

  return (
    <Modal
      className="lm-bookmodal"
      overflow={true}
      open={open}
      onClose={handleClose}
    >
      {book ? (
        <Fragment>
          <Modal.Header>
            {book.author} {book.book_title}
          </Modal.Header>
          <Modal.Body></Modal.Body>
          <Modal.Footer></Modal.Footer>
          {/* Author */}
          {/* Title */}
          {/* Chapters */}
        </Fragment>
      ) : null}
    </Modal>
  );
};

export default BookModal;
