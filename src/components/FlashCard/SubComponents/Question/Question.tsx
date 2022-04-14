import React, { useMemo, useEffect, useRef, useState } from "react";
import useAppDispatch from "../../../../hooks/useAppDispatch";
import useAppSelector from "../../../../hooks/useAppSelector";
import {
  changeNewFlashcard,
  changeSelectedBook,
  changeSelectedChapter,
  changeSelectedFlashCard,
} from "../../../../state/redux/features/bookSlice";
import ReactQuill from "react-quill";

type Props = {
  /**
   * Decides if the question is from selectedFlashcard or newFlashcard
   */
  isNew: boolean;
};

const Question = ({ isNew }: Props) => {
  const [value, setValue] = useState<string>("");
  const editorRef = useRef(null);
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
      selectedFlashcard.question = v;
      dispatch(changeSelectedFlashCard(selectedFlashcardCopy));
    } else {
      const newFlashcardCopy = JSON.parse(JSON.stringify(newFlashcard));
      newFlashcardCopy.question = v;
      dispatch(changeNewFlashcard(newFlashcardCopy));
    }
  };

  useEffect(() => {
    // When a new flashcard was added
    if (actualFlashcard.question === "" && value.length > 1)
      setValue(actualFlashcard.question as string);
    if (actualFlashcard.question) setValue(actualFlashcard.question);
  }, [actualFlashcard]);

  return (
    <div className="lm-gc-flashcard__question">
      <div className="question__title">
        <h4>Question</h4>
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

export default Question;
