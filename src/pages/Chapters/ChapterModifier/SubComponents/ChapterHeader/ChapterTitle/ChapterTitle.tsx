import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../state/redux/store";
import useAppSelector from "../../../../../../hooks/useAppSelector";

type Props = {};

const ChapterTitle = (props: Props) => {
  const [title, setTitle] = useState<string>();

<<<<<<< HEAD
  // Get title from redux

  useEffect(() => {}, []);
=======
  const _title = useAppSelector((state) => state);
  if (_title) {
    setTitle(_title);
  }
>>>>>>> f5caf40e7bc0ab99c76d30677981b68fcde5847f

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
