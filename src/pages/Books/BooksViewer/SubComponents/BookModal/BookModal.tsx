import { useEffect, Dispatch, Fragment, useState, SetStateAction } from "react";
import { LM_Book } from "../../../../../types/Book/book";
import { Modal } from "rsuite";
import { useLiveQuery } from "dexie-react-hooks";
import books from "../../../../../storage/indexedDB/books";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../state/redux/store";
import { removeSelectedBook } from "../../../../../state/redux/features/bookSlice";

type Props = {
  selectedBook: string;
  setSelectedBook: Dispatch<SetStateAction<string | undefined>>;
};

const BookModal = ({ selectedBook, setSelectedBook }: Props) => {
  // That book that is will be displayed
  const [book, setBook] = useState<LM_Book>();
  const [open, setOpen] = useState<boolean>(false);

  const bookID = useSelector((state: RootState) => state.book.selectedBook);

  const dispatch = useDispatch();

  // Get the book data if we got the id from redux
  if (bookID) {
    useLiveQuery(() => {
      books.books.get(bookID).then((res) => {
        if (!res) return;
        setBook(res);
        setOpen(true);
        console.log("Got book data from indexedDB");
      });
    });
  }

  const handleClose = () => {
    setOpen(false);
    setSelectedBook(undefined);
    // Remove it from redux
    dispatch(() => dispatch(removeSelectedBook("")));
    console.log("Closed Modal");
  };

  useEffect(() => {
    console.log("Opened Modal");
  }, []);

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
          <Modal.Body>
            <p>pages: {book.pages}</p>
          </Modal.Body>
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
