import { useState, useEffect } from "react";
import { Toggle } from "rsuite";
import { changeSelectedBook } from "../../../../../../state/redux/features/bookSlice";
import { LM_Book } from "../../../../../../types/Book/book";
import useAppSelector from "../../../../../../hooks/useAppSelector";
import useAppDispatch from "../../../../../../hooks/useAppDispatch";

interface Props {
  changeHandler: (newBook: LM_Book) => void;
}

/**
 * Handles whether the chapter is shown as read or not
 * @param props
 * @returns
 */
const ChapterState = ({ changeHandler }: Props) => {
  /*******************************/
  /************* STATE ***********/
  /*******************************/

  const dispatch = useAppDispatch();

  const chapter = useAppSelector(
    // @ts-ignore
    (state) => state.books.selectedChapter.chapter
  );

  /*******************************/
  /********** FUNCTIONS **********/
  /*******************************/

  const handleChange = () => {
    const chapterCopy = JSON.parse(JSON.stringify(chapter));
    chapterCopy.read = !chapter.read;
    chapter.read = !chapter.read;
    changeHandler(chapter);
  };

  useEffect(() => {}, [chapter]);

  return (
    <div className="lm-chapterstate-container">
      <Toggle
        checked={chapter.read}
        checkedChildren="to read"
        onChange={() => handleChange()}
      />
    </div>
  );
};

export default ChapterState;
