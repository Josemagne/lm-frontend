import { useState, useEffect } from "react";
import { Toggle } from "rsuite";
import useAppSelector from "../../../../../../../build/hooks/useAppSelector";
import useAppDispatch from "../../../../../../../build/hooks/useAppDispatch";
import { changeSelectedBook } from "../../../../../../state/redux/features/bookSlice";
import LM_Book from "../../../../../../classes/LM_Book";

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

  const book = useAppSelector(
    (state) => state.books.selectedChapter.chapter.read
  );

  /*******************************/
  /********** FUNCTIONS **********/
  /*******************************/

  const handleChange = () => {
    book.read = !book.read;
    changeHandler(book);
  };

  useEffect(() => {}, [book]);

  return (
    <div className="lm-chapterstate-container">
      <Toggle
        checked={book.read}
        checkedChildren="to read"
        onChange={() => handleChange()}
      />
    </div>
  );
};

export default ChapterState;
