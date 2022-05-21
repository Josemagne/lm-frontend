import { mount } from "@cypress/react"
import { Provider } from "react-redux"
import FlashcardTrainerAnswer from "./FlashcardTrainerAnswer"
import { store } from "../../../../../../state/redux/store"
import { HashRouter } from "react-router-dom"
import { addFlashcard } from "../../../../../../state/redux/features/Flashcard/flashcardSlice"
import Flashcard from "../../../../../../classes/base/Flashcard"
describe("FlashcardTrainerAnswer", () => {
  before(() => {
    store.dispatch(
      addFlashcard(new Flashcard("a", "question", "answer", "BOOK", "a"))
    )
  })
  beforeEach(() => {
    mount(
      <Provider store={store}>
        <HashRouter>
          <FlashcardTrainerAnswer />
        </HashRouter>
      </Provider>
    )
  })
  it("Should be displayed", () => {
    cy.get(".flashcardtrainer__answer").should("exist")
  })
})
