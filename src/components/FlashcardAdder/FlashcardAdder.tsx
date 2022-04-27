import { useEffect } from "react";

import Flashcard from "../../classes/base/Flashcard";
import {
  changeNewFlashcard,
  changeSelectedBook,
  changeSelectedChapter,
} from "../../state/redux/features/bookSlice";
import { LM_Book } from "../../types/Book/book";
import Answer from "../FlashCard/SubComponents/Answer/Answer";
import Question from "../FlashCard/SubComponents/Question/Question";
import LM_Chapter from "../../types/Book/chapter";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { nanoid } from "nanoid";
import Server from "../../services/Server";
import FAPI from "../../storage/indexedDB/FAPI";
import LM_Entity, { LM_EntityName } from "../../types/Entity/entity";

type Props = {
  type: LM_EntityName;
};

/**
 * Adds a flashcard to a chapter or to a book
 * @param props
 * @returns
 */
const FlashcardAdder = ({ type }: Props) => {
  const dispatch = useAppDispatch();
  const newFlashcard = useAppSelector(
    (state) => state.books.selectedChapter.newFlashcard
  );

  /**
   * Changes the book with the new flashcard
   */
  async function submitHandler() {
    // indexedDB
    // await FAPI.addFlashcard();
    // TODO server
  }

  useEffect(() => {
    console.log("newFlashcard: ", newFlashcard);
  }, [newFlashcard]);

  return (
    <div className="lm-gc-flashcardadder">
      <div className="container">
        <div className="row">
          <div className="lm-gc-flashcardadder__question col-md-6">
            <Question isNew={true} />
          </div>
          <div className="lm-gc-flashcardadder__answer col-md-6">
            <Answer isNew={true} />
          </div>
          <div className="lm-gc-flashcardadder__button" onClick={submitHandler}>
            <button className="btn btn-primary">+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardAdder;
