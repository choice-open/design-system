import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import React from "react"
import { vi } from "vitest"
import { Dropdown } from "../dropdown"

// Create a custom matcher for testing
expect.extend({
  toBeRenderedWithOptions(element, options) {
    const container = element.parentElement

    const menuItems = container?.querySelectorAll('[role="menuitem"]')
    // Convert NodeList to array and extract text content
    const menuItemTexts: (string | null)[] = []
    menuItems?.forEach((item) => menuItemTexts.push(item.textContent))

    const pass = options.every((option) => menuItemTexts.includes(option))

    return {
      pass,
      message: () =>
        pass
          ? `Expected dropdown not to have options: ${options.join(", ")}`
          : `Expected dropdown to have options: ${options.join(", ")}, but found: ${menuItemTexts.join(", ")}`,
    }
  },
})

describe("Dropdown Component", () => {
  // Basic functionality tests
  describe("Basic Functionality", () => {
    it("renders trigger correctly", () => {
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Item>Option 1</Dropdown.Item>
        </Dropdown>,
      )

      expect(screen.getByText("Open Menu")).toBeInTheDocument()
    })

    it("opens dropdown when trigger is clicked", async () => {
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Item>Option 1</Dropdown.Item>
          <Dropdown.Item>Option 2</Dropdown.Item>
        </Dropdown>,
      )

      // Menu should be closed initially
      expect(screen.queryByText("Option 1")).not.toBeInTheDocument()

      // Click the trigger
      fireEvent.click(screen.getByText("Open Menu"))

      // Now menu should be open
      await waitFor(() => {
        expect(screen.getByText("Option 1")).toBeInTheDocument()
        expect(screen.getByText("Option 2")).toBeInTheDocument()
      })
    })

    it("closes dropdown when item is clicked", async () => {
      const handleClick = vi.fn()
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Item onClick={handleClick}>Option 1</Dropdown.Item>
        </Dropdown>,
      )

      // Open dropdown
      fireEvent.click(screen.getByText("Open Menu"))

      // Click on an item
      await waitFor(() => {
        fireEvent.click(screen.getByText("Option 1"))
      })

      // Menu should be closed
      await waitFor(() => {
        expect(screen.queryByText("Option 1")).not.toBeInTheDocument()
      })

      // Verify that onClick handler was called
      expect(handleClick).toHaveBeenCalled()
    })

    it("supports controlled open state", () => {
      const { rerender } = render(
        <Dropdown open={true}>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Item>Option 1</Dropdown.Item>
        </Dropdown>,
      )

      // Menu should be open
      expect(screen.getByText("Option 1")).toBeInTheDocument()

      // Change open prop to false
      rerender(
        <Dropdown open={false}>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Item>Option 1</Dropdown.Item>
        </Dropdown>,
      )

      // Menu should be closed
      expect(screen.queryByText("Option 1")).not.toBeInTheDocument()
    })
  })

  // Keyboard navigation tests
  describe("Keyboard Navigation", () => {
    it("allows navigation using arrow keys", async () => {
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Item>Option 1</Dropdown.Item>
          <Dropdown.Item>Option 2</Dropdown.Item>
          <Dropdown.Item>Option 3</Dropdown.Item>
        </Dropdown>,
      )

      // Open dropdown
      fireEvent.click(screen.getByText("Open Menu"))

      // Initial focus should be on the first item
      await waitFor(() => {
        const items = screen.getAllByRole("menuitem")
        expect(document.activeElement).toBe(items[0])
      })

      // Press arrow down
      fireEvent.keyDown(document.activeElement!, { key: "ArrowDown" })

      // Focus should move to the second item
      await waitFor(() => {
        const items = screen.getAllByRole("menuitem")
        expect(document.activeElement).toBe(items[1])
      })

      // Press arrow down again
      fireEvent.keyDown(document.activeElement!, { key: "ArrowDown" })

      // Focus should move to the third item
      await waitFor(() => {
        const items = screen.getAllByRole("menuitem")
        expect(document.activeElement).toBe(items[2])
      })

      // Press arrow up
      fireEvent.keyDown(document.activeElement!, { key: "ArrowUp" })

      // Focus should move back to the second item
      await waitFor(() => {
        const items = screen.getAllByRole("menuitem")
        expect(document.activeElement).toBe(items[1])
      })
    })

    it("closes dropdown when Escape key is pressed", async () => {
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Item>Option 1</Dropdown.Item>
        </Dropdown>,
      )

      // Open dropdown
      fireEvent.click(screen.getByText("Open Menu"))

      // Menu should be open
      await waitFor(() => {
        expect(screen.getByText("Option 1")).toBeInTheDocument()
      })

      // Press Escape
      fireEvent.keyDown(document.activeElement!, { key: "Escape" })

      // Menu should be closed
      await waitFor(() => {
        expect(screen.queryByText("Option 1")).not.toBeInTheDocument()
      })
    })
  })

  // Nested dropdown tests
  describe("Nested Dropdowns", () => {
    it("opens submenu when SubTrigger is clicked", async () => {
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Item>Option 1</Dropdown.Item>
          <Dropdown>
            <Dropdown.SubTrigger>Submenu</Dropdown.SubTrigger>
            <Dropdown.Item>Submenu Item 1</Dropdown.Item>
            <Dropdown.Item>Submenu Item 2</Dropdown.Item>
          </Dropdown>
        </Dropdown>,
      )

      // Open main dropdown
      fireEvent.click(screen.getByText("Open Menu"))

      // Submenu trigger should be visible
      await waitFor(() => {
        expect(screen.getByText("Submenu")).toBeInTheDocument()
      })

      // Click submenu trigger
      fireEvent.click(screen.getByText("Submenu"))

      // Submenu items should be visible
      await waitFor(() => {
        expect(screen.getByText("Submenu Item 1")).toBeInTheDocument()
        expect(screen.getByText("Submenu Item 2")).toBeInTheDocument()
      })
    })

    it("opens submenu with keyboard navigation", async () => {
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Item>Option 1</Dropdown.Item>
          <Dropdown>
            <Dropdown.SubTrigger>Submenu</Dropdown.SubTrigger>
            <Dropdown.Item>Submenu Item 1</Dropdown.Item>
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

      // Press right arrow to open submenu
      fireEvent.keyDown(document.activeElement!, { key: "ArrowRight" })

      // Submenu should be open and focus should be on first submenu item
      await waitFor(() => {
        expect(screen.getByText("Submenu Item 1")).toBeInTheDocument()
        expect(document.activeElement?.textContent).toBe("Submenu Item 1")
      })
    })
  })

  // Selection functionality tests
  describe("Selection Functionality", () => {
    it("displays selection indicator for selected items", async () => {
      render(
        <Dropdown selection={true}>
          <Dropdown.Trigger>Select Item</Dropdown.Trigger>
          <Dropdown.Item selected={true}>Selected Option</Dropdown.Item>
          <Dropdown.Item>Unselected Option</Dropdown.Item>
        </Dropdown>,
      )

      // Open dropdown
      fireEvent.click(screen.getByText("Select Item"))

      // The selected item should have a selection indicator
      await waitFor(() => {
        const selectedItem = screen.getByText("Selected Option")
        // Check for selection indicator presence - would depend on your implementation
        // This might need adjustment based on your actual implementation
        expect(selectedItem.closest('[role="menuitem"]')).toHaveAttribute("aria-selected", "true")
      })
    })
  })

  // Additional features tests
  describe("Additional Features", () => {
    it("renders dividers correctly", async () => {
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Item>Group 1 Item</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Group 2 Item</Dropdown.Item>
        </Dropdown>,
      )

      // Open dropdown
      fireEvent.click(screen.getByText("Open Menu"))

      // Divider should exist
      await waitFor(() => {
        const divider = document.querySelector(".h-px")
        expect(divider).toBeInTheDocument()
      })
    })

    it("renders dropdown label correctly", async () => {
      render(
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Label>Group Label</Dropdown.Label>
          <Dropdown.Item>Item</Dropdown.Item>
        </Dropdown>,
      )

      // Open dropdown
      fireEvent.click(screen.getByText("Open Menu"))

      // Label should be visible
      await waitFor(() => {
        expect(screen.getByText("Group Label")).toBeInTheDocument()
      })
    })
  })
})
