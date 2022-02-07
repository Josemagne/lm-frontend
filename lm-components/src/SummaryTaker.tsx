import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export interface Props {}

export const SummaryTaker = (props: Props) => {
  return (
    <div {...props}>
      {/* btn */}

      {/* Input field */}
      <>
        <FloatingLabel controlId="chapter" label="Kapitel">
          <Form.Control type="text" placeholder="Kapitel" />
        </FloatingLabel>
      </>
    </div>
  );
};
