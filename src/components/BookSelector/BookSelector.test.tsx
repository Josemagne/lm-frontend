/// <reference types="jest" />
import { render, screen } from "@testing-library/react"
import BookSelector from "./BookSelector"
import { RootState, store } from "../../state/redux/store"
import userEvent from "@testing-library/user-event"
import {
  addBook,
  changeSelectedBook,
} from "../../state/redux/features/bookSlice"
import Book from "../../classes/Book"
import { HashRouter } from "react-router-dom"
import { Provider } from "react-redux"

describe("", () => {
  before(() => {
    store.dispatch(addBook(new Book("a", "a", "", "", 55, 1, "")))
  })

  beforeEach(() => {
    render(
      <Provider store={store}>
        <HashRouter>
          <BookSelector />
        </HashRouter>
      </Provider>
    )
  })
  test("Should hide the BookSelector input field if a Book was selected.", () => {
    const bookSelectorInput = screen.getByTestId("bookselectorinput")

    userEvent.type(bookSelectorInput, "Harry Potter")
  })

  test("The store should contain the selected book", () => {
    store.dispatch(changeSelectedBook(new Book("a", "a", "", "", 55, 1, "")))

    expect(store.getState().books.selection.selectedBook).not.toBe(null)
  })

  test("The store should no longer contain the selected  book if we remove it", () => {
    store.dispatch(changeSelectedBook(null))
    expect(store.getState().books.selection.selectedBook).toBe(null)
  })
})
