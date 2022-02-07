import React from "react";
import ChapterAdder from "./SubComponents/ChapterAdder/ChapterAdder";

type Props = {};

const SummaryTaker = (props: Props) => {
  return (
    <div className="lm-summarytaker">
      <ChapterAdder />
    </div>
  );
};

export default SummaryTaker;
