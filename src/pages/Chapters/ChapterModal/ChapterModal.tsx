import { useState } from "react"
import ChapterTitle from "./SubComponents/ChapterHeader/ChapterTitle/ChapterTitle"
import { useNavigate } from "react-router-dom"
import ChapterState from "./SubComponents/ChapterHeader/ChapterState/ChapterState"
import Adder from "../../../components/helpers/Adder/Adder"
import { useEffect } from "react"
import LM_Chapter from "../../../types/Book/chapter"
import { LM_Book } from "../../../types/Book/book"
import useAppSelector from "../../../hooks/useAppSelector"
import { useFormik } from "formik"
import useAppDispatch from "../../../hooks/useAppDispatch"
import ChapterSummary from "./SubComponents/ChapterBody/ChapterSummary/ChapterSummary"
import { Modal } from "rsuite"
import ChapterFlashcards from "./SubComponents/ChapterBody/ChapterFlashcards/ChapterFlashcards"
import API from "../../../api/API"
import FAPI from "../../../storage/indexedDB/FAPI"
import {
  changeSelectedChapter,
  deleteSelectedChapter,
  toggleIsSelectingChapter,
} from "../../../state/redux/features/chapterSlice"
import { Accordion } from "react-bootstrap"
import { toggleIsAddingNewFlashcard } from "../../../state/redux/features/Flashcard/flashcardSlice"
import {
  selectedChapterSelector,
  isSelectingChapterSelector,
} from "../../../state/redux/features/chapterSlice"

/**
 * Modal where we can edit information about a chapter
 * @param props
 * @returns
 */
const ChapterModal = () => {
  /**
   * Dispatches action creator to the store
   */
  const dispatch = useAppDispatch()
  const selectedChapter = useAppSelector(selectedChapterSelector)
  const isSelectingChapter: boolean = useAppSelector(isSelectingChapterSelector)

  /**
   * Handles the change of the part of a book by dispatching the new state to the store
   */
  const changeHandler = (newChapter: LM_Chapter) => {
    dispatch(changeSelectedChapter(newChapter))
  }

  const submitHandler = () => {
    API.updateChapter(selectedChapter)
  }

  /**
   * Closes the modal
   */
  const handleClose = () => {
    dispatch(changeSelectedChapter(null))
    dispatch(toggleIsSelectingChapter(""))
    if (!sessionStorage.getItem("isTesting")) {
      API.updateChapter(selectedChapter)
    }
  }

  useEffect(() => {}, [selectedChapter])

  return (
    <Modal
      open={isSelectingChapter}
      onClose={handleClose}
      className={
        selectedChapter
          ? "lm-chaptermodifier "
          : "lm-chaptermodifier modal-fadeOut"
      }
      overflow={true}
      full={true}
    >
      {selectedChapter && (
        <>
          <button
            className="btn btn-danger lm-chaptermodifier__close"
            onClick={handleClose}
          >
            x
          </button>
          <div className="lm-chapterheader">
            <ChapterTitle />
          </div>
          <hr className="lm-seperator1" />
          <div className="lm-chapterbody">
            {/* <button
              type="button"
              onClick={submitHandler}
              className="lm-chaptermodifier__adder"
            >
              Change
            </button> */}
            {/* @ts-ignore */}
            {/* TODO Correct */}
            {/* <ChapterState changeHandler={changeHandler} /> */}
            <Accordion defaultActiveKey="" className="lm-summary-accordion">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Summary</Accordion.Header>
                <Accordion.Body>
                  <ChapterSummary />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <hr className="lm-seperator2" />
            <div className="chaptermodal__flashcards">
              <ChapterFlashcards />
            </div>

            {/* TODO Citation */}
            {/* <ChapterKeywords /> */}
            {/* <AddPictures /> */}
            {/* TODO Subchapters */}
          </div>
          <div className="lm-chapterfooter"></div>
        </>
      )}
    </Modal>
  )
}

export default ChapterModal
