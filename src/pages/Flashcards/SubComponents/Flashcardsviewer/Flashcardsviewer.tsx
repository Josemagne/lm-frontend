import React, { useEffect, useState } from "react";
import { Accordion, Container, Row } from "react-bootstrap";
import useAppSelector from "../../../../hooks/useAppSelector";
import LM_Chapter from "../../../../types/Book/chapter";
import { LM_Flashcard } from "../../../../types/flashcards/flashcard";

type Props = {};

const Flashcardsviewer = (props: Props) => {
  const [flashcards, setFlashcards] = useState<LM_Flashcard[]>([]);
  const selectedBook = useAppSelector((state) => state.books.selectedBook.book);

  /**
   * Gets all the flashcards of all the chapters of the selected book
   */
  const getFlashcards = () => {
    const chapterArray: LM_Chapter[] = Object.values(selectedBook.chapters);
    let _flashcards = [];

    for (let i = 0; i < chapterArray.length; i++) {
      const currentChapter: LM_Chapter = chapterArray[i];
      if (!currentChapter.flashcards) return;
      const _chapterFlashcards = Object.values(currentChapter.flashcards);
      _flashcards.push(..._chapterFlashcards);
    }

    setFlashcards(_flashcards);
  };

  useEffect(() => {
    if (selectedBook) getFlashcards();
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
