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
import { updateChapter } from "../../../../../../state/redux/features/chapterSlice";
import FAPI from "../../../../../../storage/indexedDB/FAPI";

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
    const chapterCopy: LM_Chapter = JSON.parse(JSON.stringify(chapter));
    if (chapter.status === "TO_READ" || chapter.status === "READING") {
      chapterCopy.status = "READ";
    } else {
      chapterCopy.status = "TO_READ";
    }

    dispatch(updateChapter(chapterCopy));

    FAPI.updateChapter(chapterCopy);
  };

  useEffect(() => {}, [chapter]);

  return (
    <div className="lm-chapterstate-container" onClick={(e) => handleChange(e)}>
      <Toggle
        checked={chapter.status !== "READING" && chapter.status !== "TO_READ"}
        checkedChildren="read"
      />
    </div>
  );
};

export default ChapterState;
