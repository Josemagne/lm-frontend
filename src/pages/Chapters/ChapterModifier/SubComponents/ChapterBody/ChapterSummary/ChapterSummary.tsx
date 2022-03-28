import TextContainer from "../../../../../../components/TextContainer/TextContainer";
import { useMemo } from "react";
import { LM_Book } from "../../../../../../types/Book/book";
import { useEffect } from "react";
import LM_Chapter from "../../../../../../types/Book/chapter";
import { Editable, Slate, withReact } from "slate-react";
import { Descendant, createEditor } from "slate";
import { changeChapterSummary } from "../../../../../../state/redux/features/bookSlice";
import useAppSelector from "../../../../../../hooks/useAppSelector";
import useAppDispatch from "../../../../../../hooks/useAppDispatch";

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
  const dispatch = useAppDispatch();
  // @ts-ignore
  const editor = useMemo(() => withReact(createEditor()), []);

  const chapter = useAppSelector(
    (state) => state.books.selectedChapter.chapter
  );

  const handleChange = (v: Descendant[]) => {
    const chapterCopy = JSON.parse(JSON.stringify(chapter));
    chapterCopy.summary = v;
    dispatch(
      changeChapterSummary({ bookId: chapter.book_id, chapter: chapterCopy })
    );
  };

  console.log("chaptersummary-->chapterId", chapterId, chapter.chapter_id);

  useEffect(() => {}, [chapter.summary]);
  return (
    <div className="lm-chaptermodifier__summary">
      <div className="lm-textcontainer">
        {/* @ts-ignore */}
        <Slate
          editor={editor}
          value={chapter.summary}
          onChange={(v) => handleChange(v)}
        >
          <Editable />
        </Slate>
      </div>
    </div>
  );
};

export default ChapterSummary;
