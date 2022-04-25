import { FieldInputProps } from "formik";
import { Form, FloatingLabel } from "react-bootstrap";

type Props = {
  author_prename: FieldInputProps<string>;
  author_name: FieldInputProps<string>;
};

const BookAuthor = ({ author_prename, author_name }: Props) => {
  return (
    <div className="lm-bookauthor">
      <Form className="lm-bookauthor__container">
        <FloatingLabel
          controlId="author_prename"
          label="Author Prename"
          className="author_prename"
        >
          <Form.Control
            type="text"
            placeholder="Author Prename"
            {...author_prename}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="author_name"
          label="Author Name"
          className="author_name"
        >
          <Form.Control
            type="text"
            placeholder="Author Name"
            {...author_name}
          />
        </FloatingLabel>
      </Form>
    </div>
  );
};

export default BookAuthor;
