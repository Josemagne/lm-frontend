import {} from "react";

type Props = {};

const ChapterAdder = (props: Props) => {
  /**
   * Saves the data for the chapter
   */
  const save = (): void => {};

  return (
    <div className="lm-chapteradder" onClick={save}>
      {/* input field */}
      <button className="lm-chapteradder__button">+</button>
    </div>
  );
};

export default ChapterAdder;
