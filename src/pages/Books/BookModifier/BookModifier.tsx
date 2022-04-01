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

type Props = {};

/**
 * Part of BooksViewer where we can edit and add a book
 */
const BookModifier = (props: Props) => {
  /* STORAGE */

  /* STATE */
  const dispatch = useAppDispatch();

  function getInitialValues() {
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
      contents: {},
    };
  }

  const formik = useFormik({
    initialValues: getInitialValues(),
    onSubmit: async (values, { resetForm }) => {
      console.log("id: ", values.book_id);
      dispatch(addBook(values));
      // TODO  Add to state
      await Metadata.addFrontendBook(values.book_id);
      // useAppDispatch(addBook(values));
      // Persists locally
      await Book.addBook(values);
      // Persist on backend
      // await Server.addBook(values);
      // NOTE Resets the values of the form
      resetForm({
        values: getInitialValues(),
      });
      console.log("id after: ", values.book_id);
      // formik.values.book_id = nanoid();
    },
  });

  /* METHODS */

  /* EVENTS */

  useEffect(() => {}, [formik.values]);

  return (
    <div className="lm-bookmodifier">
      <form onSubmit={formik.handleSubmit}>
        {/* <BookImage bookImage="" /> */}

        <BookTitle values={formik.getFieldProps("book_title")} />

        <BookPages values={formik.getFieldProps("pages")} />

        {/* <BookState
              values={formik.getFieldProps("read")}
              setFieldValue={formik.setFieldValue}
            /> */}

        {/* <BookProgress values={formik.getFieldProps("progress")} /> */}

        <BookAuthor values={formik.getFieldProps("author")} />

        <Adder clickHandler={formik.handleSubmit} text={"+"} type="submit" />
      </form>
    </div>
  );
};

export default BookModifier;
