import { useState } from "react";

import localpersistence from "localpersistence/lssv";

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
  /**
   * Event that fires when the Adder is clicked
   */
  const adderClicked = new CustomEvent("adderClicked");

  return (
    <div>
      <button
        // The button triggers a submit in the form
        type="submit"
        className="lm-adder"
        onClick={() => {
          window.dispatchEvent(adderClicked);
        }}
      >
        {text}
      </button>
    </div>
  );
};

export default Adder;
