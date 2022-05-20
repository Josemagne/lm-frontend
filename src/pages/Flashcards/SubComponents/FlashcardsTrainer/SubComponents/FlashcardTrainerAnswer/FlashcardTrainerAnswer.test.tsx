import { mount } from "@cypress/react"
import FlashcardTrainerAnswer from "./FlashcardTrainerAnswer"
describe("FlashcardTrainerAnswer", () => {
  beforeEach(() => {
    mount(<FlashcardTrainerAnswer />)
  })
  it("Should be displayed", () => {
    cy.get(".flashcardtrainer__answer").should("exist")
  })
})
