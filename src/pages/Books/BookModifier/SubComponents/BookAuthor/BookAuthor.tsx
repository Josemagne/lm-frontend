import { Form, FloatingLabel } from "react-bootstrap";

type Props = {
  values: any;
};

const BookAuthor = ({ values }: Props) => {
  return (
    <div className="lm-bookauthor">
      <Form>
        <FloatingLabel controlId="author_name" label="Author">
          <Form.Control type="text" placeholder="Author" {...values} />
        </FloatingLabel>
      </Form>
    </div>
  );
};

export default BookAuthor;
