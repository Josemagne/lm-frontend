import {render, screen} from "@testing-library/react"
import {expect} from "@jest/globals";
import Flashcards from "../../pages/Flashcards/Flashcards"

describe("BookSelector", () => {
  test("Should show BookSelector on initial page setup", () => {
    // Render the parent component first
     render(<Flashcards />)
    expect(screen.getByText(""))

  })
})
