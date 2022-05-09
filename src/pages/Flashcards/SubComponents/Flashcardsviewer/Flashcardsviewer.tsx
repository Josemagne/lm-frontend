import React, { useEffect, useState } from "react"
import { Accordion, Container, Row } from "react-bootstrap"
import useAppSelector from "../../../../hooks/useAppSelector"
import useAppDispatch from "../../../../hooks/useAppDispatch"
import LM_Chapter from "../../../../types/Book/chapter"
import { LM_Flashcard } from "../../../../types/Flashcard/flashcard"
import { fetchFlashcardsBackend } from "../../../../state/redux/features/Flashcard/flashcardSlice"
import { Table } from "rsuite"

const { HeaderCell, Cell } = Table

const Flashcardsviewer = () => {
  const dispatch = useAppDispatch()
  const selectedBook = useAppSelector((state) => state.books.selectedBook)
  let flashcards: LM_Flashcard[] | null = useAppSelector(
    (state) => state.flashcards.flashcards.flashcards
  )
  if (flashcards) flashcards = Object.values(flashcards)

  useEffect(() => {
    if (!selectedBook) return
    // @ts-ignore
    dispatch(fetchFlashcardsBackend(selectedBook.book_id))
  }, [selectedBook])

  useEffect(() => {
    if (!flashcards) return
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
            )
          })
        ) : (
          <p>No flashcards yet.</p>
        )}
      </Accordion>
      {/* {flashcards && Object.values(flashcards).length > 0 && (
        <Table data={Object.values(flashcards)}>
          <Table.Column width={100}>
            <div className="lm-question">
              <HeaderCell>Question</HeaderCell>
              <Cell dataKey="question" />
            </div>
          </Table.Column>
          <Table.Column width={100}>
            <div className="lm-answer">
              <HeaderCell>Answer</HeaderCell>
              <Cell dataKey="answer" />
            </div>
          </Table.Column>
        </Table>
      )} */}
    </div>
  )
}

export default Flashcardsviewer
