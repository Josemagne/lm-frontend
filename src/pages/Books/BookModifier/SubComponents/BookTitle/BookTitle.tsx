import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";

type Props = {
  values: any;
};

const BookTitle = ({ values }: Props) => {
  return (
    <div className="lm-booktitle">
      <Form className="lm-booktitle__form">
        <FloatingLabel
          controlId="book_title"
          label="Book Title"
          className="lm-booktitle__title"
        >
          <Form.Control type="text" placeholder="Book Title" {...values} />
        </FloatingLabel>
      </Form>
    </div>
  );
};

export default BookTitle;
