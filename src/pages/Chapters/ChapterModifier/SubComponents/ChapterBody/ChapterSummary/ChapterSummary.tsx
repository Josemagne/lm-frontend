import React, { useMemo, useState } from "react";
import { LM_Book } from "../../../../../../types/Book/book";
import { useEffect } from "react";
import LM_Chapter from "../../../../../../types/Book/chapter";
import { Editable, Slate, withReact } from "slate-react";
import { Descendant, createEditor } from "slate";
import {
  changeChapterSummary,
  changeSelectedBook,
} from "../../../../../../state/redux/features/bookSlice";
import useAppSelector from "../../../../../../hooks/useAppSelector";
import useAppDispatch from "../../../../../../hooks/useAppDispatch";
import { Card, Container } from "react-bootstrap";

type Props = {
  changeHandler: (book: LM_Book) => void;
  entity: any;
  chapterIndex: number;
  chapterId: string;
};

const ChapterSummary = ({
  changeHandler,
  entity,
  chapterId,
  chapterIndex,
}: Props) => {
  const [value, setValue] = useState<Descendant[]>();
  const dispatch = useAppDispatch();
  // @ts-ignore
  const editor = useMemo(() => withReact(createEditor()), []);

  const chapter = useAppSelector(
    (state) => state.books.selectedChapter.chapter
  );

  const book = useAppSelector((state) => state.books.selectedBook.book);

  const handleChange = (v: Descendant[]) => {
    const bookCopy: LM_Book = JSON.parse(JSON.stringify(book));
    bookCopy.chapters[chapter.chapter_id].summary = v;
    dispatch(changeSelectedBook({ book: bookCopy, book_id: bookCopy.book_id }));
  };

  useEffect(() => {}, [chapter.summary]);
  return (
    <div className="lm-chaptermodifier__summary">
      <Container>
        <Card>
          <Card.Header>Summary</Card.Header>
          <Card.Body>
            <div className="lm-textcontainer">
              {/* @ts-ignore */}
              {chapter ? (
                <Slate
                  editor={editor}
                  value={chapter.summary}
                  onChange={(v) => handleChange(v)}
                >
                  <Editable />
                </Slate>
              ) : null}
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ChapterSummary;
