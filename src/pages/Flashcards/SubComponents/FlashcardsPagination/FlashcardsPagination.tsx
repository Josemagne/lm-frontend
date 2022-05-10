import React, { useEffect, useState } from "react"
import { Accordion, Container, Row } from "react-bootstrap"
import useAppSelector from "../../../../hooks/useAppSelector"
import useAppDispatch from "../../../../hooks/useAppDispatch"
import LM_Chapter from "../../../../types/Book/chapter"
import { LM_Flashcard } from "../../../../types/Flashcard/flashcard"
import { fetchFlashcardsBackend } from "../../../../state/redux/features/Flashcard/flashcardSlice"
import { Table } from "rsuite"

const { HeaderCell, Cell } = Table

const FlashcardsPagination = () => {
  /**
   * Amount of characters that we want to preview
   */
  const textLength = 30
  const dispatch = useAppDispatch()
  const selectedBook = useAppSelector((state) => state.books.selectedBook)
  let flashcards: LM_Flashcard[] | null = useAppSelector(
    (state) => state.flashcards.flashcards.flashcards
  )
  if (flashcards) flashcards = Object.values(flashcards)

  // TODO Move to utils
  /**
   * Shorten a text and append '...'
   * @param text
   * @param length
   */
  function shortenText(text: string, length: number) {
    let subString = text.substring(0, length)
    subString += "..."

    return subString
  }

  useEffect(() => {
    if (!selectedBook) return
    // @ts-ignore
    dispatch(fetchFlashcardsBackend(selectedBook.book_id))
  }, [selectedBook])

  useEffect(() => {
    if (!flashcards) return
    console.log("rowdata: ", flashcards)
  }, [flashcards])

  return (
    <div className="lm-lc-flashcardsviewer">
      {/* <Accordion className="lm-lc-flashcardsviewer__container">
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
      </Accordion> */}
      {flashcards && Object.values(flashcards).length > 0 && (
        <Table
          data={Object.values(flashcards)}
          bordered={true}
          loading={flashcards ? false : true}
        >
          <Table.Column flexGrow={1}>
            <HeaderCell>Question</HeaderCell>
            <Cell>
              {(rowData) => {
                return (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: shortenText(rowData.question, textLength),
                    }}
                  />
                )
              }}
            </Cell>
          </Table.Column>
          <Table.Column flexGrow={1}>
            <HeaderCell>Answer</HeaderCell>
            <Cell>
              {(rowData) => {
                return (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: shortenText(rowData.answer, textLength),
                    }}
                  />
                )
              }}
            </Cell>
          </Table.Column>
          <Table.Column fixed="right" align="center">
            <HeaderCell>Delete</HeaderCell>
            <Cell>
              {() => {
                return (
                  <button type="button" className="btn btn-danger">
                    x
                  </button>
                )
              }}
            </Cell>
          </Table.Column>
        </Table>
      )}
    </div>
  )
}

export default FlashcardsPagination
