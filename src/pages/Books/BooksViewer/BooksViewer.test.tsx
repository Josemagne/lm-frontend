import { render, shallow, ShallowWrapper } from "enzyme"
import BooksViewer from "./BooksViewer"
import { Provider } from "react-redux"
import { store } from "../../../state/redux/store"
import {
  addBook,
  changeSelectedBook,
} from "../../../state/redux/features/bookSlice"
import Book from "../../../classes/Book"
import { Route, Routes } from "react-router"
import { HashRouter } from "react-router-dom"
import BookModal from "./SubComponents/BookModal/BookModal"
import userEvent from "@testing-library/user-event"
import { screen } from "@testing-library/react"
import BooksPagination from "./SubComponents/BooksPagination/BooksPagination"

describe("BooksViewer", () => {
  let wrapper: cheerio.Cheerio

  // beforeEach(() => {
  //   wrapper = render(
  //     <Provider store={store}>
  //       <HashRouter>
  //         <BooksViewer />
  //       </HashRouter>
  //     </Provider>
  //   )
  // })

  const renderBooksViewer = () => {
    render(
      <Provider store={store}>
        <HashRouter>
          <BooksViewer />
        </HashRouter>
      </Provider>
    )
  }

  it("Should open BookModal if a BookContainer is clicked", () => {
    store.dispatch(addBook(new Book("a", "Tim", "Strup", "abc", 22, 33, "")))

    renderBooksViewer()

    console.log(store.getState())
    const book = screen.queryByText("Tim")

    console.log(book)

    // userEvent.click(book)

    // expect(screen.getByTestId("lm-bookmodal")).toBeInTheDocument()
  })

  // ANCHOR BooksPagination
  describe("BooksViewer/BooksPagination", () => {
    it("", () => {})
  })
})
