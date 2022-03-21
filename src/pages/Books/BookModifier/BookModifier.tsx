import React from "react";
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
import BookState from "./SubComponents/BookState/BookState";
import { useDispatch } from "react-redux";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { nanoid } from "nanoid";
import Metadata from "../../../utils/Metadata";

type Props = {};

/**
 * Page where we can edit and add a book
 */
const BookModifier = (props: Props) => {
  /* STORAGE */

  /* STATE */
  const dispatch = useDispatch();
  /**
   * Initial values for formik
   */
  const initialValues: LM_Book = {
    author: "",
    book_id: nanoid(),
    book_title: "",
    pages: 0,
    progress: 0,
    read: true,
    summary: "",
    chapters: [],
    rate: 3,
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, { resetForm }) => {
      // TODO  Add to state
      // Remove values from form
      formik.resetForm();
      Metadata.addFrontendBook(values.book_id);
      // useAppDispatch(addBook(values));
      // Persists locally
      Book.addBook(values);
      // Persist on backend
      Server.addBook(values);
      // NOTE Resets the values of the form
      resetForm();
    },
    // validationSchema: () => {
    //   yup.object({
    //     author: yup
    //       .string()
    //       .max(30, "Must be 30 characters or less")
    //       .required("required"),
    //     pages: yup
    //       .number()
    //       .max(5000, "There cannot be more than 5000 pages.")
    //       .required("required"),
    //   });
    // },
  });

  /* METHODS */

  /* EVENTS */

  return (
    <div className="lm-page lm-bookmodifier">
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
  );
};

export default BookModifier;
