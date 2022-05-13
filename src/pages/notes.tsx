import React, { useEffect } from "react"
import BookSelector from "../components/BookSelector/BookSelector"
import useAppSelector from "../hooks/useAppSelector"
import { useGetNotesQuery } from "../state/redux/queries/noteQueries"
import { RootState } from "../state/redux/store"
import { LM_Note } from "../types/Note/note"

type Props = {}

const NotesPage = (props: Props) => {
  // NOTE We will fetch the notes from our store
  useGetNotesQuery()

  const notes: LM_Note[] = Object.values(
    useAppSelector((state: RootState) => state.notes.notes.notes)
  )

  useEffect(() => {}, [])

  return (
    <div className="lm-notes lm-page">
      <BookSelector />
    </div>
  )
}

export default NotesPage
