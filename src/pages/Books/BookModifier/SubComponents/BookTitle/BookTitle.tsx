import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";

type Props = {};

const BookTitle = (props: Props) => {
  return (
    <div className="lm-booktitle">
      <Form className="lm-booktitle__form">
        <FloatingLabel
          controlId="author_name"
          label="Author"
          className="lm-booktitle__author"
        >
          <Form.Control type="text" placeholder="Author" />
        </FloatingLabel>
        <FloatingLabel
          controlId="book_title"
          label="Book Title"
          className="lm-booktitle__title"
        >
          <Form.Control type="text" placeholder="Book Title" />
        </FloatingLabel>
      </Form>
    </div>
  );
};

export default BookTitle;
