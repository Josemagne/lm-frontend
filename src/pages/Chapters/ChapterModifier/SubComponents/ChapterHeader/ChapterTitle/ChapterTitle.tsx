import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../state/redux/store";
import useAppSelector from "../../../../../../hooks/useAppSelector";
import useAppDispatch from "../../../../../../hooks/useAppDispatch";
import { changeSelectedBook } from "../../../../../../state/redux/features/bookSlice";
import { LM_Book } from "../../../../../../types/Book/book";
import LM_Chapter from "../../../../../../types/Book/chapter";

type Props = {
  changeHandler: (newBook: LM_Book) => void;
  book: LM_Book;
  chapterIndex: number;
};

/**
 * Manages the state of the chaptertitle
 * @param props
 * @returns
 */
const ChapterTitle = ({ book, changeHandler, chapterIndex }: Props) => {
  const handleChange = (newTitle: string) => {
    const bookCopy = JSON.parse(JSON.stringify(book));
    bookCopy.chapters[chapterIndex].title = newTitle;
    changeHandler(bookCopy);
  };

  useEffect(() => {}, [book]);

  useEffect(() => {
    console.log(book.chapters[chapterIndex]);
  }, []);

  return (
    <div className="lm-chaptertitle">
      <Form>
        <FloatingLabel controlId="chapter" label="Kapitel">
          <Form.Control
            defaultValue={"k"}
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
