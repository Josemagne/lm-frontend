import { render, screen } from "@testing-library/react"
import { render as enzymeRender } from "enzyme"
import BookSelector from "./BookSelector"
import { store } from "../../state/redux/store"
import userEvent from "@testing-library/user-event"
import { addBook } from "../../state/redux/features/bookSlice"
import Book from "../../classes/Book"
import { HashRouter } from "react-router-dom"
import { Provider } from "react-redux"

describe("", () => {
  const getState = store.getState()
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
    store.dispatch(addBook(new Book("a", "a", "", "", 55, 1, "")))

    expect(getState().books.selection.selectedBook).not.toBe(null)
  })
})
