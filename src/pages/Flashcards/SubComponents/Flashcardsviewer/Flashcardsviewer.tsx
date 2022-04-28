import React, { useEffect, useState } from "react";
import { Accordion, Container, Row } from "react-bootstrap";
import useAppSelector from "../../../../hooks/useAppSelector";
import LM_Chapter from "../../../../types/Book/chapter";
import {LM_Flashcard} from "../../../../types/Flashcard/flashcard";

type Props = {};

const Flashcardsviewer = (props: Props) => {
  const selectedBook = useAppSelector((state) => state.books.selectedBook);
  let flashcards: LM_Flashcard[] | null = null;

  try {
  flashcards = useAppSelector((state) => state.flashcards.flashcards.flashcards);
  } catch(err) {
  }

  useEffect(() => {
  }, [selectedBook]);

  return (
    <div className="lm-lc-flashcardsviewer">
      <Accordion className="lm-lc-flashcardsviewer__container">
        {flashcards && flashcards.length > 0 ? (
          flashcards.map((f, index) => {
            return (
              <Accordion.Item eventKey={index.toString()} className="flashcard">
                <div className="lm-lc-flashcardsviewer__flashcard">
                  <Accordion.Header className="question">
                    <div dangerouslySetInnerHTML={{ __html: f.question }}></div>
                  </Accordion.Header>
                  <Accordion.Body className="answer ">
                    <div dangerouslySetInnerHTML={{ __html: f.answer }}></div>
                  </Accordion.Body>
                </div>
              </Accordion.Item>
            );
          })
        ) : (
          <p>No flashcards yet!</p>
        )}
      </Accordion>
    </div>
  );
};

export default Flashcardsviewer;
