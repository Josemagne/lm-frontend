import { Fragment, useState, useEffect } from "react";
import { LM_Book } from "../../../../../types/Book/book";
import { Button, Modal } from "rsuite";
import books from "../../../../../storage/indexedDB/books";
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
  const [open, setOpen] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  const book = useAppSelector(
    (state: RootState) => state.books.selectedBook.book
  );

  const navigate = useNavigate();

  const handleClose = () => {
    // Remove it from redux
    // dispatch(() => dispatch(removeSelectedBook("")));
    setOpen(false);
  };

  console.log("book: ", book);

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
                if (!book) return;
                dispatch(
                  changeSelectedBook({ book_id: book.book_id, book: book })
                );
                handleClose();
                navigate(`flashcards/${book.book_id}`);
              }}
            >
              <Button>Go to flashcards</Button>
            </div>
            <div
              onClick={() => {
                if (!book.book_id) return;
                dispatch(
                  changeSelectedBook({ book_id: book.book_id, book: book })
                );
                handleClose();
                navigate(`chaptersviewer/${book.book_id}`);
              }}
            >
              <Button>Go to chapters</Button>
            </div>
            <div
              onClick={() => {
                if (!book.book_id) return;
                dispatch(
                  changeSelectedBook({ book_id: book.book_id, book: book })
                );
                handleClose();
                navigate(`bookmodifer/${book.book_id}`);
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
