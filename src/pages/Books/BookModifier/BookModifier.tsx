import { useEffect } from "react";
import BookTitle from "./SubComponents/BookTitle/BookTitle";
import BookPages from "./SubComponents/BookPages/BookPages";
import Adder from "../../../components/helpers/Adder/Adder";
import Book from "../../../storage/indexedDB/Book";
import { useFormik } from "formik";
import BookAuthor from "./SubComponents/BookAuthor/BookAuthor";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { nanoid } from "nanoid";
import Metadata from "../../../utils/Metadata";
import { addBook } from "../../../state/redux/features/bookSlice";
import { LM_Book } from "../../../types/Book/book";
import { Descendant } from "slate";
import Server from "../../../services/Server";
import * as yup from "yup";

type Props = {};

/**
 * Part of BooksViewer where we can edit and add a book
 */
const BookModifier = (props: Props) => {
  /* STORAGE */

  /* STATE */
  const dispatch = useAppDispatch();

  function getInitialValues(): LM_Book {
    return {
      author: "",
      book_id: nanoid(),
      book_title: "",
      pages: 0,
      progress: 0,
      read: true,
      summary: "",
      chapters: {},
      rate: 3,
      isPercentage: false,
      contents: [{ children: [{ text: "" }] }],
      chaptersIndexing: {},
    };
  }

  const bookSchema = yup.object().shape({
    author: yup.string().required().min(2, "Too short").max(40, "Too long"),
    book_title: yup.string().required().min(2, "Too short").max(40, "Too long"),
    pages: yup
      .number()
      .required()
      .min(5, "Too Short")
      .max(4000, "Too long")
      .positive()
      .integer(),
  });

  const formik = useFormik({
    initialValues: getInitialValues(),
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: bookSchema,
    validate: async (values) => {
      let errors: any = {};

      if (!values.book_title) {
        errors.book_title = "Book title is required";
      }

      if (!values.author) {
        errors.author = "A author must be given";
      }

      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      console.log("id: ", values.book_id);
      dispatch(addBook(values));
      // TODO  Add to state
      await Metadata.addFrontendBook(values.book_id);
      // useAppDispatch(addBook(values));
      // Persists locally
      await Book.addBook(values);

      Server.addBook(values).then((res) => {
        console.log(res);
      });

      // NOTE Resets the values of the form
      resetForm({
        values: getInitialValues(),
      });
      // formik.values.book_id = nanoid();
    },
  });

  /* METHODS */

  /* EVENTS */

  useEffect(() => {
    console.log(formik.errors);
  }, [formik.values]);

  return (
    <div className="lm-bookmodifier">
      <form onSubmit={formik.handleSubmit}>
        {/* <BookImage bookImage="" /> */}

        <BookTitle values={formik.getFieldProps("book_title")} />
        <div className="lm-form-error">
          {formik.errors.book_title ? <p>{formik.errors.book_title}</p> : null}
        </div>

        <BookPages values={formik.getFieldProps("pages")} />

        {/* <BookState
              values={formik.getFieldProps("read")}
              setFieldValue={formik.setFieldValue}
            /> */}

        {/* <BookProgress values={formik.getFieldProps("progress")} /> */}

        <BookAuthor values={formik.getFieldProps("author")} />

        <div className="lm-adder-btn d-flex justify-content-center align-items-center m-4">
          {formik.isValid && formik.dirty ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => formik.handleSubmit()}
            >
              +
            </button>
          ) : (
            <button type="button" className="btn btn-primary" disabled>
              +
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookModifier;
