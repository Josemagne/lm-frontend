import axios from "axios"
import React, { useState } from "react"
import { FloatingLabel, Form } from "react-bootstrap"
import DisplayBooks from "./SubComponents/DisplayBooks/DisplayBooks"
import useAppDispatch from "../../../../../hooks/useAppDispatch"
import { changeSearchResults } from "../../../../../state/redux/features/bookSlice"
import useAppSelector from "../../../../../hooks/useAppSelector"
import { RootState } from "../../../../../state/redux/store"
import "./searchbooks.scss"

type Props = {}

const SearchBooks = (props: Props) => {
  const dispatch = useAppDispatch()
  const [searchTerm, setSearchTerm] = useState("")
  const searchedBooks = useAppSelector(
    (store: RootState) => store.books.search.books
  )

  const handleChange = (term: string) => {
    setSearchTerm(term)
  }

  const searchBook = async (isbn: string) => {
    const res = await axios.get(
      `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`
    )

    const book = res.data[`ISBN:${isbn}`]
    console.log("res: ", res)
    console.log("book: ", book)
    const books = Object.values(
      JSON.parse(JSON.stringify(searchedBooks))
    ) as any[]
    books.push(book)
    dispatch(changeSearchResults(books))
  }

  const convertToQueryString = (str: string): string => {
    return str.split(" ").join("+")
  }

  const search = async () => {
    try {
      const response = await axios.get(
        `http://openlibrary.org/search.json?q=${convertToQueryString(
          searchTerm
        )}&jscmd=data`
      )
      const docs = (response.data.docs as any[]).slice(0, 20)
      console.log("docs: ", docs)
      docs.forEach((d) => {
        searchBook(d.isbn[0])
      })
    } catch (err) {}
  }

  return (
    <div className="lm-searchbooks">
      <FloatingLabel
        controlId="search_books"
        label="Search"
        className="searchbooks__search"
      >
        <Form.Control
          type="text"
          placeholder="Search Books"
          name="search"
          onChange={(e: any) => handleChange(e.target.value)}
        />
      </FloatingLabel>
      <button onClick={search}>Search</button>
      <DisplayBooks />
    </div>
  )
}

export default SearchBooks
