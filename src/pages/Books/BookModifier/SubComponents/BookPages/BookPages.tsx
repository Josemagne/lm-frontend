import { useState } from "react";
type Props = {
  values: any;
};

/**
 * Holds the number of pages for a book
 */
const BookPages = ({ values }: Props) => {
  return (
    <div className="lm-bookpages">
      <input
        type="number"
        className="lm-bookpages__input"
        // NOTE formik needs the name in order to appropriately change formik.values
        name="pages"
        {...values}
      />
    </div>
  );
};

export default BookPages;
