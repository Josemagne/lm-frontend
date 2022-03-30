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

type Props = {};

/**
 * Manages the state of the chaptertitle
 * @param props
 * @returns
 */
const ChapterTitle = ({}: Props) => {
  const book = useAppSelector((state) => state.books.selectedBook.book);
  const chapter = useAppSelector(
    (state) => state.books.selectedChapter.chapter
  );
  const dispatch = useAppDispatch();

  const handleChange = (newTitle: string) => {
    const bookCopy = JSON.parse(JSON.stringify(book));
    bookCopy.chapters[chapter.chapter_id].title = newTitle;
    dispatch(changeSelectedBook(bookCopy));
  };

  useEffect(() => {}, [chapter]);

  useEffect(() => {
    console.log(book.chapters[chapter.chapter_id]);
  }, []);

  return (
    <div className="lm-chaptertitle">
      <Form>
        <FloatingLabel controlId="chapter" label="Kapitel">
          <Form.Control
            defaultValue={chapter.title}
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
