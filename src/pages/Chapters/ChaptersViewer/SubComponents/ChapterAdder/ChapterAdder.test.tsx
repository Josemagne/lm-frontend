import { mount } from "@cypress/react"
import { Provider } from "react-redux"
import { HashRouter } from "react-router-dom"
import { addBook } from "../../../../../state/redux/features/bookSlice"
import Book from "../../../../../classes/Book"
import ChapterAdder from "./ChapterAdder"
import { store } from "../../../../../state/redux/store"

describe("BookSelector", () => {
  before(() => {
    store.dispatch(addBook(new Book("a", "a", "a", "a", 33, 33, "")))
  })
  beforeEach(() => {
    mount(
      <Provider store={store}>
        <HashRouter>
          <ChapterAdder />
        </HashRouter>
      </Provider>
    )
  })

  it("Should be closed if the submit button is clicked", () => {})
})
