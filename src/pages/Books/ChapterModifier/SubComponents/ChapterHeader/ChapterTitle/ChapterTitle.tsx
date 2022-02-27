import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";

type Props = {};

const ChapterTitle = (props: Props) => {
  return (
    <div className="lm-chaptertitle">
      <Form>
        <FloatingLabel controlId="chapter" label="Kapitel">
          <Form.Control type="text" placeholder="Kapitel" />
        </FloatingLabel>
      </Form>
    </div>
  );
};

export default ChapterTitle;
