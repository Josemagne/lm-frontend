import { Provider } from "react-redux"
import { addBook } from "../../../../../../state/redux/features/bookSlice"
import { store } from "../../../../../../state/redux/store"
import { HashRouter } from "react-router-dom"
import ChapterSummary from "./ChapterSummary"
import { render } from "@testing-library/react"
describe("ChapterSummary", () => {
  before(() => {
    // store.dispatch(addChapter(new Chapter()))
    // store.dispatch(addBook(new Book()))
  })

  after(() => {
    console.log("SUCCESS")
  })

  beforeEach(() => {
    render(
      <Provider store={store}>
        <HashRouter>
          <ChapterSummary />
        </HashRouter>
      </Provider>
    )
  })

  test("Should show the summary of the chapter", () => {})

  test("Should update the summary of the chapter", () => {})

  test("Should close the summary if clicked", () => {})

  test("Should open the summary if clicked", () => {})
})
