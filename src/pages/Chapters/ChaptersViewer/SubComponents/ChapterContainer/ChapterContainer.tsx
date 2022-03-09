import LM_Chapter from "../../../../../types/Book/chapter";

type Props = {
  chapter: LM_Chapter;
};
/**
 * Contains the metadata about the chapter
 */
const ChapterContainer = ({ chapter }: Props) => {
  return <div className="lm-chaptercontainer"></div>;
};

export default ChapterContainer;
