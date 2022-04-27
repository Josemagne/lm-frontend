import React from "react";
import { useEffect } from "react";
import useAppSelector from "../../../../../../hooks/useAppSelector";
import LM_Flashcard  from "../../../../../../types/Flashcard/flashcard";
import useAppDispatch from "../../../../../../hooks/useAppDispatch";
import { changeSelectedFlashCard } from "../../../../../../state/redux/features/bookSlice";
import FlashcardAdder from "../../../../../../components/FlashcardAdder/FlashcardAdder";

type Props = {};

/**
 * Handles the flashcards in the Modal
 * @param props
 * @returns
 */
const ChapterFlashcards = (props: Props) => {
  const dispatch = useAppDispatch();

  const selectedChapter = useAppSelector(
    (state) => state.chapters.selectedChapter
  );


  return (
    <div className="lm-chaptermodifier__flashcards mt-3">
      <div className="container">
        <h3>Flashcards</h3>
        <FlashcardAdder type={"CHAPTER"} />
      </div>

       <div className="lm-chaptermodifier__flashcards__question"></div>
      <div className="lm-chaptermodifier__flashcards__answer"></div> 
    </div>
  );
};

export default ChapterFlashcards;
