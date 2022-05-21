import { mount } from "@cypress/react"
import FlashcardTrainerWrong from "./FlashcardTrainerWrong"
import { Provider } from "react-redux"
import { store } from "../../../../../../state/redux/store"
import { HashRouter } from "react-router-dom"
import {
  addFlashcard,
  toggleIsTraining,
  toggleShowAnswer,
} from "../../../../../../state/redux/features/Flashcard/flashcardSlice"
import Flashcard from "../../../../../../classes/base/Flashcard"
describe("BookSelector", () => {
  before(() => {
    store.dispatch(
      addFlashcard(new Flashcard("a", "question", "answer", "BOOK", "a"))
    )
  })
  beforeEach(() => {
    mount(
      <Provider store={store}>
        <HashRouter>
          <FlashcardTrainerWrong />
        </HashRouter>
      </Provider>
    )
  })
  it("Should be displayed if we show the answer", () => {
    // isTraining === true
    store.dispatch(toggleIsTraining(""))
    // showAnswer === true
    store.dispatch(toggleShowAnswer(""))

    cy.get(".flashcardtrainer__wrong").should("exist")
  })

  it("Should not be displayed if we do not show the answer", () => {
    cy.get(".flashcardtrainer__wrong").should("not.exist")
  })
})
