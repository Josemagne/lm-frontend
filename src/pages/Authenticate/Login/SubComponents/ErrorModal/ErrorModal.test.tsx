import { screen, render } from "@testing-library/react"
import ErrorModal from "./ErrorModal"

describe("ErrorModal", () => {
  it("Should show the ErrorModal when an errorMessage is passed", () => {
    render(<ErrorModal errorMessage="some error" />)
  })
})
