import React from "react";

type Props = {
  author_fullname: string;
};

const AuthorViewer = ({ author_fullname }: Props) => {
  return <div className="lm-authorviewer">{author_fullname}</div>;
};

export default AuthorViewer;
