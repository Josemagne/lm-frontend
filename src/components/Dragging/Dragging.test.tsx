import { mount } from "@cypress/react"
import Dragging from "./Dragging"
describe("Dragging", () => {
  beforeEach(() => {
    mount(<Dragging title="Book" type="BOOK" />)
  })
  it("Should be displayed", () => {
    cy.get(".lm-gc-dragging").should("exist")
  })
})
