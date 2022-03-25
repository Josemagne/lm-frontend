import React from "react";
import TextContainer from "../../../../components/TextContainer/TextContainer";

type Props = {};

const Question = (props: Props) => {
  return (
    <div className="lm-question flashcard__entity">
      <TextContainer
        name="question"
        content={[
          {
            children: [{ text: "question" }],
          },
        ]}
      />
    </div>
  );
};

export default Question;
