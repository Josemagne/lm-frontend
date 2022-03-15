import ChapterTitle from "./SubComponents/ChapterHeader/ChapterTitle/ChapterTitle";
import ChapterState from "./SubComponents/ChapterHeader/ChapterState/ChapterState";
import SummaryModifier from "./SubComponents/ChapterBody/SummaryModifier/SummaryModifier";
import Adder from "../../../components/helpers/Adder/Adder";
import { useEffect } from "react";

type Props = {};

const ChapterModifier = (props: Props) => {
  useEffect(() => {}, []);

  return (
    <div className="lm-page lm-chaptermodifier">
      {/* TODO Move to its own File */}
      <div className="lm-chapterheader">
        <ChapterTitle />
        <ChapterState />
        <Adder type="button" text={"+"} />
      </div>
      <div className="lm-chapterheader">
        <SummaryModifier />
      </div>
    </div>
  );
};

export default ChapterModifier;
