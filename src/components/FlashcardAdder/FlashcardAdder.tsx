import { useEffect } from "react";

import Flashcard from "../../classes/base/Flashcard";
import {
  changeSelectedBook,
} from "../../state/redux/features/bookSlice";
import { LM_Book } from "../../types/Book/book";
import Answer from "../FlashCard/SubComponents/Answer/Answer";
import Question from "../FlashCard/SubComponents/Question/Question";
import LM_Chapter from "../../types/Book/chapter";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { nanoid } from "nanoid";
import { LM_EntityName } from "../../types/Entity/entity";
import API from "../../api/API"
import {changeNewFlashcard, addFlashcard} from "../../state/redux/features/Flashcard/flashcardSlice"

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
    (state) => state.flashcards.newFlashcard
  );

  const selectedBook = useAppSelector((state) => state.books.selectedBook)

  /**
   * Changes the book with the new flashcard
   */
  async function submitHandler() {
    await API.addFlashcard(newFlashcard)
    let flashcardCopy = JSON.parse(JSON.stringify(newFlashcard))
    flashcardCopy.flashcardType = type;
    dispatch(addFlashcard(flashcardCopy))
    dispatch(changeNewFlashcard(new Flashcard(nanoid(), "BOOK", "", "", selectedBook.book_id)))
  }

  useEffect(() => {
    console.log("newFlashcard: ", newFlashcard);
  }, [newFlashcard]);

  return (
    <div className="lm-gc-flashcardadder">
      <div className="container">
          <div className="lm-gc-flashcardadder__question">
            <Question isNew={true} />
          </div>
          <div className="lm-gc-flashcardadder__answer">
            <Answer isNew={true} />
          </div>
          <div className="lm-gc-flashcardadder__button" onClick={submitHandler}>
            <button className="btn btn-primary">+</button>
          </div>
      </div>
      {/*Shows the last 3 flashcards that were added from lg and onward */}
      <div className="lm-gc-flashcardadder__preview">
      </div>
    </div>
  );
};

export default FlashcardAdder;
