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
} from "../../../state/redux/features/chapterSlice"
import { Accordion } from "react-bootstrap"

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
  const selectedChapter = useAppSelector(
    (state) => state.chapters.selectedChapter
  )

  /**
   * Handles the change of the part of a book by dispatching the new state to the store
   */
  const changeHandler = (newChapter: LM_Chapter) => {
    dispatch(changeSelectedChapter(newChapter))
  }

  const submitHandler = async () => {
    await API.updateChapter(selectedChapter)
  }

  /**
   * Closes the modal
   */
  const handleClose = async () => {
    dispatch(changeSelectedChapter(null))
    await API.updateChapter(selectedChapter)
  }

  useEffect(() => {
    console.log("ChapterTitle, selectedChapter: ", selectedChapter)
  }, [selectedChapter])

  return (
    <Modal
      open={selectedChapter ? true : false}
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
          <div className="lm-chapterheader"></div>
          <div className="lm-chapterbody">
            <ChapterTitle />
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
            <hr className="lm-seperator1" />
            <Accordion defaultActiveKey="">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Summary</Accordion.Header>
                <Accordion.Body>
                  <ChapterSummary />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <hr className="lm-seperator2" />
            <ChapterFlashcards />
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
