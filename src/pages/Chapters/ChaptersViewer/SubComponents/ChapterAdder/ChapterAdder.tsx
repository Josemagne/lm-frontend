import { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import Adder from "../../../../../components/helpers/Adder/Adder";
import { LM_Book } from "../../../../../types/Book/book";
import Book from "../../../../../utils/Book";
import LM_Chapter from "../../../../../types/Book/chapter";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../state/redux/store";
import { useFormik } from "formik";
import { nanoid } from "nanoid";

type Props = {
  bookID: string;
};

const ChapterAdder = ({}: Props) => {
  /* STATE */
  const [book, setBook] = useState<LM_Book>();
  const [chapter, setChapter] = useState<LM_Chapter>();

  const initialValues: LM_Chapter = {
    title: "",
    importance: 50,
    read: false,
    summary: { summary_id: nanoid() },
    toRead: false,
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      if (book && chapter) {
        Book.addChapter(book, chapter);
      }
    },
  });

  const _book = useSelector((state: RootState) => state.books.selectedBook);
  if (_book) setBook(_book);

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
