import { useEffect } from "react";
import useAppDispatch from "../../../build/hooks/useAppDispatch";
import useAppSelector from "../../../build/hooks/useAppSelector";
import { LM_Book } from "../../types/Book/book";
import Answer from "../FlashCard/SubComponents/Answer/Answer";
import Question from "../FlashCard/SubComponents/Question/Question";

type Props = {};

/**
 * Adds a flashcard to a chapter
 * @param props
 * @returns
 */
const FlashcardAdder = (props: Props) => {
  const dispatch = useAppDispatch();

  const selectedBook = useAppSelector((state) => state.books.selectedBook.book);
  const selectedChapter = useAppSelector(
    (state) => state.books.selectedChapter.chapter
  );
  const newFlashcard = useAppSelector(
    (state) => state.books.selectedChapter.newFlashcard
  );

  /**
   * Changes the book with the new flashcard
   */
  function submitHandler() {
    const bookCopy: LM_Book = JSON.parse(JSON.stringify(selectedBook));
    bookCopy.chapters[selectedChapter.chapter_id].flashcards[
      newFlashcard.flashcard_id
    ] = newFlashcard;
  }

  useEffect(() => {}, [newFlashcard]);

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
            <button>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardAdder;
