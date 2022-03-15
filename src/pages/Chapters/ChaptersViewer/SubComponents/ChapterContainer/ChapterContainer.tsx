import LM_Chapter from "../../../../../types/Book/chapter";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate } from "react-router";
import Book from "../../../../../utils/Book";

type Props = {
  chapter: LM_Chapter;
  book_id: string;
};

/**
 * Contains the metadata about the chapter
 */
const ChapterContainer = ({ chapter, book_id }: Props) => {
  // useLiveQuery(() => {
  // })
  const navigate = useNavigate();

  /**
   * Navigates the user to ChapterModifier
   */
  const handleClick = () => {
    navigate(`chaptermodifier/${book_id}/${chapter.chapter_id}`);
  };

  return (
    <div className="lm-chaptercontainer" onClick={handleClick}>
      <p>{chapter.title}</p>
      {/* <p>{ chapter.}</p> */}
    </div>
  );
};

export default ChapterContainer;
