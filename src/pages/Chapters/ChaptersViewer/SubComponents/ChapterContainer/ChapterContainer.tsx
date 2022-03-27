import { useEffect } from "react";
import LM_Chapter from "../../../../../types/Book/chapter";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate } from "react-router";
import Book from "../../../../../storage/indexedDB/Book";
import useAppDispatch from "../../../../../hooks/useAppDispatch";
import { changeSelectedChapter } from "../../../../../state/redux/features/bookSlice";

type Props = {
  chapter: LM_Chapter;
  book_id: string;
};

/**
 * Contains the metadata about the chapter
 */
const ChapterContainer = ({ chapter, book_id }: Props) => {
  /**
   * Lets us navigate to another URL
   */
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  /**
   * Navigates the user to ChapterModifier
   *
   */
  const handleClick = () => {
    dispatch(
      changeSelectedChapter({
        chapter: chapter,
        chapter_id: chapter.chapter_id,
      })
    );
    navigate(`/chaptermodifier/${book_id}/${chapter.chapter_id}`, {
      replace: true,
    });
  };

  return (
    <div className="lm-chaptercontainer" onClick={handleClick}>
      <p>{chapter.title}</p>
      {/* TODO */}
      <div
        className="lm-deletebutton"
        onClick={() => Book.removeChapter(chapter.chapter_id, book_id)}
      >
        <button>x</button>
      </div>
    </div>
  );
};

export default ChapterContainer;
