import { useEffect } from "react";
import LM_Chapter from "../../../../../types/Book/chapter";
import Book from "../../../../../storage/indexedDB/Book";
import useAppDispatch from "../../../../../hooks/useAppDispatch";
import Server from "../../../../../services/Server";
import {
  changeSelectedChapter,
  deleteChapter,
  toggleChapterModifierModal,
} from "../../../../../state/redux/features/bookSlice";

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
  // const navigate = useNavigate();

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
    dispatch(toggleChapterModifierModal(""));
    console.log("clicked");
  };

  const removeChapter = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    // redux
    dispatch(
      deleteChapter({ chapter_id: chapter.chapter_id, book_id: book_id })
    );

    // indexedDB
    await Book.removeChapter(chapter.chapter_id, book_id);

    // Server
    // TODO
    // Server.re
  };

  useEffect(() => {}, [chapter]);

  return (
    <div className="lm-chaptercontainer" onClick={handleClick}>
      <p>{chapter.title}</p>
      {/* TODO */}
      <div className="lm-deletebutton" onClick={(e) => removeChapter(e)}>
        <button>x</button>
      </div>
    </div>
  );
};

export default ChapterContainer;
