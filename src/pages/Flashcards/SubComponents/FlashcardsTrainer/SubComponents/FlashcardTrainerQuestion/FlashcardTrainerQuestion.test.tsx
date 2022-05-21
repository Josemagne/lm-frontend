import { mount } from "@cypress/react"
import { Provider } from "react-redux"
import { HashRouter } from "react-router-dom"
import FlashcardTrainerQuestion from "./FlashcardTrainerQuestion"
import { store } from "../../../../../../state/redux/store"
import { addFlashcard } from "../../../../../../state/redux/features/Flashcard/flashcardSlice"
import Flashcard from "../../../../../../classes/base/Flashcard"
describe("FlashcardTrainerQuestion", () => {
  before(() => {
    store.dispatch(
      addFlashcard(new Flashcard("a", "question", "answer", "BOOK", "a"))
    )
  })
  beforeEach(() => {
    mount(
      <Provider store={store}>
        <HashRouter>
          <FlashcardTrainerQuestion />
        </HashRouter>
      </Provider>
    )
  })
  it("Should show the question for the current flashcard", () => {
    cy.get(".flashcardtrainer__question").should("exist")
  })
})
