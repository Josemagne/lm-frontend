import React, { useState, useEffect, useMemo } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { LM_Book } from "../../../../../types/Book/book";
import Book from "../../../../../storage/indexedDB/Book";
import LM_Chapter from "../../../../../types/Book/chapter";
import { useFormik } from "formik";
import { nanoid } from "nanoid";
import useAppSelector from "../../../../../hooks/useAppSelector";
import Server from "../../../../../services/Server";
import useAppDispatch from "../../../../../hooks/useAppDispatch";
import {
  addChapter,
  changeSelectedBook,
  changeSelectedChapter,
  updateBook,
} from "../../../../../state/redux/features/bookSlice";
import Chapter from "../../../../../classes/Chapter";
import Flashcard from "../../../../../classes/base/Flashcard";
import * as yup from "yup";

type Props = {};

const ChapterAdder = ({}: Props) => {
  const [currentID, setCurrentID] = useState(nanoid());
  const dispatch = useAppDispatch();
  /* STATE */

  const _book = useAppSelector((state) => state.books.selectedBook.book);

  const chapterSchema = yup.object().shape({
    title: yup.string().required().min(2, "Too short").max(40, "Too long"),
  });

  const formik = useFormik({
    validateOnBlur: true,
    validationSchema: chapterSchema,
    initialValues: new Chapter(
      currentID,
      _book.book_id,
      "",
      false,
      false,
      false,
      0,
      "",
      ""
    ),
    validate: async (values) => {
      return await chapterSchema.isValid({
        title: values.title,
      });
    },
    onSubmit: async (values, { resetForm, setValues }) => {
      values.book_id = _book.book_id;
      values.chapter_id = nanoid();
      console.log("v: ", values);

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

      console.log("Sending book to backend");
      // Add to the server
      await Server.addChapter(values);
      // Completes submission cycle
      resetForm();
      setValues(() => {
        setCurrentID(nanoid());
        const newChapter = new Chapter(
          currentID,
          _book.book_id,
          "",
          false,
          false,
          false,
          0,
          "",
          ""
        );
        newChapter.chapter_id = currentID;
        return newChapter;
      });
    },
  });

  useEffect(() => {
    if (!_book) return;
  }, [_book]);

  useEffect(() => {
    setCurrentID(nanoid());
  }, [formik.values]);

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
      <div
        className="lm-chapteradder__button"
        onClick={() => {
          formik.handleSubmit();
        }}
      >
        <div>+</div>
      </div>

      {/* <Adder type="button" clickHandler={formik.handleSubmit} text="+" /> */}
    </div>
  );
};

export default ChapterAdder;
