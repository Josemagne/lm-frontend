import { useEffect, useState } from "react";
import Answer from "./SubComponents/Answer/Answer";
import { Panel } from "rsuite";
import QuestionAdder from "./SubComponents/Question/QuestionAdder";
import useAppSelector from "../../hooks/useAppSelector";
import Flashcard from "../../classes/Flashcard";
import { changeSelectedFlashCard } from "../../state/redux/features/bookSlice";
import useAppDispatch from "../../hooks/useAppDispatch";

type Props = {};

const FlashcardsAdder = (props: Props) => {
  const dispatch = useAppDispatch();
  const [width, setWidth] = useState<number>(0);

  window.addEventListener("resize", () => {
    setWidth(global.window.innerWidth);
  });

  const selectedFlashcard = useAppSelector(
    (state) => state.books.selectedChapter.selectedFlashcard
  );

  useEffect(() => {
    setWidth(global.window.innerWidth);
  }, []);

  useEffect(() => {}, [width]);
  useEffect(() => {
    //   NOTE We add a new flashcard that we will add

    const newFlashcard = new Flashcard();
    dispatch(changeSelectedFlashCard(newFlashcard));
  }, []);
  return (
    <div className="lm-flashcards">
      <div className="container">
        <div className="row">
          <div className="col">
            <QuestionAdder />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsAdder;
