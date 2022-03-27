import TextContainer from "../../../../../../components/TextContainer/TextContainer";
import { LM_Book } from "../../../../../../types/Book/book";
import useAppSelector from "../../../../../../../build/hooks/useAppSelector";
import { useEffect } from "react";
import LM_Chapter from "../../../../../../types/Book/chapter";

type Props = {
  changeHandler: (book: LM_Book) => void;
  entity: any;
  chapterIndex: number;
  chapterId: string;
};

// TODO
const findIDOfChapterInArray = (arr: LM_Chapter[], chapterId: string) => {
  let index = 0;
  arr.find((ch, i) => {
    if (ch.chapter_id === chapterId) index = i;
    return true;
  });

  return index;
};

const ChapterSummary = ({
  changeHandler,
  entity,
  chapterId,
  chapterIndex,
}: Props) => {
  const chapter = useAppSelector(
    (state) => state.books.selectedChapter.chapter
  );

  console.log("chaptersummary-->chapterId", chapterId, chapter.chapter_id);

  useEffect(() => {}, [chapter]);
  return (
    <div className="lm-chaptermodifier__summary">
      {chapter && entity ? (
        <TextContainer
          action="AddSummaryToBook"
          changeHandler={changeHandler}
          entity={entity}
          chapterId={chapter.chapter_id}
          chapterIndex={chapterIndex}
          name="chaptersummary"
          content={chapter.summary}
        />
      ) : null}
    </div>
  );
};

export default ChapterSummary;
