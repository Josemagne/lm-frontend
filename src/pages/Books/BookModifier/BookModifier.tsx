import React from "react";
import { Form } from "rsuite";
import BookTitle from "./SubComponents/BookTitle/BookTitle";
import BookPages from "./SubComponents/BookPages/BookPages";
import Adder from "../../../components/helpers/Adder/Adder";
import BookImage from "./SubComponents/BookImage/BookImage";
import { useLiveQuery } from "dexie-react-hooks";
import booksDB from "../../../storage/indexedDB/books";
import { addBook } from "../../../types/helpers/book/Book";

type Props = {};

/**
 * Page where we can edit and add a book
 */
const BookModifier = (props: Props) => {
  /* STORAGE */

  /* Methods */
  // TODO Move to helper functions

  /* STATE */

  /* EVENTS */

  // When the Adder is clicked then we add the book to indexedDB
  window.addEventListener("adderClicked", () => {});

  return (
    <div className="lm-page lm-booksmodifier">
      <Form.Group>
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
