import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import React from "react"
import { Dropdown } from "../dropdown"

describe("Dropdown with Content", () => {
  it("renders correctly with Content component", () => {
    render(
      <Dropdown>
        <Dropdown.Trigger>Trigger</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item>Item 1</Dropdown.Item>
          <Dropdown.Item>Item 2</Dropdown.Item>
          <Dropdown.Item>Item 3</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>,
    )

    expect(screen.getByText("Trigger")).toBeInTheDocument()
  })
})
