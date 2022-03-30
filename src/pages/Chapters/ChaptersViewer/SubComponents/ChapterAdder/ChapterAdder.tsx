import { useState, useEffect, useMemo } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { LM_Book } from "../../../../../types/Book/book";
import Book from "../../../../../storage/indexedDB/Book";
import LM_Chapter from "../../../../../types/Book/chapter";
import { useFormik } from "formik";
import { nanoid } from "nanoid";
import useAppSelector from "../../../../../hooks/useAppSelector";
import { boolean } from "yup/lib/locale";
import Server from "../../../../../services/Server";
import useAppDispatch from "../../../../../hooks/useAppDispatch";
import {
  addChapter,
  changeSelectedBook,
  changeSelectedChapter,
  updateBook,
} from "../../../../../state/redux/features/bookSlice";
import Chapter from "../../../../../classes/Chapter";

type Props = {
  book_id: string;
};

const ChapterAdder = ({ book_id }: Props) => {
  const dispatch = useAppDispatch();
  /* STATE */

  const _book = useAppSelector((state) => state.books.selectedBook.book);

  const chapterID = nanoid();
  const flashcardID = nanoid();

  const initialValues: LM_Chapter = {
    chapter_id: chapterID,
    book_id: _book.book_id,
    title: "",
    importance: 50,
    read: false,
    summary: [{ children: [{ text: "" }] }],
    toRead: false,
    subchapters: [],
    ended: null,
    started: null,
    degree: null,
    parentChapter: null,
    isSubchapter: false,
    index: "",
    flashcards: {
      flashcardID: {
        flashcard_id: flashcardID,
        question: [{ children: [{ text: "" }] }],
        answer: [{ children: [{ text: "" }] }],
      },
    },
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      values.book_id = _book.book_id;
      values.chapter_id = nanoid();
      // Add locally
      // redux
      if (!_book) return;
      const bookCopy = JSON.parse(JSON.stringify(_book));
      bookCopy.chapters[values.chapter_id] = values;
      dispatch(updateBook(bookCopy));
      dispatch(
        changeSelectedBook({ book: bookCopy, book_id: bookCopy.book_id })
      );

      await Book.addChapter(_book.book_id, values);
      // Add to the server
      await Server.addChapter(values);
      // Completes submission cycle
      resetForm();
      setSubmitting(false);
    },
    validate: () => {},
  });

  useEffect(() => {
    if (!_book) return;
  }, [_book]);

  useEffect(() => {}, []);

  return (
    <div className="lm-chapteradder">
      <div className="lm-chapteradder__index">
        <FloatingLabel controlId="index" label="Index">
          <Form.Control
            type="text"
            placeholder="Index"
            {...formik.getFieldProps("index")}
          />
        </FloatingLabel>
      </div>
      <div className="lm-chapteradder__title">
        <FloatingLabel controlId="title" label="Chaptertitle">
          <Form.Control
            type="text"
            placeholder="Book Title"
            {...formik.getFieldProps("title")}
          />
        </FloatingLabel>
      </div>

      {/* roRead */}
      {/* importance */}
      {/* read */}
      {/* Summary */}
      <div className="lm-chapteradder__button">
        <div
          onClick={() => {
            formik.handleSubmit();
          }}
        >
          +
        </div>
      </div>

      {/* <Adder type="button" clickHandler={formik.handleSubmit} text="+" /> */}
    </div>
  );
};

export default ChapterAdder;
