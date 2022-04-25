import { useEffect } from "react";
import LM_Chapter from "../../../../../types/Book/chapter";
import useAppDispatch from "../../../../../hooks/useAppDispatch";
import Server from "../../../../../services/Server";
import {
  changeSelectedChapter,
  deleteChapter,
  toggleChapterModifierModal,
} from "../../../../../state/redux/features/bookSlice";
import ChapterState from "../../../ChapterModifier/SubComponents/ChapterHeader/ChapterState/ChapterState";
import FAPI from "../../../../../storage/indexedDB/FAPI";
import API from "../../../../../api/API";

type Props = {
  chapter: LM_Chapter;
  book_id: string;
};

/**
 * Contains the metadata about the chapter
 */
const ChapterContainer = ({ chapter, book_id }: Props) => {
  // const navigate = useNavigate();

  const dispatch = useAppDispatch();

  /**
   * Navigates the user to ChapterModifier
   *
   */
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
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

    dispatch(
      deleteChapter({ chapter_id: chapter.chapter_id, book_id: book_id })
    );

    await FAPI.deleteChapter(chapter.chapter_id);

    await API.deleteChapter(chapter.chapter_id);
  };

  useEffect(() => {}, [chapter]);

  return (
    <div className="lm-chaptercontainer" onClick={(e) => handleClick(e)}>
      <div className="lm-chaptercontainer__state">
        <ChapterState chapter={chapter} />
      </div>
      <div className="lm-chaptercontainer__index">
        <p>{chapter.index}</p>
      </div>
      <div className="lm-chaptercontainer__seperator">
        <p>-</p>
      </div>
      <div className="lm-chaptercontainer__title">
        <p>{chapter.title}</p>
      </div>
      {/* TODO */}
      <div className="lm-deletebutton" onClick={(e) => removeChapter(e)}>
        <button>x</button>
      </div>
    </div>
  );
};

export default ChapterContainer;
