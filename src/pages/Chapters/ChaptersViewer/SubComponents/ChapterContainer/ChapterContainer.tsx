import LM_Chapter from "../../../../../types/Book/chapter";

type Props = {
  chapter: LM_Chapter;
};

const ChapterContainer = ({ chapter }: Props) => {
  return <div className="lm-chaptercontainer"></div>;
};

export default ChapterContainer;
