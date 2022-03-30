import { Descendant, createEditor } from "slate";
import { useEffect, useMemo } from "react";
import { Editable, Slate, withReact } from "slate-react";
import LM_Chapter from "../../../../types/Book/chapter";
import {
  changeSelectedFlashCard,
  updateBook,
} from "../../../../state/redux/features/bookSlice";
import { LM_Flashcard } from "../../../../types/flashcards/flashcard";
import Flashcard from "../../../../classes/Flashcard";
import useAppSelector from "../../../../hooks/useAppSelector";
import useAppDispatch from "../../../../hooks/useAppDispatch";

type Props = {};

const QuestionAdder = ({}: Props) => {
  const dispatch = useAppDispatch();
  const book = useAppSelector((state) => state.books.selectedBook.book);
  const chapter = useAppSelector(
    (state) => state.books.selectedChapter.chapter
  );

  const selectedFlashcard = useAppSelector(
    (state) => state.books.selectedChapter.selectedFlashcard
  );

  // @ts-ignore
  const editor = useMemo(() => withReact(createEditor()), []);

  function handleChange(v: Descendant[]) {
    const selectedFlashcardCopy = JSON.parse(JSON.stringify(selectedFlashcard));
    dispatch(changeSelectedFlashCard(selectedFlashcardCopy));
  }

  useEffect(() => {}, [chapter, book, selectedFlashcard]);

  return (
    <div className="lm-question flashcard__entity">
      <Slate
        editor={editor}
        value={[{ children: [{ text: "" }] }]}
        onChange={(v) => handleChange(v)}
      >
        <Editable />
      </Slate>
    </div>
  );
};

export default QuestionAdder;
