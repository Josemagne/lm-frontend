import { useState } from "react";
import ChapterTitle from "./SubComponents/ChapterHeader/ChapterTitle/ChapterTitle";
import { useNavigate } from "react-router-dom";
import ChapterState from "./SubComponents/ChapterHeader/ChapterState/ChapterState";
import SummaryModifier from "./SubComponents/ChapterBody/SummaryModifier/SummaryModifier";
import Adder from "../../../components/helpers/Adder/Adder";
import { useEffect } from "react";
import LM_Chapter from "../../../types/Book/chapter";
import { LM_Book } from "../../../types/Book/book";
import useAppSelector from "../../../hooks/useAppSelector";
import { useFormik } from "formik";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { changeSelectedBook } from "../../../state/redux/features/bookSlice";
import ChapterFlashcards from "./SubComponents/ChapterBody/ChapterFlashcards/ChapterFlashcards";
import AddPictures from "../../../components/AddPictures/AddPictures";
import ChapterKeywords from "./SubComponents/ChapterBody/ChapterKeywords/ChapterKeywords";
import ChapterSummary from "./SubComponents/ChapterBody/ChapterSummary/ChapterSummary";

type Props = {};

const ChapterModifier = (props: Props) => {
  /**
   * Dispatches action creator to the store
   */
  const dispatch = useAppDispatch();
  /**
   * Lets us navigate throught the pages
   */
  const navigate = useNavigate();
  const bookID = window.location.href.split("/").pop();

  const book = useAppSelector((state) => state.books.selectedBook.book);
  const chapter = useAppSelector(
    (state) => state.books.selectedChapter.chapter
  );

  /**
   * Handles the change of the part of a book by dispatching the new state to the store
   */
  const changeHandler = (newBook: LM_Book) => {
    dispatch(changeSelectedBook({ book: newBook, book_id: newBook.book_id }));
  };

  const submitHandler = () => {};

  useEffect(() => {}, [book]);

  useEffect(() => {}, []);

  return (
    <div className="lm-page lm-chaptermodifier">
      <div
        className="lm-page-back"
        onClick={() => navigate(`/chaptersviewer/${bookID}`)}
      >
        <p style={{ fontSize: 18 }}>
          <button>{"<----"}</button>
        </p>
      </div>
      {/* TODO Move to its own File */}
      <div className="lm-chapterheader">
        <ChapterTitle book={book} changeHandler={changeHandler} />
        {/* @ts-ignore */}
        <ChapterState changeHandler={changeHandler} />
        <Adder type="button" text={"+"} clickHandler={submitHandler} />
      </div>
      <div className="lm-chapterbody">
        <ChapterSummary entity={book} changeHandler={changeHandler} />
        <ChapterFlashcards />
        <ChapterKeywords />
        <AddPictures />
      </div>
      <div className="lm-chapterfooter"></div>
    </div>
  );
};

export default ChapterModifier;
