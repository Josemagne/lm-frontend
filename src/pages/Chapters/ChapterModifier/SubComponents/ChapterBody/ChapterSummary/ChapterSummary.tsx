import React, { useMemo, useState, useRef } from "react";
import { LM_Book } from "../../../../../../types/Book/book";
import { useEffect } from "react";
import LM_Chapter from "../../../../../../types/Book/chapter";
import { Descendant, createEditor } from "slate";
import {
  changeChapterSummary,
  changeSelectedBook,
  changeSelectedChapter,
} from "../../../../../../state/redux/features/bookSlice";
import useAppSelector from "../../../../../../hooks/useAppSelector";
import useAppDispatch from "../../../../../../hooks/useAppDispatch";
import { Card, Container } from "react-bootstrap";
import ReactQuill from "react-quill";

type Props = {};

/**
 * Handles the summary for the chapter
 * @param param0
 * @returns
 */
const ChapterSummary = ({}: Props) => {
  // Decides if we open the summarymodifier to the fullest
  const [open, setOpen] = useState<boolean>(false);

  const editorRef = useRef(null);
  const [value, setValue] = useState<string>("");
  const dispatch = useAppDispatch();
  // @ts-ignore

  const chapter = useAppSelector(
    (state) => state.books.selectedChapter.chapter
  );

  const book = useAppSelector((state) => state.books.selectedBook.book);

  const handleChange = (v: string) => {
    setValue(v);
    const bookCopy: LM_Book = JSON.parse(JSON.stringify(book));
    const chapterCopy: LM_Chapter = JSON.parse(JSON.stringify(chapter));
    chapterCopy.summary = v;
    // @ts-ignore
    bookCopy.chapters[chapter.chapter_id].summary = v;
    dispatch(changeSelectedBook({ book: bookCopy, book_id: bookCopy.book_id }));
    dispatch(
      changeSelectedChapter({
        chapter_id: chapter.chapter_id,
        chapter: chapterCopy,
      })
    );
  };

  const openSummary = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setValue(chapter.summary);
    console.log("chapter.summary:", chapter.summary);
    console.log("value: ", value);
  }, [chapter.summary]);

  useEffect(() => {}, []);

  return (
    <div
      className={
        open
          ? "lm-chaptermodifier__summary open"
          : "lm-chaptermodifier__summary"
      }
    >
      <Container
        onClick={() => {
          // @ts-ignore
          editorRef.current.focus();
        }}
      >
        <Card>
          <Card.Title className="title">Summary</Card.Title>
          <div className="lm-textcontainer">
            <ReactQuill
              ref={editorRef}
              defaultValue={chapter.summary}
              value={value}
              onChange={(v) => handleChange(v)}
            />
          </div>
        </Card>
        {/* NOTE If we click on it then we show the full summary */}
      </Container>
    </div>
  );
};

export default ChapterSummary;
