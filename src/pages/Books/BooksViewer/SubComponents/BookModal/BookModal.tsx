import React, { Fragment, useState, useEffect } from "react";
import { LM_Book } from "../../../../../types/Book/book";
import { Button, Modal } from "rsuite";
import { useNavigate } from "react-router";
import {
  changeSelectedBook,
  removeSelectedBook,
} from "../../../../../state/redux/features/bookSlice";
import useAppDispatch from "../../../../../hooks/useAppDispatch";
import useAppSelector from "../../../../../hooks/useAppSelector";
import { replace } from "cypress/types/lodash";

type Props = {};

/**
 * Shows Modal for the book
 * @param param0
 * @returns
 */
const BookModal = ({}: Props) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const selectedBook = useAppSelector((state) => state.books.selectedBook);

  const handleClose = () => {
    dispatch(changeSelectedBook(null));
  };

  useEffect(() => {}, [selectedBook]);

  return (
    <Modal
      className="lm-bookmodal"
      overflow={true}
      open={selectedBook ? true : false}
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

            {/* NOTE The links lead to other parts of the website */}
            <div className="lm-bookmodal__links">
              <div
                onClick={() => {
                  if (!selectedBook) return;
                  handleClose();
                  navigate(`/flashcards`, {
                    replace: true,
                  });
                }}
              >
                <Button>Go to flashcards</Button>
              </div>
              <div
                onClick={() => {
                  if (!selectedBook.book_id) return;
                  handleClose();
                  navigate(`/chaptersviewer/${selectedBook.book_title}`, {
                    replace: true,
                  });
                }}
              >
                <Button>Go to chapters</Button>
              </div>
            </div>
            {/* TODO FlashcardAdder */}
            {/* TODO Summary */}
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
