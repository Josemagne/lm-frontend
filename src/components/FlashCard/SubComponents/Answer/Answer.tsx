import React, { useRef, useMemo, useEffect, useState } from "react";
import useAppDispatch from "../../../../hooks/useAppDispatch";
import useAppSelector from "../../../../hooks/useAppSelector";
import {
  changeNewFlashcard,
  changeSelectedBook,
  changeSelectedFlashCard,
} from "../../../../state/redux/features/bookSlice";
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
      selectedFlashcard.answer = v;
      dispatch(changeSelectedFlashCard(selectedFlashcardCopy));
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
