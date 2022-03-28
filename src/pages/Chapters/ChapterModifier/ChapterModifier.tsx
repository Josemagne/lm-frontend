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
  removeSelectedChapter,
} from "../../../state/redux/features/bookSlice";
import ChapterFlashcards from "./SubComponents/ChapterBody/ChapterFlashcards/ChapterFlashcards";
import AddPictures from "../../../components/AddPictures/AddPictures";
import ChapterKeywords from "./SubComponents/ChapterBody/ChapterKeywords/ChapterKeywords";
import ChapterSummary from "./SubComponents/ChapterBody/ChapterSummary/ChapterSummary";
import Book from "../../../storage/indexedDB/Book";
import Server from "../../../services/Server";
import Return from "../../../components/Navigation/SubComponents/Return/Return";
import { Modal } from "rsuite";

type Props = {};

const ChapterModifier = (props: Props) => {
  const [chapterIndex, setChapterIndex] = useState<number>();
  /**
   * Dispatches action creator to the store
   */
  const dispatch = useAppDispatch();
  /**
   * Lets us navigate throught the pages
   */
  const navigate = useNavigate();

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
    console.log("book when we dispatch it: ", book);
    // Add to indexedDB
    await Book.updateBook(book.book_id, book);

    // Add to server
    await Server.updateBook(book);

    console.log("Updated the chapter");
  };

  /**
   * Closes the modal
   */
  const handleClose = () => {
    dispatch(removeSelectedChapter(""));
  };

  useEffect(() => {}, [openChapterModifierModal]);
  useEffect(() => {}, [book, chapter]);

  useEffect(() => {}, []);

  return (
    <div className="lm-page lm-chaptermodifier">
      <Modal
        overflow={true}
        open={openChapterModifierModal}
        onClose={handleClose}
        full={true}
      >
        {chapter && book ? (
          <>
            {/* TODO Move to its own File */}
            <div className="lm-chapterheader">
              <ChapterTitle
                book={book}
                changeHandler={changeHandler}
                chapterIndex={chapter.chapterIndex}
              />
              {/* @ts-ignore */}
              <ChapterState changeHandler={changeHandler} />
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
            </div>
            <div className="lm-chapterfooter"></div>
          </>
        ) : null}
      </Modal>
    </div>
  );
};

export default ChapterModifier;
