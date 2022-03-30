type Props = {
  /**
   * The content of the button
   */
  text: string;
  clickHandler?: () => void;
  type: "button" | "submit" | "reset";
};

/**
 * The button that definitely adds the data
 */
const Adder = ({ text, clickHandler, type }: Props) => {
  /* STORAGE */

  /* STATE */

  /* METHODS */

  /* EVENTS */

  return (
    <div
      // The button triggers a submit in the form
      onClick={() => {
        if (clickHandler) {
          clickHandler();
        }
      }}
      className="lm-adder"
    >
      <div>{text}</div>
    </div>
  );
};

export default Adder;
