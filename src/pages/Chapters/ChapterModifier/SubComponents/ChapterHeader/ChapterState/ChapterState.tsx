import { useState } from "react";
import { Toggle } from "rsuite";

type Props = {};

const ChapterState = (props: Props) => {
  /*******************************/
  /************* STATE ***********/
  /*******************************/

  // NOTE Decides if the chapter should be read.
  // We expect that the user wants to read the chapter that he has added
  const [toRead, setToRead] = useState(true);

  /*******************************/
  /********** FUNCTIONS **********/
  /*******************************/

  return (
    <div className="lm-chapterstate-container">
      <Toggle checkedChildren="to read" onChange={() => setToRead(!toRead)} />
    </div>
  );
};

export default ChapterState;
