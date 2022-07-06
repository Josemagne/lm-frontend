import React from "react"
import "./addoption.scss"
import useAppDispatch from "../../../../../../../hooks/useAppDispatch"
import useAppSelector from "../../../../../../../hooks/useAppSelector"
import { RootState } from "../../../../../../../state/redux/store"
import { toggleIsSearchingBooks } from "../../../../../../../state/redux/features/bookSlice"

const AddOption = () => {
  const dispatch = useAppDispatch()
  const isSearchingBooks = useAppSelector(
    (store: RootState) => store.books.search.isSearchingBooks
  )

  const selectOption = (option: "search" | "add") => {
    if (option === "search" && !isSearchingBooks) {
      dispatch(toggleIsSearchingBooks(""))
    } else if (option === "add" && isSearchingBooks) {
      dispatch(toggleIsSearchingBooks(""))
    }
  }

  return (
    <div className="lm-addoption">
      <div
        className={`addoption__search ${isSearchingBooks && "selected"}`}
        onClick={() => selectOption("search")}
      >
        <p>Search</p>
      </div>
      <div
        className={`addoption__add ${!isSearchingBooks && "selected"}`}
        onClick={() => selectOption("add")}
      >
        <p>Add</p>
      </div>
    </div>
  )
}

export default AddOption
