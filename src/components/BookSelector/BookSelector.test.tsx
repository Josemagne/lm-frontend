import { render, screen } from "@testing-library/react"
import Flashcards from "../../pages/Flashcards/Flashcards"

describe("BookSelector", () => {
  test("Should show BookSelector on initial page setup", () => {
    // Render the parent component first
    render(<Flashcards />)
  })
})
