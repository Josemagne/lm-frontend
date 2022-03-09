import React from "react";
import ChapterTitle from "./SubComponents/ChapterHeader/ChapterTitle/ChapterTitle";
import ChapterState from "./SubComponents/ChapterHeader/ChapterState/ChapterState";
import SummaryModifier from "./SubComponents/ChapterBody/SummaryModifier/SummaryModifier";
import Adder from "../../../components/helpers/Adder/Adder";

type Props = {};

const ChapterModifier = (props: Props) => {
  return (
    <div className="lm-page lm-chaptermodifier">
      {/* TODO Move to its own File */}
      <div className="lm-chapterheader">
        <ChapterTitle />
        <ChapterState />
        <Adder text={"+"} />
      </div>
      <div className="lm-chapterheader">
        <SummaryModifier />
      </div>
    </div>
  );
};

export default ChapterModifier;
