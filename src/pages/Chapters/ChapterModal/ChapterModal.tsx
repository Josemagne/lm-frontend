import { useState } from "react";
import ChapterTitle from "./SubComponents/ChapterHeader/ChapterTitle/ChapterTitle";
import { useNavigate } from "react-router-dom";
import ChapterState from "./SubComponents/ChapterHeader/ChapterState/ChapterState";
import Adder from "../../../components/helpers/Adder/Adder";
import { useEffect } from "react";
import LM_Chapter from "../../../types/Book/chapter";
import { LM_Book } from "../../../types/Book/book";
import useAppSelector from "../../../hooks/useAppSelector";
import { useFormik } from "formik";
import useAppDispatch from "../../../hooks/useAppDispatch";
import {
  changeSelectedBook,
  changeSelectedChapter,
  removeSelectedChapter,
  updateBook,
} from "../../../state/redux/features/bookSlice";
import ChapterSummary from "./SubComponents/ChapterBody/ChapterSummary/ChapterSummary";
import { Modal } from "react-bootstrap";
import ChapterFlashcards from "./SubComponents/ChapterBody/ChapterFlashcards/ChapterFlashcards";
import "react-quill/dist/quill.snow.css";
import API from "../../../api/API";
import FAPI from "../../../storage/indexedDB/FAPI";
import { updateSelectedChapter } from "../../../state/redux/features/chapterSlice";

type Props = {};

/**
 * Modal where we can edit information about a chapter
 * @param props
 * @returns
 */
const ChapterModal = (props: Props) => {
  /**
   * Dispatches action creator to the store
   */
  const dispatch = useAppDispatch();
  const selectedChapter = useAppSelector(
    (state) => state.chapters.selectedChapter
  );

  /**
   * Handles the change of the part of a book by dispatching the new state to the store
   */
  const changeHandler = (newChapter: LM_Chapter) => {
    dispatch(updateSelectedChapter(newChapter));
  };

  const submitHandler = async () => {
    await FAPI.updateChapter(selectedChapter);

    await API.updateChapter(selectedChapter);
  };

  /**
   * Closes the modal
   */
  const handleClose = () => {
    dispatch(removeSelectedChapter(""));
  };

  useEffect(() => {}, [selectedChapter]);

  return (
    <Modal
      show={selectedChapter ? true : false}
      onHide={handleClose}
      className="lm-chaptermodifier"
    >
      {selectedChapter ? (
        <>
          {/* TODO Move to its own File */}
          <div className="lm-chapterheader">
            <ChapterTitle />
            {/* @ts-ignore */}
            {/* TODO Correct */}
            {/* <ChapterState changeHandler={changeHandler} /> */}
          </div>
          <div className="lm-chapterbody">
            <ChapterSummary />
            <ChapterFlashcards />
            {/* TODO Citation */}
            {/* <ChapterKeywords /> */}
            {/* <AddPictures /> */}
            {/* TODO Subchapters */}
          </div>
          <div className="lm-chapterfooter">
            <button
              type="button"
              onClick={submitHandler}
              className="lm-chaptermodifier__adder"
            >
              +
            </button>
          </div>
        </>
      ) : null}
      <button
        className="btn btn-danger lm-chaptermodifier__close"
        onClick={handleClose}
      >
        x
      </button>
    </Modal>
  );
};

export default ChapterModal;
