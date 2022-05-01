import React, { useState, useEffect } from "react";
import { Pagination } from "rsuite";
import useAppSelector from "../../../../../hooks/useAppSelector";
import LM_Chapter from "../../../../../types/Book/chapter";
import ChapterContainer from "../ChapterContainer/ChapterContainer";
import {LM_Book} from "../../../../../types/Book/book"
import {fetchChaptersBackend, fetchChaptersFrontend} from "../../../../../state/redux/features/chapterSlice"

type Props = {};

const ChaptersPagination = (props: Props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentChapter, setCurrentChapter] = useState(1);

  const [chaptersPerPage, setChaptersPerPage] = useState(10);

  const chapters: LM_Chapter[] | null  = Object.values(
    useAppSelector((state) => state.chapters.chapters.chapters)
  );

  const selectedBook: LM_Book | null = useAppSelector((state) => state.books.selectedBook);

  const amountOfChapters = useAppSelector(
    (state) => state.chapters.chapters.amountOfChapters
  ) ?? 10;

  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });

  let indexOfLastChapter = 0;
  let indexOfFirstChapter = 0;
  if (chapters.length < 10) {
    indexOfLastChapter = chapters.length - 1;
    indexOfFirstChapter = 0;
  } else {
    indexOfFirstChapter = indexOfLastChapter - chaptersPerPage;
    indexOfLastChapter = currentChapter * chaptersPerPage;
  }

  // Once we have selected a book then we fetch its chapters
  useEffect(() => {
    console.log("cohapters paginagttio:", selectedBook)
    if (!selectedBook) return;
    fetchChaptersBackend(selectedBook.book_id)
    fetchChaptersFrontend(selectedBook.book_id)
  },[selectedBook])


  useEffect(() => {
    console.log("chapters::", chapters)
  }, [chapters])

  return (
    <div className="lm-lc-chapterspagination">
      <div className="chapterspagination__chapters">
        {chapters && chapters.length > 0 ? (
          chapters.map((chapter) => {
            return <ChapterContainer chapter={chapter} />;
          })
        ) : (
          <p>No chapters</p>
        )}
      </div>
      <div className="chapterspagination__rule">
        {windowWidth < 768 ? (
          <Pagination
            prev
            last
            next
            first
            size="sm"
            total={amountOfChapters}
            limit={10}
          />
        ) : (
          <Pagination
            prev
            last
            next
            first
            size="md"
            total={amountOfChapters}
            limit={10}
          />
        )}
      </div>
    </div>
  );
};

export default ChaptersPagination;
