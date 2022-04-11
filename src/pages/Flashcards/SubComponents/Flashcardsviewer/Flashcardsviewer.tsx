import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
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
      <Container>
        {flashcards && flashcards.length > 0 ? (
          flashcards.map((f) => {
            return (
              <Row>
                <div
                  className="question "
                  dangerouslySetInnerHTML={{ __html: f.question }}
                ></div>
                <div
                  className="answer "
                  dangerouslySetInnerHTML={{ __html: f.answer }}
                ></div>
              </Row>
            );
          })
        ) : (
          <p>No flashcards yet!</p>
        )}
      </Container>
    </div>
  );
};

export default Flashcardsviewer;
