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
const Adder = ({ text}: Props) => {
/* STATE */

  /* METHODS */



  /* EVENTS */

  const adderClicked = new CustomEvent("adderClicked");


  return (
    <div>
          <button className="lm-adder" onClick={() => { window.dispatchEvent(adderClicked) }
          }>
        {text}
      </button>
    </div>
  );
};

export default Adder;
