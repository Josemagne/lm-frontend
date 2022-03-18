import { useState } from "react";
import ChapterTitle from "./SubComponents/ChapterHeader/ChapterTitle/ChapterTitle";
import ChapterState from "./SubComponents/ChapterHeader/ChapterState/ChapterState";
import SummaryModifier from "./SubComponents/ChapterBody/SummaryModifier/SummaryModifier";
import Adder from "../../../components/helpers/Adder/Adder";
import { useEffect } from "react";
import LM_Chapter from "../../../types/Book/chapter";

type Props = {};

const ChapterModifier = (props: Props) => {
  const [chapter, setChapter] = useState<LM_Chapter>();
  const bookID = window.location.href.split("/").pop();

  useEffect(() => {}, []);

  return (
    <div className="lm-page lm-chaptermodifier">
      {/* TODO Move to its own File */}
      <div className="lm-chapterheader">
        <ChapterTitle />
        <ChapterState />
        <Adder type="button" text={"+"} />
      </div>
      <div className="lm-chapterbody">
        {/* TODO Key word taker */}
        {/* TODO Flash cards */}
        {/* TODO AddPicture */}
        <SummaryModifier />
      </div>
      <div className="lm-chapterfooter"></div>
    </div>
  );
};

export default ChapterModifier;
