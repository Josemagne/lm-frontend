import { useEffect } from "react";

import Flashcard from "../../classes/base/Flashcard";
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
import ChapterFlashcard from "../../classes/ChapterFlashcard";
import { nanoid } from "nanoid";
import Server from "../../services/Server";
import BookFlashcard from "../../classes/BookFlashcard";

type Props = {
  /**
   * Decides if the flashcard will be added to a book. If false then it will be added to a chapter
   */
  forBook: boolean;
};

/**
 * Adds a flashcard to a chapter or to a book
 * @param props
 * @returns
 */
const FlashcardAdder = ({ forBook }: Props) => {
  const dispatch = useAppDispatch();

  let selectedBook: null | LM_Book;
  try {
    selectedBook = useAppSelector((state) => state.books.selectedBook.book);
  } catch (err) {
    selectedBook = null;
  }

  let selectedChapter: LM_Chapter | null;
  try {
    selectedChapter = useAppSelector(
      (state) => state.books.selectedChapter.chapter
    );
  } catch (err) {
    selectedChapter = null;
  }

  const newFlashcard = useAppSelector(
    (state) => state.books.selectedChapter.newFlashcard
  );

  /**
   * Changes the book with the new flashcard
   */
  async function submitHandler() {
    // Add flashcard to a book
    if (forBook) {
      if (!selectedBook) return;
      const newBookFlashcard = new BookFlashcard(
        selectedBook.book_id,
        newFlashcard.flashcard_id,
        newFlashcard.flashcard_id
      );
    }

    // Add flashcard to a chapter
    else {
      if (!selectedChapter || !selectedBook) return;
      const flashcard = new Flashcard(
        nanoid(),
        newFlashcard.question,
        newFlashcard.answer
      );
      const newChapterFlashcard = new ChapterFlashcard(
        selectedBook.book_id,
        selectedChapter.chapter_id,
        flashcard
      );
    }
    const chapterCopy: LM_Chapter = JSON.parse(JSON.stringify(selectedChapter));

    // @ts-ignore
    chapterCopy.flashcards[newFlashcard.flashcard_id] = newFlashcard;

    const bookCopy: LM_Book = JSON.parse(JSON.stringify(selectedBook));

    // @ts-ignore
    bookCopy.chapters[chapterCopy.chapter_id] = chapterCopy;

    // Add a new Flashcard
    const freshFlashcard = new Flashcard();
    dispatch(changeNewFlashcard(freshFlashcard));
    dispatch(changeSelectedBook({ book: bookCopy, book_id: bookCopy.book_id }));

    // indexedDB
    await Book.addFlashcard(
      bookCopy.book_id,
      selectedChapter.chapter_id,
      newFlashcard
    );

    await Book.add;

    // TODO server
    Server.addBookFlashcard();
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
