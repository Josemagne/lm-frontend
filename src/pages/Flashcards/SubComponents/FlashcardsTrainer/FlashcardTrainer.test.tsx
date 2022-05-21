import { Provider } from "react-redux"
import { store } from "../../../../state/redux/store"
import { HashRouter } from "react-router-dom"
import { mount } from "@cypress/react"
import FlashcardTrainer from "./FlashcardTrainer"

describe("FlashcardTrainer", () => {
  beforeEach(() => {
    mount(
      <Provider store={store}>
        <HashRouter>
          <FlashcardTrainer />
        </HashRouter>
      </Provider>
    )
  })

  // NOTE LM_Flashcard.status equals "NEW" or "LEARNING"
  it("Should load the the flashcards that should be revised", () => {
    cy.get(".lm-lc-flashcardtrainer").should("exist")
  })
})
