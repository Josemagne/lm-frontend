import { useState, useEffect, useMemo } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import Adder from "../../../../../components/helpers/Adder/Adder";
import { LM_Book } from "../../../../../types/Book/book";
import Book from "../../../../../storage/indexedDB/Book";
import LM_Chapter from "../../../../../types/Book/chapter";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../state/redux/store";
import { useFormik } from "formik";
import { nanoid } from "nanoid";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor, Node } from "slate";

type Props = {
  book_id: string;
};

const initialValue: Node[] = [
  {
    children: [
      {
        type: "paragraph",
        children: [
          {
            text: "Title",
          },
        ],
      },
    ],
  },
];

const ChapterAdder = ({ book_id }: Props) => {
  /* STATE */
  const [book, setBook] = useState<LM_Book | undefined>();
  const [chapterValue, setChapterValue] = useState<Node[]>(initialValue);
  const [subChapterValue, setSubChapterValue] = useState<Node[]>(initialValue);

  const initialValues: LM_Chapter = {
    chapter_id: nanoid(),
    title: "",
    importance: 50,
    read: false,
    summary: { summary_id: nanoid() },
    toRead: false,
  };

  const getBook = async () => {
    if (!book_id) return;
    let result = await Book.getBook(book_id);
    if (!result) return;
    setBook(result);
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      // Add locally
      if (!book) return;
      Book.addChapter(book, values);
      console.log("Added chapter to book");
    },
    validate: () => {},
  });

  useEffect(() => {
    getBook();
  }, []);

  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <div className="lm-chapteradder">
      <Slate
        editor={editor}
        value={chapterValue}
        onChange={(v) => setChapterValue(v)}
      >
        <Editable />
      </Slate>
      <div>
        <FloatingLabel
          controlId="title"
          label="Title"
          className="lm-chapteradder__title"
        >
          <Form.Control
            type="text"
            placeholder="Title"
            {...formik.getFieldProps("title")}
            onChange={formik.handleChange}
          />
        </FloatingLabel>
        {/* TODO Below */}
        {/* Subchapter */}
        <div className="lm-chapteradder_subchapter">
          <Slate
            editor={editor}
            value={chapterValue}
            onChange={(v) => setChapterValue(v)}
          >
            <Editable />
          </Slate>
        </div>

        {/* roRead */}
        {/* importance */}
        {/* read */}
        {/* Summary */}
        <button
          type="button"
          onClick={() => {
            formik.handleSubmit();
          }}
          className="lm-chapteradder__button"
        >
          add
        </button>
      </div>
      {/* <Adder type="button" clickHandler={formik.handleSubmit} text="+" /> */}
    </div>
  );
};

export default ChapterAdder;
