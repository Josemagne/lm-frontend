import React, { useEffect } from "react"
import useAppSelector from "../../../../../hooks/useAppSelector"
import { useGetNotesQuery } from "../../../../../state/redux/queries/noteQueries"
import {
  isSelectingBookSelector,
  selectedBookSelector,
} from "../../../../../state/redux/features/bookSlice"
import { LM_Book } from "../../../../../types/Book/book"
import { notesSelector } from "../../../../../state/redux/selectors/noteSelectors"
import { Card } from "react-bootstrap"
import useAppDispatch from "../../../../../hooks/useAppDispatch"
import {
  changeSelectedNote,
  toggleIsSelectingNote,
} from "../../../../../state/redux/features/noteSlice"
import { LM_Note } from "../../../../../types/Note/note"
import "./notepagination.scss"

const NotePagination = () => {
  const dispatch = useAppDispatch()

  const isSelectingBook = useAppSelector(isSelectingBookSelector) as boolean
  const selectedBook = useAppSelector(selectedBookSelector) as LM_Book

  const notes = useAppSelector(notesSelector)

  useGetNotesQuery({
    entity: "BOOK",
    entityID: selectedBook.book_id,
  })

  const handleClick = (note: LM_Note) => {
    dispatch(changeSelectedNote(note))
    dispatch(toggleIsSelectingNote(""))
  }

  useEffect(() => {
    console.log("notes: ", notes)
  }, [notes])

  return (
    <div className="notes__notepagination">
      {notes.map((n) => {
        return (
          <Card onClick={() => handleClick(n)} className="notepagination__note">
            <Card.Body>
              <Card.Title>n.title</Card.Title>
              <Card.Text>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      n.note.length > 50 ? n.note.substring(0, 50) : n.note,
                  }}
                ></div>
              </Card.Text>
            </Card.Body>
          </Card>
        )
      })}
    </div>
  )
}

export default NotePagination
