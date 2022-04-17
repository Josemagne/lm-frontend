import { useState, useEffect } from "react";
import { Toggle } from "rsuite";
import {
  changeSelectedBook,
  changeSelectedChapter,
  toggleChapterState,
} from "../../../../../../state/redux/features/bookSlice";
import { LM_Book } from "../../../../../../types/Book/book";
import useAppSelector from "../../../../../../hooks/useAppSelector";
import useAppDispatch from "../../../../../../hooks/useAppDispatch";
import LM_Chapter from "../../../../../../types/Book/chapter";
import Book from "../../../../../../storage/indexedDB/Book";

interface Props {
  chapter: LM_Chapter;
}

/**
 * Handles whether the chapter is shown as read or not
 * @param props
 * @returns
 */
const ChapterState = ({ chapter }: Props) => {
  /*******************************/
  /************* STATE ***********/
  /*******************************/

  const dispatch = useAppDispatch();

  /*******************************/
  /********** FUNCTIONS **********/
  /*******************************/

  const handleChange = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const chapterCopy = JSON.parse(JSON.stringify(chapter));
    chapterCopy.read = !chapter.read;
    dispatch(
      toggleChapterState({
        bookId: chapter.book_id,
        chapterId: chapter.chapter_id,
      })
    );

    Book.updateChapter(chapterCopy);
  };

  useEffect(() => {}, [chapter]);

  return (
    <div className="lm-chapterstate-container" onClick={(e) => handleChange(e)}>
      <Toggle checked={chapter.read} checkedChildren="read" />
    </div>
  );
};

export default ChapterState;
