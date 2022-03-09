type Props = {
  /**
   * The content of the button
   */
  text: string;
  clickHandler?: () => void;
};

/**
 * The button that definitely adds the data
 */
const Adder = ({ text, clickHandler }: Props) => {
  /* STORAGE */

  /* STATE */

  /* METHODS */

  /* EVENTS */

  return (
    <button
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
