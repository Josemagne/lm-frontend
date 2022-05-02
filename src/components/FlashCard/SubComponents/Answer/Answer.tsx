import React, { useRef, useMemo, useEffect, useState } from "react";
import useAppDispatch from "../../../../hooks/useAppDispatch";
import useAppSelector from "../../../../hooks/useAppSelector";
import {
  changeSelectedBook,
} from "../../../../state/redux/features/bookSlice";
import {changeNewFlashcard, changeSelectedFlashcard} from "../../../../state/redux/features/Flashcard/flashcardSlice"
import ReactQuill from "react-quill";

type Props = {
  /**
   * Decides if the question is from selectedFlashcard or newFlashcard
   */
  isNew: boolean;
};

const Answer = ({ isNew }: Props) => {
  const [value, setValue] = useState<string>("");
  const editorRef = useRef(null);
  const dispatch = useAppDispatch();

  const book = useAppSelector((state) => state.books.selectedBook);
  const chapter = useAppSelector(
    (state) => state.chapters.selectedChapter
  );

  /* We use the component Question to change either selectedFlashcard or newFlashcard */

  const newFlashcard = useAppSelector(
    (state) => state.flashcards.newFlashcard
  );

  const selectedFlashcard = useAppSelector(
    (state) => state.flashcards.selectedFlashcard
  );

  const actualFlashcard = isNew ? newFlashcard : selectedFlashcard;

  /**
   * Either changes newFlashcard or selectedFlashcard
   * @param v
   */
  const handleChange = (v: string) => {
    setValue(v);

    if (!isNew) {
      const selectedFlashcardCopy = JSON.parse(
        JSON.stringify(selectedFlashcard)
      );
      selectedFlashcard.answer = v;
      dispatch(changeSelectedFlashcard(selectedFlashcardCopy));
    } else {
      const newFlashcardCopy = JSON.parse(JSON.stringify(newFlashcard));
      newFlashcardCopy.answer = v;
      dispatch(changeNewFlashcard(newFlashcardCopy));
    }
  };

  useEffect(() => {
    // When a new flashcard was added
    if (actualFlashcard.answer === "" && value.length > 1)
      setValue(actualFlashcard.answer as string);
    if (actualFlashcard.answer) setValue(actualFlashcard.answer);
  }, [actualFlashcard]);

  return (
    <div className="lm-gc-flashcard__question">
      <div className="answer__title">
        <h4>Answer</h4>
      </div>
      <ReactQuill
        modules={{ toolbar: false }}
        ref={editorRef}
        // defaultValue={""}
        value={value}
        onChange={(v) => handleChange(v)}
      />
    </div>
  );
};

export default Answer;
