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
import { render as enzymeRender } from "enzyme"
import { render } from "@testing-library/react"

describe("BooksViewer", () => {
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
    return enzymeRender(
      <Provider store={store}>
        <HashRouter>
          <BooksViewer />
        </HashRouter>
      </Provider>
    )
  }

  beforeEach(() => {
    render(
      <Provider store={store}>
        <HashRouter>
          <BooksViewer />
        </HashRouter>
      </Provider>
    )
  })

  it("Should open BookModal if a BookContainer is clicked", () => {
    store.dispatch(addBook(new Book("a", "Tim", "Strup", "abc", 22, 33, "")))

    // NOTE We use enzyme for easier querying
    const wrapper = renderBooksViewer()

    console.log(store.getState())

    const book = screen.getByText("Strup")

    console.log("book: ", book)

    userEvent.click(book).then(() => {
      expect(wrapper.find(".lm-bookmodal")).toBeInTheDocument()
      console.log(wrapper)
    })

    // expect(screen.getByTestId("lm-bookmodal")).toBeInTheDocument()
  })

  it("Should contain the title of the Book if we click on a BookContainer", () => {})

  // ANCHOR BooksPagination
  describe("BooksViewer/BooksPagination", () => {
    it("", () => {})
  })
})
