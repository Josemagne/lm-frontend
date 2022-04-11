import React, { Fragment, useState, useEffect } from "react";
import { LM_Book } from "../../../../../types/Book/book";
import { Button, Modal } from "rsuite";
import { useNavigate } from "react-router";
import {
  removeSelectedBook,
  toggleBooksViewerModal,
} from "../../../../../state/redux/features/bookSlice";
import useAppDispatch from "../../../../../hooks/useAppDispatch";
import useAppSelector from "../../../../../hooks/useAppSelector";

type Props = {
  selectedBook: LM_Book;
};

/**
 * Shows Modal for the book
 * @param param0
 * @returns
 */
const BookModal = ({ selectedBook }: Props) => {
  const dispatch = useAppDispatch();

  const openBooksViewerModal: boolean = useAppSelector(
    (state) => state.books.openBooksViewerModal
  );

  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(toggleBooksViewerModal(""));
  };

  useEffect(() => {}, [openBooksViewerModal]);

  return (
    <Modal
      className="lm-bookmodal"
      overflow={true}
      open={openBooksViewerModal}
      onClose={handleClose}
      full={true}
    >
      {selectedBook ? (
        <Fragment>
          <Modal.Header>
            {selectedBook.author}
            {" - "} {selectedBook.book_title}
          </Modal.Header>
          <Modal.Body>
            <p>pages: {selectedBook.pages}</p>
            <div
              onClick={() => {
                if (!selectedBook) return;
                handleClose();
                navigate(`flashcards/${selectedBook.book_title}`);
              }}
            >
              <Button>Go to flashcards</Button>
            </div>
            <div
              onClick={() => {
                if (!selectedBook.book_id) return;
                handleClose();
                navigate(`chaptersviewer/${selectedBook.book_id}`);
              }}
            >
              <Button>Go to chapters</Button>
            </div>
            {/* <div
              onClick={() => {
                if (!selectedBook.book_id) return;
                handleClose();
                navigate(`bookmodifer/${selectedBook.book_id}`);
              }}
            >
              <Button>Modify bookdata</Button>
            </div> */}
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
