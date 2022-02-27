import React from "react";
import ChapterAdder from "./SubComponents/ChapterAdder/ChapterAdder";
import ChapterTitle from "./SubComponents/ChapterHeader/ChapterTitle/ChapterTitle";

type Props = {};

const ChapterModifier = (props: Props) => {
  return (
    <div className="lm-chaptermodifier">
      <ChapterTitle />
      <ChapterAdder />
    </div>
  );
};

export default ChapterModifier;
