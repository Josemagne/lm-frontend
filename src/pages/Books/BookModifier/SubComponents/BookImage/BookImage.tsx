import React from "react";

type Props = {
  /**
   * The url to the image
   */
  bookImage: string | undefined;
};

/**
 * Creates the background for the book
 */
const BookImage = ({ bookImage }: Props) => {
  return (
    <div className="lm-bookimage">
      {bookImage ? <img src={bookImage} alt="book cover" /> : null}
    </div>
  );
};

export default BookImage;
