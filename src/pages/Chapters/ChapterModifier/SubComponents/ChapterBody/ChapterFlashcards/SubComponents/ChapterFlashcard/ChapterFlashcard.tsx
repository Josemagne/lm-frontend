import React, { useEffect } from "react";
import { LM_Flashcard } from "../../../../../../../../types/Flashcard/flashcard";
import Question from "../../../../../../../../components/FlashCard/SubComponents/Question/Question";
import Answer from "../../../../../../../../components/FlashCard/SubComponents/Answer/Answer";
import useAppSelector from "../../../../../../../../hooks/useAppSelector";

type Props = {
  flashcard: LM_Flashcard;
  clickHandler: (flashcard_id: string) => void;
};

const ChapterFlashcard = ({ flashcard, clickHandler }: Props) => {
  const selectedFlashcard = useAppSelector(
    (state) => state.books.selectedChapter.selectedFlashcard
  );

  useEffect(() => {}, [selectedFlashcard]);
  useEffect(() => {
    console.log(selectedFlashcard);
    console.log(flashcard);
  }, []);

  return (
    <div
      className="lm-lc-chaptermodifier__chapterflashcards__chapterflashcard"
      onClick={() => clickHandler(flashcard.flashcard_id)}
    >
      <div
        className="container"
        onClick={() => clickHandler(flashcard.flashcard_id)}
      >
        <div className="row">
          <div className="col-md-6 question">
            <p>{flashcard.question}</p>
          </div>
          <div className="col-md-6 answer">
            <p>{flashcard.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterFlashcard;
