import React from "react";
import { useEffect } from "react";
import useAppSelector from "../../../../../../hooks/useAppSelector";
import { Card, Tab, Container, Table } from "react-bootstrap";
import { LM_Flashcard } from "../../../../../../types/flashcards/flashcard";
import useAppDispatch from "../../../../../../hooks/useAppDispatch";
import { Node, Descendant } from "slate";
import ChapterFlashcardQuestion from "./SubComponents/ChapterFlashcard/SubComponents/ChapterFlashcardQuestion/ChapterFlashcardQuestion";
import ChapterFlashcardAnswer from "./SubComponents/ChapterFlashcard/SubComponents/ChapterFlashcardAnswer/ChapterFlashcardAnswer";
import { changeSelectedFlashCard } from "../../../../../../state/redux/features/bookSlice";
import ChapterFlashcard from "./SubComponents/ChapterFlashcard/ChapterFlashcard";
import FlashcardAdder from "../../../../../../components/FlashcardAdder/FlashcardAdder";

type Props = {};

/**
 * Handles the flashcards in the Modal
 * @param props
 * @returns
 */
const ChapterFlashcards = (props: Props) => {
  const dispatch = useAppDispatch();

  const book = useAppSelector((state) => state.books.selectedBook.book);
  const chapter = useAppSelector(
    (state) => state.books.selectedChapter.chapter
  );

  /**
   * Sets the selectedFlashcard
   * @param flashcard_id
   */
  const clickHandler = (flashcard_id: string) => {
    const selectedFlashcard = chapter.flashcards[flashcard_id];
    dispatch(changeSelectedFlashCard(selectedFlashcard));
  };

  useEffect(() => {
    console.log("v: ", chapter.flashcards);
  }, [chapter]);
  return (
    <div className="lm-chaptermodifier__flashcards mt-3">
      <div className="container">
        <h3>Flashcards</h3>
        <FlashcardAdder />
        {Object.values(chapter.flashcards as LM_Flashcard[]).map(
          (flashcard) => {
            return (
              <div className="row">
                <ChapterFlashcard
                  clickHandler={clickHandler}
                  flashcard={flashcard}
                />
              </div>
            );
          }
        )}
      </div>

      <div className="lm-chaptermodifier__flashcards__question"></div>
      <div className="lm-chaptermodifier__flashcards__answer"></div>
    </div>
  );
};

export default ChapterFlashcards;
