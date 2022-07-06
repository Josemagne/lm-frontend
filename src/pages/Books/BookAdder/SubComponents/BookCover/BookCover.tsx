import React, { useEffect } from "react"
import useAppSelector from "../../../../../hooks/useAppSelector"
import { RootState } from "../../../../../state/redux/store"
import { LM_Book } from "../../../../../types/Book/book"

type Props = {}

const BookCover = (props: Props) => {
  const newBook = useAppSelector(
    (store: RootState) => store.books.newBook
  ) as unknown as LM_Book

  useEffect(() => {}, [newBook])

  return (
    <div className="bookadder__bookcover">
      <img className="bookcover__image" src={newBook.cover} alt="" />
    </div>
  )
}

export default BookCover
