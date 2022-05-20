import { mount } from "@cypress/react"
import FlashcardTrainerRight from "./FlashcardTrainerRight"
describe("BookSelector", () => {
  beforeEach(() => {
    mount(<FlashcardTrainerRight />)
  })
  it("Should be displayed", () => {
    cy.get(".lm-gc-bookselector").should("exist")
  })
})
