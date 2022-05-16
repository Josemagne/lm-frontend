import { changeSelectedBook } from "../../../../../state/redux/features/bookSlice"
import { store } from "../../../../../state/redux/store"
import BookModal from "./BookModal"
import { Provider } from "react-redux"

describe("BookModal", () => {
  it("Modal should be open when a book is selected", () => {
    store.dispatch(changeSelectedBook("aa"))
  })
})
