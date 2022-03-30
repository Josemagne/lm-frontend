import React from "react";
import TextContainer from "../../../../components/TextContainer/TextContainer";
import { Descendant, createEditor } from "slate";
import useAppDispatch from "../../../../../build/hooks/useAppDispatch";
import useAppSelector from "../../../../../build/hooks/useAppSelector";
import { useEffect, useMemo } from "react";
import { Editable, Slate, withReact } from "slate-react";
import LM_Chapter from "../../../../types/Book/chapter";
import { updateBook } from "../../../../state/redux/features/bookSlice";
import { LM_Flashcard } from "../../../../types/flashcards/flashcard";

type Props = {
  flashcard: LM_Flashcard;
};

const Question = ({ flashcard }: Props) => {
  const dispatch = useAppDispatch();
  const book = useAppSelector((state) => state.books.selectedBook.book);
  const chapter = useAppSelector(
    (state) => state.books.selectedChapter.chapter
  );

  function handleChange(v: Descendant[]) {
    const bookCopy = JSON.parse(JSON.stringify(book));
    const chapterCopy: LM_Chapter = JSON.parse(JSON.stringify(chapter));
    chapterCopy.flashcards[flashcard.flashcard_id].question = v;

    bookCopy.chapters[chapterCopy.chapter_id] = chapterCopy;

    dispatch(updateBook(bookCopy));
  }

  // @ts-ignore
  const editor = useMemo(() => withReact(createEditor()), []);

  useEffect(() => {}, [chapter, book, flashcard]);
  return (
    <div className="lm-question flashcard__entity">
      <Slate
        editor={editor}
        value={flashcard.question}
        onChange={(v) => handleChange(v)}
      >
        <Editable />
      </Slate>
    </div>
  );
};

export default Question;
