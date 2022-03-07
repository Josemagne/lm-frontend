import React from "react";
import BookTitle from "./SubComponents/BookTitle/BookTitle";
import BookPages from "./SubComponents/BookPages/BookPages";
import Adder from "../../../components/helpers/Adder/Adder";
import BookImage from "./SubComponents/BookImage/BookImage";
import Book from "../../../utils/Book";
import * as yup from "yup";
import Server from "../../../services/Server";
import { LM_Book } from "../../../types/Book/book";
import { useFormik, FormikProps, Formik, Form } from "formik";

type Props = {};

/**
 * Page where we can edit and add a book
 */
const BookModifier = (props: Props) => {
  /* STORAGE */

  /* STATE */
  /**
   * Initial values for formik
   */
  const initialValues: LM_Book = {
    author_name: "",
    author_prename: "",
    book_id: "",
    book_title: "",
    pages: 0,
    progress: 0,
    read: false,
    summary: "",
    chapters: null,
  };

  const formik: FormikProps<LM_Book> = useFormik({
    initialValues: initialValues,
    /**
     * Persists the data locally and on the backend
     * @param values LM_Book
     */
    onSubmit: (values) => {},
  });

  /* METHODS */

  /* EVENTS */

  return (
    <div className="lm-page lm-booksmodifier">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          // Add to state

          // Persists locally
          Book.addBook(values);
          // Persist on backend
          Server.addBook(values);
        }}
        validationSchema={yup.object({
          author_name: yup
            .string()
            .max(30, "Must be 30 characters or less")
            .required("required"),
        })}
        // validationSchema={(values: any) => formik.validateForm(values)}
      >
        <Form onSubmit={formik.handleSubmit}>
          <BookImage bookImage="" />

          <BookTitle />

          {/* TODO pages */}
          <BookPages />

          {/* TODO author */}
          {/* TODO state */}
          <Adder text={"+"} clickHandler={formik.handleSubmit} />
        </Form>
      </Formik>
    </div>
  );
};

export default BookModifier;
