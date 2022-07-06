import axios from "axios"
import React, { useEffect, useState } from "react"
import useAppSelector from "../../../../../hooks/useAppSelector"
import { RootState } from "../../../../../state/redux/store"

type Props = {}

const SearchResults = (props: Props) => {
  const [books, setBooks] = useState<any[]>([])
  const searchResults = Object.values(
    useAppSelector((store: RootState) => store.books.search)
  ) as unknown as any[]

  const searchBook = async (isbn: string) => {
    let result: any

    await axios
      .get(
        `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`
      )
      .then((res) => {
        result = res.data[`ISBN:${isbn}`]
      })

    return result
  }

  //   useEffect(() => {
  //     let tmp: any[] = []
  //     if (books.length > 1) return
  //     searchResults.forEach(async (s) => {
  //       const isbn = s.isbn[0]
  //       console.log(isbn)
  //       //   const book = await searchBook(isbn)
  //       //   tmp.push(book)
  //     })
  //     setBooks([...tmp])
  //     console.log("books: ", books)
  //   }, [searchResults])

  useEffect(() => {}, [searchResults])

  return (
    <div className="bookadder__searchresults">
      {searchResults &&
        searchResults.map((b) => {
          //   return <img src={b.cover.small} alt="" />
          return (
            <div>
              <img src={b.cover.small} alt="" />
            </div>
          )
        })}
    </div>
  )
}

export default SearchResults
