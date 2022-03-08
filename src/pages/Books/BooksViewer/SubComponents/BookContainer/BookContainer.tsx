import React from "react";

type Props = {
  children: any;
};

const BookContainer = ({ children }: Props) => {
  return <div className="lm-bookcontainer">{children}</div>;
};

export default BookContainer;
