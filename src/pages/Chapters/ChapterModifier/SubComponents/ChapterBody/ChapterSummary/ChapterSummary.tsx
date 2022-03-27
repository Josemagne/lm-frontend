import React from "react";
import TextContainer from "../../../../../../components/TextContainer/TextContainer";
import { LM_Book } from "../../../../../../types/Book/book";
import useAppSelector from "../../../../../../../build/hooks/useAppSelector";

type Props = {
  changeHandler: (book: LM_Book) => void;
  entity: any;
};

const ChapterSummary = ({ changeHandler, entity }: Props) => {
  const summary = useAppSelector(
    (state) => state.books.selectedChapter.chapter.summary
  );
  return (
    <div className="lm-chaptermodifier__summary">
      <TextContainer
        changeHandler={changeHandler}
        entity={entity}
        propToChange={"summary"}
        name="chaptersummary"
        content={summary}
      />
    </div>
  );
};

export default ChapterSummary;
