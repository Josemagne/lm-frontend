import { useEffect } from "react";

import Flashcard from "../../classes/Flashcard";
import {
  changeNewFlashcard,
  changeSelectedBook,
  changeSelectedChapter,
} from "../../state/redux/features/bookSlice";
import Book from "../../storage/indexedDB/Book";
import { LM_Book } from "../../types/Book/book";
import Answer from "../FlashCard/SubComponents/Answer/Answer";
import Question from "../FlashCard/SubComponents/Question/Question";
import LM_Chapter from "../../types/Book/chapter";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

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
  async function submitHandler() {
    const chapterCopy: LM_Chapter = JSON.parse(JSON.stringify(selectedChapter));

    // @ts-ignore
    chapterCopy.flashcards[newFlashcard.flashcard_id] = newFlashcard;

    const bookCopy: LM_Book = JSON.parse(JSON.stringify(selectedBook));

    // @ts-ignore
    bookCopy.chapters[chapterCopy.chapter_id] = chapterCopy;

    // Add a new Flashcard
    const flashcard = new Flashcard();
    dispatch(changeNewFlashcard(flashcard));
    dispatch(changeSelectedBook({ book: bookCopy, book_id: bookCopy.book_id }));

    // indexedDB
    await Book.addFlashcard(
      bookCopy.book_id,
      selectedChapter.chapter_id,
      newFlashcard
    );

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
            <button>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardAdder;
