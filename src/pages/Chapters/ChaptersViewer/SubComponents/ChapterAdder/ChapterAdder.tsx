import React, { useState, useEffect, useMemo } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { LM_Book } from "../../../../../types/Book/book";
import LM_Chapter from "../../../../../types/Book/chapter";
import { useFormik } from "formik";
import { nanoid } from "nanoid";
import useAppSelector from "../../../../../hooks/useAppSelector";
import Server from "../../../../../services/Server";
import useAppDispatch from "../../../../../hooks/useAppDispatch";
import {
  changeSelectedBook,
  updateBook,
} from "../../../../../state/redux/features/bookSlice";
import Chapter from "../../../../../classes/Chapter";
import Flashcard from "../../../../../classes/base/Flashcard";
import * as yup from "yup";
import FAPI from "../../../../../storage/indexedDB/FAPI";
import { Modal } from "rsuite";
import { toggleAddingNewChapter } from "../../../../../state/redux/features/chapterSlice";
import API from "../../../../../api/API";
import {addChapter} from "../../../../../state/redux/features/chapterSlice"

//type Props = {};

const ChapterAdder = () => {
  const [currentID, setCurrentID] = useState(nanoid());
  
  const dispatch = useAppDispatch();

  const selectedBook = useAppSelector((state) => state.books.selectedBook);

  const chapterSchema = yup.object().shape({
    title: yup.string().required().min(2, "Too short").max(40, "Too long"),
  });

  const formik = useFormik({
    validateOnBlur: true,
    validationSchema: chapterSchema,
    initialValues: new Chapter(
      currentID,
      selectedBook.book_id,
      "",
      "TO_READ",
      0,
      "",
      ""
    ),
    validate: async (values) => {
      interface IValidateErrors {
        title?: string
      }
      let errors: IValidateErrors = {};

      if (!values.title){
        errors.title = "Please write a title"
      }

      return errors;
    },
    onSubmit: async (values, { resetForm, setValues }) => {
      values.book_id = selectedBook.book_id;
      values.chapter_id = nanoid();
      console.log("v: ", values);

     dispatch(addChapter(values)) 

      await FAPI.addChapter(values);

      await API.addChapter(values);
      
      resetForm();
      setValues(() => {
        setCurrentID(nanoid());
        const newChapter = new Chapter(
          currentID,
          selectedBook.book_id,
          "",
          "TO_READ",
          0,
          "",
          ""
        );
        newChapter.chapter_id = currentID;
        return newChapter;
      });
    },
  });

  /**
   * Decides if the ChapterAdder Modal will be open
  */
  const addingNewChapter = useAppSelector(
    (state) => state.chapters.addingNewChapter
  );

  function handleClose() {
    dispatch(toggleAddingNewChapter(""));
  }

  useEffect(() => {
    console.log("addingNwcha", addingNewChapter)
    setCurrentID(nanoid());
  }, [formik.values, addingNewChapter]);

  
  return (
    <Modal open={addingNewChapter && selectedBook ? true : false} onClose={handleClose}>
      <div className="lm-chapteradder">
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

        {/* roRead */}
        {/* importance */}
        {/* read */}
        {/* Summary */}
        <div
          className="lm-chapteradder__button"
          onClick={() => {
            formik.handleSubmit();
          }}
        >
          <div>+</div>
        </div>

        {/* <Adder type="button" clickHandler={formik.handleSubmit} text="+" /> */}
      </div>
    </Modal>
  );
};

export default ChapterAdder;
