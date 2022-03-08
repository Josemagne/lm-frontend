import React from "react";

type Props = {
  progress: number;
};

const ProgressViewer = ({ progress }: Props) => {
  return <div className="lm-progressviewer">{progress.toString() + "%"}</div>;
};

export default ProgressViewer;
