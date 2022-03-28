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
  const [book, setBook] = useState<LM_Book>();

  // If the url contains a book_id then we handle this particular book
  const book_id = useAppSelector((state) => state.books.selectedBook.book_id);
  const _book = useAppSelector((state) => state.books.selectedBook.book);

  const getBook = async () => {
    if (!book_id) return;
    const _book = await Book.getBook(book_id);
    if (!_book) return;
    setBook(_book);
  };

  /**
   * Initial values for formik
   */
  const initialValues: LM_Book = {
    author: book?.author || "",
    book_id: book?.book_id || nanoid(),
    book_title: book?.book_title || "",
    pages: book?.pages || 0,
    progress: book?.progress || 0,
    read: book?.read || true,
    summary: book?.summary || "",
    chapters: book?.chapters || {},
    rate: book?.rate || 3,
    isPercentage: false,
    contents: {},
  };

  const formik = useFormik({
    initialValues: initialValues,
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

  useEffect(() => {
    getBook();
  }, []);

  // Rerender if the book changed
  useEffect(() => {
    console.log("book: ", book);
    console.log("book_id", book_id);
    console.log("_book", _book);
  }, [book]);

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
