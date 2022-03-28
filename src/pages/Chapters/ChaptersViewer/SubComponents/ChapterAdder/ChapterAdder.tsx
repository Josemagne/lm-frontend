import { useState, useEffect, useMemo } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { LM_Book } from "../../../../../types/Book/book";
import Book from "../../../../../storage/indexedDB/Book";
import LM_Chapter from "../../../../../types/Book/chapter";
import { useFormik } from "formik";
import { nanoid } from "nanoid";
import useAppSelector from "../../../../../hooks/useAppSelector";
import { boolean } from "yup/lib/locale";
import Server from "../../../../../services/Server";
import useAppDispatch from "../../../../../hooks/useAppDispatch";
import getNextIndex from "../../../../../utils/getNextIndex";
import {
  addChapter,
  changeSelectedBook,
  changeSelectedChapter,
} from "../../../../../state/redux/features/bookSlice";

type Props = {
  book_id: string;
};

const ChapterAdder = ({ book_id }: Props) => {
  const dispatch = useAppDispatch();
  /* STATE */
  const [book, setBook] = useState<LM_Book | undefined>();
  const [numberOfSubchapters, setNumberOfSubchapters] = useState<number>(0);

  const _book = useAppSelector((state) => state.books.selectedBook.book);

  const initialValues: LM_Chapter = {
    chapter_id: nanoid(),
    book_id: _book.book_id,
    title: "",
    importance: 50,
    read: false,
    summary: [{ children: [{ text: "" }] }],
    toRead: false,
    subchapters: [],
    ended: null,
    started: null,
    degree: null,
    parentChapter: null,
    isSubchapter: false,
    index: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      resetForm();
      // Add locally
      // redux
      if (!_book) return;
      dispatch(
        addChapter({ chapter: values, book_id: book_id })
        // changeSelectedChapter({

        //   chapter: values,
        //   chapter_id: values.chapter_id,
        // })
      );

      await Book.addChapter(_book.book_id, values);
      // Add to the server
      await Server.addChapter(values);
      // Completes submission cycle
      setSubmitting(false);
    },
    validate: () => {},
  });

  useEffect(() => {
    if (!_book) return;
  }, [_book]);

  useEffect(() => {}, []);

  console.log(formik.values);

  useEffect(() => {}, [numberOfSubchapters]);

  function addSubchapter() {
    console.log(numberOfSubchapters);
    setNumberOfSubchapters(numberOfSubchapters + 1);
  }

  function removeSubchapter() {
    setNumberOfSubchapters(numberOfSubchapters - 1);
  }

  return (
    <div className="lm-chapteradder">
      {_book ? (
        <>
          <div className="lm-chapteradder__index">
            <FloatingLabel controlId="index" label="Index">
              <Form.Control
                type="text"
                placeholder="Index"
                {...formik.getFieldProps("index")}
              />
            </FloatingLabel>
          </div>
          <div className="lm-chapteradder__title">
            <FloatingLabel controlId="title" label="Chaptertitle">
              <Form.Control
                type="text"
                placeholder="Book Title"
                {...formik.getFieldProps("title")}
              />
            </FloatingLabel>
          </div>
          <div className="lm-chapteradder__subchapters">
            <div className="lm-chapteradder__subchapter">
              <FloatingLabel
                controlId="subchapter"
                label="Subchapter Title"
                className="lm-chapteradder__subchapter__input"
              >
                <Form.Control type="text" placeholder="Subchapter Title" />
              </FloatingLabel>
            </div>
          </div>

          {/* roRead */}
          {/* importance */}
          {/* read */}
          {/* Summary */}
          <div className="lm-chapteradder__button">
            <button
              type="button"
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              add
            </button>
          </div>
        </>
      ) : null}
      {/* <Adder type="button" clickHandler={formik.handleSubmit} text="+" /> */}
    </div>
  );
};

export default ChapterAdder;
