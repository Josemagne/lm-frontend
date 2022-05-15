import React, { useEffect, useState } from "react"
import { Accordion, Container, Row } from "react-bootstrap"
import useAppSelector from "../../../../hooks/useAppSelector"
import useAppDispatch from "../../../../hooks/useAppDispatch"
import LM_Chapter from "../../../../types/Book/chapter"
import { LM_Flashcard } from "../../../../types/Flashcard/flashcard"
import {
  changeSelectedFlashcard,
  deleteFlashcard,
  fetchFlashcardsBackend,
} from "../../../../state/redux/features/Flashcard/flashcardSlice"
import { Table } from "rsuite"
import FlashcardModal from "../FlashcardModal/FlashcardModal"
import API from "../../../../api/API"
import { RootState } from "../../../../state/redux/store"
import { selectedBookSelector } from "../../../../state/redux/features/bookSlice"
import {
  selectedFlashcardSelector,
  filteredFlashcardsSelector,
  isFilteringFlashcardsSelector,
  flashcardsSelector,
} from "../../../../state/redux/features/Flashcard/flashcardSlice"

const { HeaderCell, Cell } = Table

const FlashcardsPagination = () => {
  /**
   * Amount of characters that we want to preview
   */
  const textLength = 100
  const dispatch = useAppDispatch()

  const selectedBook = useAppSelector(selectedBookSelector)
  const selectedFlashcard = useAppSelector(selectedFlashcardSelector)

  const filteredFlashcards: LM_Flashcard[] = useAppSelector(
    filteredFlashcardsSelector
  )

  const isFiltering: boolean = useAppSelector(isFilteringFlashcardsSelector)

  let flashcards: LM_Flashcard[] = useAppSelector(
    flashcardsSelector
  ) as LM_Flashcard[]

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

  function onRowClick(selectedFlashcard: LM_Flashcard) {
    dispatch(changeSelectedFlashcard(selectedFlashcard))
  }

  function removeFlashcard(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    flashcardID: string
  ) {
    e.preventDefault()
    e.stopPropagation()
    dispatch(deleteFlashcard(flashcardID))
    API.deleteFlashcard(flashcardID)
  }

  useEffect(() => {
    if (!selectedBook) return
    // @ts-ignore
    dispatch(fetchFlashcardsBackend(selectedBook.book_id))
  }, [selectedBook])

  useEffect(() => {}, [selectedFlashcard])

  useEffect(() => {
    if (!flashcards) return
  }, [flashcards])

  useEffect(() => {
    console.log("filteredFlashcards: ", filteredFlashcards)
  }, [filteredFlashcards, isFiltering])

  return (
    <div className="lm-lc-flashcardspagination">
      {flashcards.length > 0 && !isFiltering && (
        <Table
          data={flashcards}
          bordered={true}
          cellBordered={true}
          height={window.innerHeight * 0.5}
          onRowClick={(rowData: any) => onRowClick(rowData as LM_Flashcard)}
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
              {(rowData) => {
                return (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={(e) => removeFlashcard(e, rowData.flashcard_id)}
                  >
                    x
                  </button>
                )
              }}
            </Cell>
          </Table.Column>
        </Table>
      )}
      {flashcards.length === 0 && (
        <Table
          data={[]}
          bordered={true}
          loading={flashcards ? false : true}
          onRowClick={(rowData: any) => onRowClick(rowData as LM_Flashcard)}
        >
          <Table.Column flexGrow={1}>
            <HeaderCell>Question</HeaderCell>
            <Cell></Cell>
          </Table.Column>
          <Table.Column flexGrow={1}>
            <HeaderCell>Answer</HeaderCell>
            <Cell></Cell>
          </Table.Column>
          <Table.Column fixed="right" align="center">
            <HeaderCell>Delete</HeaderCell>
            <Cell></Cell>
          </Table.Column>
        </Table>
      )}
      {/* ANCHOR filteredFlashcards */}
      {isFiltering && (
        <Table
          data={filteredFlashcards}
          bordered={true}
          cellBordered={true}
          onRowClick={(rowData: any) => onRowClick(rowData as LM_Flashcard)}
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
              {(rowData) => {
                return (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={(e) => removeFlashcard(e, rowData.flashcard_id)}
                  >
                    x
                  </button>
                )
              }}
            </Cell>
          </Table.Column>
        </Table>
      )}
      {selectedFlashcard && <FlashcardModal />}
    </div>
  )
}

export default FlashcardsPagination
