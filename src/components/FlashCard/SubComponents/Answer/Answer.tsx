import React, { useMemo, useEffect } from "react";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor, Descendant } from "slate";
import useAppDispatch from "../../../../hooks/useAppDispatch";
import useAppSelector from "../../../../hooks/useAppSelector";
import {
  changeNewFlashcard,
  changeSelectedFlashCard,
} from "../../../../state/redux/features/bookSlice";

type Props = {
  /**
   * Decides if the question is from selectedFlashcard or newFlashcard
   */
  isNew: boolean;
};

const Answer = ({ isNew }: Props) => {
  const dispatch = useAppDispatch();

  const book = useAppSelector((state) => state.books.selectedBook.book);
  const chapter = useAppSelector(
    (state) => state.books.selectedChapter.chapter
  );

  /* We use the component Question to change either selectedFlashcard or newFlashcard */

  const newFlashcard = useAppSelector(
    (state) => state.books.selectedChapter.newFlashcard
  );

  const selectedFlashcard = useAppSelector(
    (state) => state.books.selectedChapter.selectedFlashcard
  );

  // @ts-ignore
  const editor = useMemo(() => withReact(createEditor()), []);

  /**
   * Either changes newFlashcard or selectedFlashcard
   * @param v
   */
  const handleChange = (v: Descendant[]) => {
    const bookCopy = JSON.parse(JSON.stringify(book));
    bookCopy.chapters[chapter.chapter_id].flashcards[
      newFlashcard.flashcard_id
    ].answer = v;
    if (!isNew) {
      const selectedFlashcardCopy = JSON.parse(
        JSON.stringify(selectedFlashcard)
      );
      selectedFlashcard.answer = v;
      dispatch(changeSelectedFlashCard(selectedFlashcardCopy));
    } else {
      const newFlashcardCopy = JSON.parse(JSON.stringify(newFlashcard));
      newFlashcardCopy.answer = v;
      dispatch(changeNewFlashcard(newFlashcardCopy));
    }
  };

  useEffect(() => {}, [isNew ? newFlashcard : selectedFlashcard]);

  return (
    <div className="lm-gc-flashcard__question">
      <Slate
        editor={editor}
        value={isNew ? newFlashcard.answer : selectedFlashcard.answer}
        onChange={(v) => handleChange(v)}
      >
        <Editable />
      </Slate>
    </div>
  );
};

export default Answer;
