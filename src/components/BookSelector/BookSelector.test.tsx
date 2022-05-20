import { mount } from "@cypress/react"
import { Provider } from "react-redux"
import BookSelector from "./BookSelector"
import { store } from "../../state/redux/store"
import { HashRouter } from "react-router-dom"
import { addBook } from "../../state/redux/features/bookSlice"
import Book from "../../classes/Book"
describe("BookSelector", () => {
  before(() => {
    store.dispatch(addBook(new Book("a", "a", "a", "a", 33, 33, "")))
  })
  beforeEach(() => {
    mount(
      <Provider store={store}>
        <HashRouter>
          <BookSelector />)
        </HashRouter>
      </Provider>
    )
  })

  it("Should be displayed", () => {
    cy.get(".lm-gc-bookselector").should("exist")
  })
})
