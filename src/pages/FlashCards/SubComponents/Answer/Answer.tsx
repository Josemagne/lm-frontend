import React from "react";
import TextContainer from "../../../../components/TextContainer/TextContainer";

type Props = {};

const Answer = (props: Props) => {
  return (
    <div className="lm-answer flashcard__entity">
      <TextContainer content={[{ text: "answer" }]} />
    </div>
  );
};

export default Answer;
