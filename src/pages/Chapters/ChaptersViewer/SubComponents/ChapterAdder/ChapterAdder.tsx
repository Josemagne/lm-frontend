import { useState, useEffect } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import Adder from "../../../../../components/helpers/Adder/Adder";
import { LM_Book } from "../../../../../types/Book/book";
import Book from "../../../../../utils/Book";
import LM_Chapter from "../../../../../types/Book/chapter";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../state/redux/store";
import { useFormik } from "formik";
import { nanoid } from "nanoid";
import { useLiveQuery } from "dexie-react-hooks";
import books from "../../../../../storage/indexedDB/books";

type Props = {};

const ChapterAdder = ({}: Props) => {
  /* STATE */
  const [book, setBook] = useState<LM_Book>();

  const initialValues: LM_Chapter = {
    title: "",
    importance: 50,
    read: false,
    summary: { summary_id: nanoid() },
    toRead: false,
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      if (book && values) {
        // Add locally
        Book.addChapter(book, values);
      }
    },
  });

  const bookID = useSelector((state: RootState) => state.books.selectedBook);

  const mybook = useSelector(
    (state: RootState) => state.books.selectedBookObject
  );

  setBook(mybook);

  // useLiveQuery(() => {
  //   books.books.get(bookID).then((res) => {
  //     if (!res) return;
  //     setBook(res);
  //   });
  // });

  useEffect(() => {
    console.log("Initialised ChapterAdder local component");
  }, [book]);

  return (
    <div className="lm-chapteradder">
      <FloatingLabel
        controlId="title"
        label="Title"
        className="lm-chapteradder__title"
        {...formik.getFieldProps("title")}
      >
        <Form.Control type="text" placeholder="Title" />
      </FloatingLabel>
      {/* TODO Below */}
      {/* roRead */}
      {/* importance */}
      {/* read */}
      {/* Summary */}
      <Adder clickHandler={formik.handleSubmit} text="+" />
    </div>
  );
};

export default ChapterAdder;
