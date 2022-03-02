import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";

type Props = {};

const BookTitle = (props: Props) => {
  return (
    <div className="lm-booktitle">
      <Form>
        <FloatingLabel controlId="chapter" label="Kapitel">
          <Form.Control type="text" placeholder="Kapitel" />
        </FloatingLabel>
      </Form>
    </div>
  );
};

export default BookTitle;
