import React, { FormEvent } from "react";
import { Form } from "rsuite";
import BookTitle from "./SubComponents/BookTitle/BookTitle";
import BookPages from "./SubComponents/BookPages/BookPages";
import Adder from "../../../components/helpers/Adder/Adder";
import BookImage from "./SubComponents/BookImage/BookImage";
import { useLiveQuery } from "dexie-react-hooks";
import booksDB from "../../../storage/indexedDB/books";
import Book from "../../../utils/Book";
import { formik } from "../../../state/redux/features/bookSlice";

type Props = {};

/**
 * Page where we can edit and add a book
 */
const BookModifier = (props: Props) => {
  /* STORAGE */

  /* STATE */

  /* METHODS */

  /* EVENTS */

  return (
    <div className="lm-page lm-booksmodifier">
      <Form.Group
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <BookImage bookImage="" />

        <BookTitle />

        {/* TODO pages */}
        <BookPages />

        {/* TODO author */}
        {/* TODO state */}
        <Adder text={"+"} />
      </Form.Group>
    </div>
  );
};

export default BookModifier;
