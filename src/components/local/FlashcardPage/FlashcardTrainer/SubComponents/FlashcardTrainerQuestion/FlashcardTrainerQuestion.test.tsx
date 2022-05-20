import React from "react"
import { mount } from "@cypress/react"
import FlashcardTrainerQuestion from "./FlashcardTrainerQuestion"
import { Provider } from "react-redux"
import { store } from "../../../../../../state/redux/store"
import { HashRouter } from "react-router-dom"

it("renders learn react link", () => {
  mount(
    <Provider store={store}>
      <HashRouter>
        <FlashcardTrainerQuestion />
      </HashRouter>
    </Provider>
  )
  cy.get(".flashcardtrainer__question").should("exist")
})
