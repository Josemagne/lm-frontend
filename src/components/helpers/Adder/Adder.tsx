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
    <button
      type={type}
      // The button triggers a submit in the form
      onClick={() => {
        if (clickHandler) {
          clickHandler();
        }
      }}
      className="lm-adder"
    >
      {text}
    </button>
  );
};

export default Adder;
