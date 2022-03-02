import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export interface Props {
  color?: string;
}

export const SummaryTaker = ({ color }: Props) => {
  return (
    <div>
      {/* btn */}

      {/* Input field */}
      <>
        <FloatingLabel controlId="chapter" label="Kapitel">
          <Form.Control
            type="text"
            placeholder="Kapitel"
            className={`text-${color}`}
          />
        </FloatingLabel>
      </>
    </div>
  );
};
