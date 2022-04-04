import React from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import BookSelector from "./SubComponents/BookSelector/BookSelector";
import Flashcardsviewer from "./SubComponents/Flashcardsviewer/Flashcardsviewer";

type Props = {};

const Flashcards = (props: Props) => {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.books);

  return (
    <div className="lm-flashcards lm-page">
      <div className="lm-flashcards__selector">
        <BookSelector />
      </div>
      <div className="lm-flashcards__viewer">
        <Flashcardsviewer />
      </div>
    </div>
  );
};

export default Flashcards;
