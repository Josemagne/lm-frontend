import { useState, useEffect } from "react";
import BookTitle from "./SubComponents/BookTitle/BookTitle";
import BookPages from "./SubComponents/BookPages/BookPages";
import Adder from "../../../components/helpers/Adder/Adder";
import BookImage from "./SubComponents/BookImage/BookImage";
import Book from "../../../storage/indexedDB/Book";
import * as yup from "yup";
import Server from "../../../services/Server";
import { LM_Book } from "../../../types/Book/book";
import { useFormik, FormikProps, Formik, Form } from "formik";
import BookProgress from "./SubComponents/BookProgress/BookProgress";
import BookAuthor from "./SubComponents/BookAuthor/BookAuthor";
import { string } from "yup/lib/locale";
import { useDispatch } from "react-redux";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { nanoid } from "nanoid";
import Metadata from "../../../utils/Metadata";
import useAppSelector from "../../../hooks/useAppSelector";
import { Modal } from "rsuite";
import { addBook } from "../../../state/redux/features/bookSlice";

type Props = {};

/**
 * Part of BooksViewer where we can edit and add a book
 */
const BookModifier = (props: Props) => {
  /* STORAGE */

  /* STATE */
  const dispatch = useAppDispatch();

  const generateID = () => nanoid();

  const getInitialValues = (): LM_Book => {
    /**
     * Initial values for formik
     */
    return {
      author: "",
      book_id: generateID(),
      book_title: "",
      pages: 0,
      progress: 0,
      read: true,
      summary: "",
      chapters: {},
      rate: 3,
      isPercentage: false,
      contents: {},
    };
  };

  const formik = useFormik({
    initialValues: getInitialValues(),
    onSubmit: async (values, { resetForm }) => {
      dispatch(addBook(values));
      // TODO  Add to state
      await Metadata.addFrontendBook(values.book_id);
      // useAppDispatch(addBook(values));
      // Persists locally
      await Book.addBook(values);
      // Persist on backend
      await Server.addBook(values);
      // NOTE Resets the values of the form
      resetForm();
    },
  });

  /* METHODS */

  /* EVENTS */

  useEffect(() => {}, []);

  return (
    <div>
      <div className="lm-bookmodifier">
        <form onSubmit={formik.handleSubmit}>
          {/* <BookImage bookImage="" /> */}
          {console.log(formik.values)}

          <BookTitle values={formik.getFieldProps("book_title")} />

          <BookPages values={formik.getFieldProps("pages")} />

          {/* <BookState
              values={formik.getFieldProps("read")}
              setFieldValue={formik.setFieldValue}
            /> */}

          {/* <BookProgress values={formik.getFieldProps("progress")} /> */}

          <BookAuthor values={formik.getFieldProps("author")} />

          <Adder text={"+"} type="submit" />
        </form>
      </div>
    </div>
  );
};

export default BookModifier;
