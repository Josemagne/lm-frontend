import React from "react";
import { IconButton } from "rsuite";
import { FloatingLabel, Form } from "react-bootstrap";

type Props = {};

const ChapterAdder = (props: Props) => {
  return (
    <div className="lm-chapteradder">
      {/* btn */}

      <IconButton size="md" circle />
      {/* input field */}
      <>
        <FloatingLabel controlId="chapter" label="Kaiitel">
          <Form.Control type="text" placeholder="Kapitel" />
        </FloatingLabel>
      </>
    </div>
  );
};

export default ChapterAdder;
