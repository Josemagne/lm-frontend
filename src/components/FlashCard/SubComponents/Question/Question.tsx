import React from "react";

import { useMemo, useEffect } from "react";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor, Descendant } from "slate";
import useAppDispatch from "../../../../hooks/useAppDispatch";
import useAppSelector from "../../../../hooks/useAppSelector";

type Props = {};

const Question = (props: Props) => {
  const dispatch = useAppDispatch();

  const book = useAppSelector((state) => state.books.selectedBook.book);
  const chapter = useAppSelector(
    (state) => state.books.selectedChapter.chapter
  );

  // @ts-ignore
  const editor = useMemo(() => withReact(createEditor()), []);

  const handleChange = (v: Descendant[]) => {
    const bookCopy = JSON.parse(JSON.stringify(book));
    bookCopy.chapters[chapter.chapter_id].flashcards;
    dispatch;
  };

  useEffect(() => {}, []);

  return (
    <div className="lm-flashcard__question">
      <Slate
        editor={editor}
        value={chapter.summary}
        onChange={(v) => handleChange(v)}
      >
        <Editable />
      </Slate>
    </div>
  );
};

export default Question;
