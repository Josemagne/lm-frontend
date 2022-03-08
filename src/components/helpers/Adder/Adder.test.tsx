import { render, screen } from "@testing-library/react";

import Adder from "./Adder";

describe("Adder", () => {
  test("Contains +", () => {
    render(<Adder text="+" />);
    // NOTE Get by text
    const buttonElement = screen.getByText("+");
    expect(buttonElement).toBeInTheDocument;
  });
});
