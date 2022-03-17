import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../state/redux/store";
import useAppSelector from "../../../../../../hooks/useAppSelector";

type Props = {};

const ChapterTitle = (props: Props) => {
  const [title, setTitle] = useState<string>();

  const _title = useAppSelector((state) => state);
  if (_title) {
    setTitle(_title);
  }

  return (
    <div className="lm-chaptertitle">
      <Form>
        <FloatingLabel controlId="chapter" label="Kapitel">
          <Form.Control
            defaultValue={title}
            type="text"
            placeholder="Kapitel"
          />
        </FloatingLabel>
      </Form>
    </div>
  );
};

export default ChapterTitle;
