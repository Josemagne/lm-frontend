import React from "react";
import TextContainer from "../../../../../components/TextContainer/TextContainer";

type Props = {};

const ChapterSummary = (props: Props) => {
  return (
    <div className="lm-chaptermodifier__summary">
      <TextContainer
        name="chaptersummary"
        content={[{ text: "chpatersummary" }]}
      />
    </div>
  );
};

export default ChapterSummary;
