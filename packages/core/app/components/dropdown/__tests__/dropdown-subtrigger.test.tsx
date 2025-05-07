import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import React from "react"
import { Dropdown } from "../dropdown"

describe("DropdownSubTrigger Component", () => {
  it("opens submenu when Enter key is pressed", async () => {
    render(
      <Dropdown>
        <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
        <Dropdown.Item>Option 1</Dropdown.Item>
        <Dropdown>
          <Dropdown.SubTrigger>Submenu</Dropdown.SubTrigger>
          <Dropdown.Item>Submenu Item</Dropdown.Item>
        </Dropdown>
      </Dropdown>,
    )

    // Open main dropdown
    fireEvent.click(screen.getByText("Open Menu"))

    // Navigate to submenu trigger
    await waitFor(() => {
      const items = screen.getAllByRole("menuitem")
      expect(items[0].textContent).toBe("Option 1")
      expect(document.activeElement).toBe(items[0])
    })

    // Press arrow down to navigate to submenu trigger
    fireEvent.keyDown(document.activeElement!, { key: "ArrowDown" })

    // Focus should be on submenu trigger
    await waitFor(() => {
      expect(document.activeElement?.textContent).toBe("Submenu")
    })

    // Press Enter to open submenu
    fireEvent.keyDown(document.activeElement!, { key: "Enter" })

    // Submenu should be open and focus should be on first submenu item
    await waitFor(() => {
      expect(screen.getByText("Submenu Item")).toBeInTheDocument()
      expect(document.activeElement?.textContent).toBe("Submenu Item")
    })
  })

  it("opens submenu when ArrowRight key is pressed", async () => {
    render(
      <Dropdown>
        <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
        <Dropdown.Item>Option 1</Dropdown.Item>
        <Dropdown>
          <Dropdown.SubTrigger>Submenu</Dropdown.SubTrigger>
          <Dropdown.Item>Submenu Item</Dropdown.Item>
        </Dropdown>
      </Dropdown>,
    )

    // Open main dropdown
    fireEvent.click(screen.getByText("Open Menu"))

    // Navigate to submenu trigger
    await waitFor(() => {
      const items = screen.getAllByRole("menuitem")
      expect(document.activeElement).toBe(items[0])
    })

    // Press arrow down to navigate to submenu trigger
    fireEvent.keyDown(document.activeElement!, { key: "ArrowDown" })

    // Focus should be on submenu trigger
    await waitFor(() => {
      expect(document.activeElement?.textContent).toBe("Submenu")
    })

    // Press ArrowRight to open submenu
    fireEvent.keyDown(document.activeElement!, { key: "ArrowRight" })

    // Submenu should be open and focus should be on first submenu item
    await waitFor(() => {
      expect(screen.getByText("Submenu Item")).toBeInTheDocument()
      expect(document.activeElement?.textContent).toBe("Submenu Item")
    })
  })

  it("has correct accessibility attributes", async () => {
    render(
      <Dropdown>
        <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
        <Dropdown>
          <Dropdown.SubTrigger>Submenu</Dropdown.SubTrigger>
          <Dropdown.Item>Submenu Item</Dropdown.Item>
        </Dropdown>
      </Dropdown>,
    )

    // Open main dropdown
    fireEvent.click(screen.getByText("Open Menu"))

    // Check accessibility attributes on the SubTrigger
    await waitFor(() => {
      const subTrigger = screen.getByText("Submenu")
      expect(subTrigger.closest("button")).toHaveAttribute("aria-haspopup", "menu")
      expect(subTrigger.closest("button")).toHaveAttribute("aria-expanded", "false")
    })
  })
})
