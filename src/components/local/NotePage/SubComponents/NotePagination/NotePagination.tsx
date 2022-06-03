import React, { useEffect } from "react"
import useAppSelector from "../../../../../hooks/useAppSelector"
import { useGetNotesQuery } from "../../../../../state/redux/queries/noteQueries"
import {
  isSelectingBookSelector,
  selectedBookSelector,
} from "../../../../../state/redux/features/bookSlice"

const NotePagination = () => {
  let data

  const isSelectingBook = useAppSelector(isSelectingBookSelector)
  const selectedBook = useAppSelector(selectedBookSelector)

  if (isSelectingBook && selectedBook) {
    const response = useGetNotesQuery({
      entity: "BOOK",
      entityID: selectedBook.book_id,
    })

    data = response.data
  }

  useEffect(() => {}, [selectedBook])
  return <div>{data && data}</div>
}

export default NotePagination
