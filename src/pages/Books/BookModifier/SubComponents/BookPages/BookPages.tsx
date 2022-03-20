import { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { FormikValues } from "formik";
type Props = {
  values: any;
};

/**
 * Holds the number of pages for a book
 */
const BookPages = ({ values }: Props) => {
  return (
    <div className="lm-bookpages">
      <Form>
        <FloatingLabel controlId="pages" label="Pages">
          <Form.Control type="number" placeholder="Pages" {...values} />
        </FloatingLabel>
      </Form>
    </div>
  );
};

export default BookPages;
