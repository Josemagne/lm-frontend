import React from "react";
import ChapterAdder from "./SubComponents/ChapterAdder/ChapterAdder";
import ChapterTitle from "./SubComponents/ChapterHeader/ChapterTitle/ChapterTitle";
import ChapterState from "./SubComponents/ChapterHeader/ChapterState/ChapterState";
import SummaryModifier from "./SubComponents/ChapterBody/SummaryModifier/SummaryModifier";

type Props = {};

const ChapterModifier = (props: Props) => {
  return (
    <div className="lm-page lm-chaptermodifier">
      {/* TODO Move to its own File */}
      <div className="lm-chapterheader">
        <ChapterTitle />
        <ChapterState />
        <ChapterAdder />
      </div>
      <div className="lm-chapterheader">
        <SummaryModifier />
      </div>
    </div>
  );
};

export default ChapterModifier;
