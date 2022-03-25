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

  /**
   * Handles the change of the part of a book by dispatching the new state to the store
   */
  const changeHandler = (newBook: LM_Book) => {
    dispatch(changeSelectedBook({ book: newBook, book_id: newBook.book_id }));
  };

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
        <ChapterState />
        <Adder type="button" text={"+"} />
      </div>
      <div className="lm-chapterbody">
        {/* TODO Key word taker */}
        {/* TODO Flash cards */}
        {/* TODO AddPicture */}
        <SummaryModifier />
      </div>
      <div className="lm-chapterfooter"></div>
    </div>
  );
};

export default ChapterModifier;
