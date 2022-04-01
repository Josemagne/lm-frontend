import React, { useEffect } from "react";
import { LM_Flashcard } from "../../../../../../../../types/flashcards/flashcard";
import useAppSelector from "../../../../../../../../../build/hooks/useAppSelector";
import Question from "../../../../../../../../components/FlashCard/SubComponents/Question/Question";
import Answer from "../../../../../../../../components/FlashCard/SubComponents/Answer/Answer";
import { Descendant, Node } from "slate";

type Props = {
  flashcard: LM_Flashcard;
  clickHandler: (flashcard_id: string) => void;
};

const ChapterFlashcard = ({ flashcard, clickHandler }: Props) => {
  const selectedFlashcard = useAppSelector(
    (state) => state.books.selectedChapter.selectedFlashcard
  );

  // TODO Move to utils
  const serialize = (nodes: Descendant[]) => {
    return nodes.map((n) => Node.string(n)).join("\n");
  };

  useEffect(() => {}, [selectedFlashcard]);

  return (
    <div
      className="lm-lc-chaptermodifier__chapterflashcards__chapterflashcard"
      onClick={() => clickHandler(flashcard.flashcard_id)}
    >
      {selectedFlashcard.flashcard_id === flashcard.flashcard_id ? (
        <div className="container">
          <div className="row">
            <div className="col-md-6 question">
              <Question isNew={false} />
            </div>
            <div className="col-md-6 answer">
              <Answer isNew={false} />
            </div>
          </div>
        </div>
      ) : (
        <div
          className="container"
          onClick={() => clickHandler(flashcard.flashcard_id)}
        >
          <div className="row">
            <div className="col-md-6 question">
              <p>{serialize(flashcard.question)}</p>
            </div>
            <div className="col-md-6 answer">
              <p>{serialize(flashcard.answer)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterFlashcard;
