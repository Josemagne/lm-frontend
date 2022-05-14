import { render } from "@testing-library/react"
import { render as enzymeRender } from "enzyme"
import BookSelector from "./BookSelector"

describe("", () => {
  beforeEach(() => {
    render(<BookSelector />)
  })
  test("", () => {
    const BookSelectorHTML = enzymeRender(<BookSelector />)
  })
})
