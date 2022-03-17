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

type Props = {
  book_id: string;
};

const ChapterAdder = ({ book_id }: Props) => {
  /* STATE */
  const [book, setBook] = useState<LM_Book | undefined>();

  const initialValues: LM_Chapter = {
    chapter_id: nanoid(),
    title: "",
    importance: 50,
    read: false,
    summary: { summary_id: nanoid() },
    toRead: false,
  };

  useLiveQuery(() => {
    // let bookID = window.location.href.split("/").pop();
    if (!book_id) return;
    books.books.get(book_id).then((res) => {
      if (!res) return;
      // _book = res;
      setBook(res);
      // console.log("_book", _book);
    });
  });

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      // Add locally
      if (!book) return;
      Book.addChapter(book, values);
      console.log("Added chapter to book");
    },
    validate: () => {},
  });

  useEffect(() => {
    // Cleanup function
    return () => {};
  }, []);

  return (
    <div className="lm-chapteradder">
      <FloatingLabel
        controlId="title"
        label="Title"
        className="lm-chapteradder__title"
      >
        <Form.Control
          type="text"
          placeholder="Title"
          {...formik.getFieldProps("title")}
          onChange={formik.handleChange}
        />
      </FloatingLabel>
      {/* TODO Below */}
      {/* roRead */}
      {/* importance */}
      {/* read */}
      {/* Summary */}
      <button
        type="button"
        onClick={() => {
          formik.handleSubmit();
        }}
      >
        add
      </button>
      {/* <Adder type="button" clickHandler={formik.handleSubmit} text="+" /> */}
    </div>
  );
};

export default ChapterAdder;
