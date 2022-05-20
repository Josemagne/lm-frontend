import { mount } from "@cypress/react"
import FlashcardTrainerWrong from "./FlashcardTrainerWrong"
describe("BookSelector", () => {
  beforeEach(() => {
    mount(<FlashcardTrainerWrong />)
  })
  it("Should be displayed", () => {
    cy.get(".lm-gc-bookselector").should("exist")
  })
})
