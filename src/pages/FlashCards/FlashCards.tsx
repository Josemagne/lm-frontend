import { useEffect, useState } from "react";
import Question from "./SubComponents/Question/Question";
import Answer from "./SubComponents/Answer/Answer";
import { Panel } from "rsuite";

type Props = {};

const FlashCards = (props: Props) => {
  const [width, setWidth] = useState<number>(0);

  window.addEventListener("resize", () => {
    setWidth(global.window.innerWidth);
  });

  useEffect(() => {
    setWidth(global.window.innerWidth);
  }, []);

  useEffect(() => {}, [width]);
  return (
    <div className="lm-flashcards">
      {width < 768 ? (
        <Panel
          collapsible
          bordered
          header={
            <div className="lm-questionside">
              <Question />
            </div>
          }
        >
          <div className="lm-answerside">
            <Answer />
          </div>
        </Panel>
      ) : null}
      {width >= 768 ? (
        <>
          <div className="lm-questionside">
            <Question />
          </div>
          <div className="lm-answerside">
            <Answer />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default FlashCards;
