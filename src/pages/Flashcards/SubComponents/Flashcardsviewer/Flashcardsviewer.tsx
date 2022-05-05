import React, { useEffect, useState } from "react";
import { Accordion, Container, Row } from "react-bootstrap";
import useAppSelector from "../../../../hooks/useAppSelector";
import useAppDispatch from "../../../../hooks/useAppDispatch"
import LM_Chapter from "../../../../types/Book/chapter";
import {LM_Flashcard} from "../../../../types/Flashcard/flashcard";
import {fetchFlashcardsBackend} from "../../../../state/redux/features/Flashcard/flashcardSlice"

const Flashcardsviewer = () => {
  const dispatch = useAppDispatch();
  const selectedBook = useAppSelector((state) => state.books.selectedBook);
  let flashcards: LM_Flashcard[] | null = useAppSelector((state) => state.flashcards.flashcards.flashcards);
    if (flashcards) flashcards = Object.values(flashcards);

  useEffect(() => {
    console.log("selecteedBOOK in viewr:", selectedBook )
    if (!selectedBook) return;
    // @ts-ignore
    dispatch(fetchFlashcardsBackend(selectedBook.book_id))}
    ,[selectedBook]);

  useEffect(() => {
    if (!flashcards) return;
    console.log("the flashcards: ", flashcards)
    console.log("and arr:", Object.values(flashcards))
  }, [flashcards])

  return (
    <div className="lm-lc-flashcardsviewer">
      <Accordion className="lm-lc-flashcardsviewer__container">
        {flashcards && Object.values(flashcards).length > 0 ? (
          Object.values(flashcards).map((f, index) => {
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
