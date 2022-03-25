import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../state/redux/store";
import useAppSelector from "../../../../../../hooks/useAppSelector";
import useAppDispatch from "../../../../../../hooks/useAppDispatch";
import { changeSelectedBook } from "../../../../../../state/redux/features/bookSlice";
import { LM_Book } from "../../../../../../types/Book/book";

type Props = {
  changeHandler: (newBook: LM_Book) => void;
  book: LM_Book;
};

/**
 * Manages the state of the chaptertitle
 * @param props
 * @returns
 */
const ChapterTitle = ({ book, changeHandler }: Props) => {
  const handleChange = (newTitle: string) => {
    book.book_title = newTitle;
    changeHandler(book);
  };

  useEffect(() => {}, [book]);

  useEffect(() => {}, []);

  return (
    <div className="lm-chaptertitle">
      <Form>
        <FloatingLabel controlId="chapter" label="Kapitel">
          <Form.Control
            defaultValue={book.book_title}
            type="text"
            placeholder="Kapitel"
            onChange={(e) => handleChange(e.target.value)}
          />
        </FloatingLabel>
      </Form>
    </div>
  );
};

export default ChapterTitle;
