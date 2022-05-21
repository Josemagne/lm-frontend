import { Provider } from "react-redux"
import { HashRouter } from "react-router-dom"
import { mount } from "@cypress/react"
import { store } from "../../../../../../state/redux/store"
import FlashcardTrainerStart from "./FlashcardTrainerStart"

describe("FlashcardTrainer", () => {
  beforeEach(() => {
    mount(
      <Provider store={store}>
        <HashRouter>
          <FlashcardTrainerStart />
        </HashRouter>
      </Provider>
    )
  })

  it("Should display", () => {
    cy.get(".flashcardtrainer__start").should("exist")
  })

  it("Should change red if we are revising", () => {})
})
