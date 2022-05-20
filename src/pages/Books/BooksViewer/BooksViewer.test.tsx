import { mount } from "@cypress/react"
import BooksViewer from "./BooksViewer"
describe("BooksViewer", () => {
  beforeEach(() => {
    mount(<BooksViewer />)
  })

  it("Should be displayed", () => {
    cy.get(".lm-booksviewer").should("exist")
  })
})
