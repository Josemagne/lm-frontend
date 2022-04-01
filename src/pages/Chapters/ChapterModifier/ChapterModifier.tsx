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
  toggleChapterModifierModal,
  updateBook,
} from "../../../state/redux/features/bookSlice";
import AddPictures from "../../../components/AddPictures/AddPictures";
import ChapterKeywords from "./SubComponents/ChapterBody/ChapterKeywords/ChapterKeywords";
import ChapterSummary from "./SubComponents/ChapterBody/ChapterSummary/ChapterSummary";
import Book from "../../../storage/indexedDB/Book";
import Server from "../../../services/Server";
import { Modal } from "react-bootstrap";
import ChapterFlashcards from "./SubComponents/ChapterBody/ChapterFlashcards/ChapterFlashcards";

type Props = {};

const ChapterModifier = (props: Props) => {
  /**
   * Dispatches action creator to the store
   */
  const dispatch = useAppDispatch();

  const book = useAppSelector((state) => state.books.selectedBook.book);
  const chapter = useAppSelector((state) => state.books.selectedChapter);
  const openChapterModifierModal = useAppSelector(
    (state) => state.books.openChapterModifierModal
  );

  /**
   * Handles the change of the part of a book by dispatching the new state to the store
   */
  const changeHandler = (newBook: LM_Book) => {
    dispatch(changeSelectedBook({ book: newBook, book_id: newBook.book_id }));
    console.log("after dispatch: ", chapter.chapter.summary);
  };

  const submitHandler = async () => {
    dispatch(updateBook(book));
    // Add to indexedDB
    await Book.updateBook(book.book_id, book);

    // Add to server
    await Server.updateBook(book);
  };

  /**
   * Closes the modal
   */
  const handleClose = () => {
    // Metadata.addUnsynchronizedBook(book);
    dispatch(toggleChapterModifierModal(""));
    dispatch(removeSelectedChapter(""));
  };

  useEffect(() => {
    console.log("open?: ", openChapterModifierModal);
    console.log("chapter: ", chapter);
  }, [openChapterModifierModal]);
  useEffect(() => {}, [book, chapter]);

  useEffect(() => {}, []);

  return (
    <Modal
      show={chapter.chapter ? true : false}
      onHide={handleClose}
      className="lm-chaptermodifier"
    >
      {chapter && book ? (
        <>
          {/* TODO Move to its own File */}
          <div className="lm-chapterheader">
            <ChapterTitle />
            {/* @ts-ignore */}
            {/* TODO Correct */}
            {/* <ChapterState changeHandler={changeHandler} /> */}
            <Adder type="button" text={"+"} clickHandler={submitHandler} />
          </div>
          <div className="lm-chapterbody">
            <ChapterSummary
              entity={{ ...book }}
              chapterIndex={chapter.chapterIndex}
              changeHandler={changeHandler}
              // @ts-ignore
              chpaterId={chapter.chapter.chapter_id}
            />
            <ChapterFlashcards />
            <ChapterKeywords />
            <AddPictures />
            {/* TODO Subchapters */}
          </div>
          <div className="lm-chapterfooter"></div>
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

export default ChapterModifier;
