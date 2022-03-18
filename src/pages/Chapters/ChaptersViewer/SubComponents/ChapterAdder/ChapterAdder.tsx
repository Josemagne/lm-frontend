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

  const getBook = async () => {
    if (!book_id) return;
    let result = await Book.getBook(book_id);
    if (!result) return;
    setBook(result);
  };

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
    getBook();
  }, []);

  return (
    <div className="lm-chapteradder">
      <div>
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
          className="lm-chapteradder__button"
        >
          add
        </button>
      </div>
      {/* <Adder type="button" clickHandler={formik.handleSubmit} text="+" /> */}
    </div>
  );
};

export default ChapterAdder;
