import React from "react";

type Props = {
  title: string;
};

const TitleViewer = ({ title }: Props) => {
  return <div className="lm-titleviewer">{title}</div>;
};

export default TitleViewer;
