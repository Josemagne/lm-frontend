import { useState, useEffect, useMemo } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { LM_Book } from "../../../../../types/Book/book";
import Book from "../../../../../storage/indexedDB/Book";
import LM_Chapter from "../../../../../types/Book/chapter";
import { useFormik } from "formik";
import { nanoid } from "nanoid";
import useAppSelector from "../../../../../hooks/useAppSelector";

type Props = {
  book_id: string;
};

const ChapterAdder = ({ book_id }: Props) => {
  /* STATE */
  const [book, setBook] = useState<LM_Book | undefined>();
  const [numberOfSubchapters, setNumberOfSubchapters] = useState<number>(0);

  const _book = useAppSelector((state) => state.books.selectedBook.book);

  const initialValues: LM_Chapter = {
    chapter_id: nanoid(),
    title: "",
    importance: 50,
    read: false,
    summary: "",
    toRead: false,
    subchapters: [],
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
    setBook(_book);
  }, [_book]);

  useEffect(() => {
    getBook();
  }, []);

  console.log(formik.values);

  useEffect(() => {}, [numberOfSubchapters]);

  function addSubchapter() {
    setNumberOfSubchapters(numberOfSubchapters + 1);
  }

  return (
    <div className="lm-chapteradder">
      <div className="lm-chapteradder__title">
        <FloatingLabel controlId="title" label="Chaptertitle">
          <Form.Control
            type="text"
            placeholder="Book Title"
            {...formik.getFieldProps("title")}
          />
        </FloatingLabel>
      </div>
      <div>
        {/* TODO Below */}
        {/* Subchapter */}
        <div className="lm-chapteradder__subchapters">
          <div className="lm-chapteradder__subchapter">
            <div className="plussign">
              <button onClick={addSubchapter}>+</button>
            </div>
            <FloatingLabel
              controlId="subchapter"
              label="Subchapter Title"
              className="lm-chapteradder__subchapter__input"
            >
              <Form.Control
                type="text"
                placeholder="Subchapter Title"
                {...formik.getFieldProps("subchapters")}
              />
            </FloatingLabel>
          </div>
          {numberOfSubchapters > 0
            ? [numberOfSubchapters].map((ch) => {
                return (
                  <div className="lm-chapteradder__subchapter">
                    <div className="plussign">
                      <button onClick={addSubchapter}>+</button>
                    </div>
                    <FloatingLabel
                      controlId="subchapter"
                      label="Subchapter Title"
                      className="lm-chapteradder__subchapter__input"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Subchapter Title"
                        {...formik.getFieldProps("subchapters")}
                      />
                    </FloatingLabel>
                  </div>
                );
              })
            : null}
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
