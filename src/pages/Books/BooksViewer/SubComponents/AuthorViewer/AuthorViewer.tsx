import React from "react";

type Props = {
  author_prename: string;
  author_name: string;
};

const AuthorViewer = ({ author_prename, author_name }: Props) => {
  return (
    <div className="lm-authorviewer">
      <span>{author_prename}</span>
      <span>{author_name}</span>
    </div>
  );
};

export default AuthorViewer;
