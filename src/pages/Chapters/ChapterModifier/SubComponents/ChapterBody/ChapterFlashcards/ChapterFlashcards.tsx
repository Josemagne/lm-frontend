import React from "react";
import { useEffect } from "react";
import useAppSelector from "../../../../../../hooks/useAppSelector";
import Question from "../../../../../FlashCards/SubComponents/Question/Question";
import { Card, Tab, Container, Table } from "react-bootstrap";
import { LM_Flashcard } from "../../../../../../types/flashcards/flashcard";
import QuestionAdder from "../../../../../FlashCards/SubComponents/Question/QuestionAdder";
import FlashcardsAdder from "../../../../../FlashCards/FlashCardAdder";
import Answer from "../../../../../FlashCards/SubComponents/Answer/Answer";
import useAppDispatch from "../../../../../../hooks/useAppDispatch";

type Props = {};

const ChapterFlashcards = (props: Props) => {
  const dispatch = useAppDispatch();

  const book = useAppSelector((state) => state.books.selectedBook.book);
  const chapter = useAppSelector(
    (state) => state.books.selectedChapter.chapter
  );

  useEffect(() => {}, [chapter]);
  return (
    <div className="lm-chaptermodifier__flashcards">
      <div className="container">
        <FlashcardsAdder />
        {Object.values(chapter.flashcards as LM_Flashcard[]).map(
          (flashcard) => {
            return (
              <div className="row">
                <div className="col">
                  <Question flashcard={flashcard} />
                </div>
                <div className="col">{/* <Answer /> */}</div>
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
