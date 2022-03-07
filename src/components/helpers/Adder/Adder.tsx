type Props = {
  /**
   * The content of the button
   */
  text: string;
  /**
   * Handles click event
   */
  clickHandler?: any;
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
      type="submit"
      className="lm-adder"
      onClick={() => {
        clickHandler();
      }}
    >
      {text}
    </button>
  );
};

export default Adder;
