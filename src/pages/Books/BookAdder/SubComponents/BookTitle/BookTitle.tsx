import React, { useState } from "react"
import { FloatingLabel, Form } from "react-bootstrap"
import useAppDispatch from "../../../../../hooks/useAppDispatch"
import useAppSelector from "../../../../../hooks/useAppSelector"
import { RootState } from "../../../../../state/redux/store"
import axios from "axios"
import {
  changeSearchResults,
  toggleIsSearchingBooks,
} from "../../../../../state/redux/features/bookSlice"
import useSearchBook from "../../../../../hooks/useSearchBook"

type Props = {
  values: any
}

const BookTitle = ({ values }: Props) => {
  const dispatch = useAppDispatch()
  const newBook = useAppSelector((store: RootState) => store.books.newBook)
  const [value, setValue] = useState("")
  const [find, setFind] = useState(false)
  const isSearchingBooks = useAppSelector(
    (state: RootState) => state.books.isSearchingBooks
  ) as unknown as boolean

  const convertToQueryString = (str: string): string => {
    return str.split(" ").join("+")
  }
  const handleChange = (bookTitle: string) => {
    setValue(bookTitle)
  }

  const search = () => {
    axios
      .get(
        `http://openlibrary.org/search.json?q=${convertToQueryString(
          value
        )}&jscmd=data`
      )
      .then((res) => {
        console.log(res.data)
        const results = res.data.docs
        dispatch(changeSearchResults(results))
      })
  }

  return (
    <div className="lm-booktitle">
      <Form className="lm-booktitle__form">
        <FloatingLabel
          controlId="book_title"
          label="Book Title"
          className="lm-booktitle__title"
        >
          <Form.Control
            type="text"
            placeholder="Book Title"
            name="book_title"
            {...values}
          />
        </FloatingLabel>
      </Form>
    </div>
  )
}

export default BookTitle
