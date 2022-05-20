import { mount } from "@cypress/react"
import ChapterSummary from "./ChapterSummary"
describe("ChapterSummary", () => {
  beforeEach(() => {
    mount(<ChapterSummary />)
  })
  it("Should be displayed", () => {
    cy.get(".lm-chaptersummary").should("exist")
  })
})
