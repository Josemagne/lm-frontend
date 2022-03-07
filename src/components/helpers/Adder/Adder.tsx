type Props = {
  /**
   * The content of the button
   */
  text: string;
};

/**
 * The button that definitely adds the data
 */
const Adder = ({ text }: Props) => {
  /* STORAGE */

  /* STATE */

  /* METHODS */

  /* EVENTS */

  return (
    <button
      // The button triggers a submit in the form
      type="submit"
      className="lm-adder"
    >
      {text}
    </button>
  );
};

export default Adder;
