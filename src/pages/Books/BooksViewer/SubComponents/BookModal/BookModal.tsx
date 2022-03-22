import { Fragment, useState, useEffect } from "react";
import { LM_Book } from "../../../../../types/Book/book";
import { Button, Modal } from "rsuite";
import { useLiveQuery } from "dexie-react-hooks";
import books from "../../../../../storage/indexedDB/books";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../state/redux/store";
import {
  changeSelectedBook,
  removeSelectedBook,
} from "../../../../../state/redux/features/bookSlice";
import useAppDispatch from "../../../../../hooks/useAppDispatch";
import useAppSelector from "../../../../../hooks/useAppSelector";
import { useNavigate } from "react-router";

type Props = {};

const BookModal = ({}: Props) => {
  // That book that is will be displayed
  const [book, setBook] = useState<LM_Book>();
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const book_id = useAppSelector(
    (state: RootState) => state.books.selectedBook.book_id
  );

  // Get the book data if we got the id from redux
  if (book_id) {
    books.books.get(book_id).then((res) => {
      if (!res) return;
      setBook(res);
      setOpen(true);
    });
  }

  const navigate = useNavigate();

  const handleClose = () => {
    // Remove it from redux
    // dispatch(() => dispatch(removeSelectedBook("")));
    dispatch(removeSelectedBook(""));
    setOpen(false);
  };

  useEffect(() => {
    // NOTE Clean up function
  }, [open]);

  return (
    <Modal
      className="lm-bookmodal"
      overflow={true}
      open={open}
      onClose={handleClose}
      full={true}
    >
      {book ? (
        <Fragment>
          <Modal.Header>
            {book.author} {book.book_title}
          </Modal.Header>
          <Modal.Body>
            <p>pages: {book.pages}</p>
            <div
              onClick={() => {
                if (!book_id) return;
                dispatch(changeSelectedBook({ book_id: book_id, book: book }));
                handleClose();
                navigate(`flashcards/${book_id}`);
              }}
            >
              <Button>Go to flashcards</Button>
            </div>
            <div
              onClick={() => {
                if (!book_id) return;
                dispatch(changeSelectedBook({ book_id: book_id, book: book }));
                handleClose();
                navigate(`chaptersviewer/${book_id}`);
              }}
            >
              <Button>Go to chapters</Button>
            </div>
            <div
              onClick={() => {
                if (!book_id) return;
                dispatch(changeSelectedBook({ book_id: book_id, book: book }));
                handleClose();
                navigate(`bookmodifer/${book_id}`);
              }}
            >
              <Button>Modify bookdata</Button>
            </div>
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
