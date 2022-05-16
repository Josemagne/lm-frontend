/// <reference types="@testing-library/jest-dom" />
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "../../state/redux/store"
import { HashRouter } from "react-router-dom"
import Dragging from "./Dragging"
import { addBook } from "../../state/redux/features/bookSlice"
import Book from "../../classes/Book"
import { nanoid } from "nanoid"

describe("Dragging", () => {
  let container: HTMLElement
  beforeEach(() => {
    // @ts-ignore
    container = render(
      <Provider store={store}>
        <HashRouter>
          <Dragging type="BOOK" title="Book" />
        </HashRouter>
      </Provider>
    )
    store.dispatch(addBook(new Book(nanoid(), "", "", "", 0, 0, "")))
  })
  test("Should load the books on setup", () => {
    const entitiesDroppableList = screen.getByTestId("entitiesdroppablelist")
    const bookContainer = screen.getAllByTestId("bookcontainer")[0]
    expect(entitiesDroppableList.contains(bookContainer)).toBe(true)
  })

  test("Books that have the status 'READ' should be in the droppable for 'READ'", () => {})
})
