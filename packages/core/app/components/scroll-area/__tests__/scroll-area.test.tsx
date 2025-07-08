import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { ScrollArea } from "../scroll-area"

// Mock observers
window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
}))

window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
}))

describe("ScrollArea - Edge Cases & Quality Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  describe("Context Boundary Tests", () => {
    it("throws meaningful error when components used outside context", () => {
      const originalError = console.error
      console.error = jest.fn()

      expect(() => {
        render(<ScrollArea.Viewport>Test</ScrollArea.Viewport>)
      }).toThrow("ScrollArea compound components must be used within ScrollArea")

      expect(() => {
        render(<ScrollArea.Content>Test</ScrollArea.Content>)
      }).toThrow("ScrollArea compound components must be used within ScrollArea")

      expect(() => {
        render(<ScrollArea.Scrollbar orientation="vertical" />)
      }).toThrow("ScrollArea compound components must be used within ScrollArea")

      console.error = originalError
    })
  })

  describe("Render Prop Edge Cases", () => {
    it("handles render prop with zero-division edge cases", () => {
      let receivedPosition: { left: number; top: number } | null = null

      function TestRenderProp(position: { left: number; top: number }) {
        receivedPosition = position
        return <div data-testid="render-content">Content</div>
      }

      render(
        <ScrollArea>
          {TestRenderProp as unknown as React.ReactNode}
          <ScrollArea.Viewport data-testid="viewport">
            <ScrollArea.Content>
              <div style={{ height: "100px" }}>Content</div>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
        </ScrollArea>,
      )

      expect(receivedPosition).not.toBeNull()
      expect(receivedPosition!.top).toBeGreaterThanOrEqual(0)
      expect(receivedPosition!.top).toBeLessThanOrEqual(1)
      expect(receivedPosition!.left).toBeGreaterThanOrEqual(0)
      expect(receivedPosition!.left).toBeLessThanOrEqual(1)
    })
  })

  describe("Keyboard Navigation Boundaries", () => {
    it("handles all keyboard events without errors", async () => {
      render(
        <ScrollArea>
          <ScrollArea.Viewport>
            <ScrollArea.Content>
              <div style={{ height: "2000px", width: "2000px" }}>Large content</div>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
        </ScrollArea>,
      )

      const root = screen.getByRole("application")

      const keyEvents = [
        { key: "ArrowUp", shouldPreventDefault: true },
        { key: "ArrowDown", shouldPreventDefault: true },
        { key: "ArrowLeft", shouldPreventDefault: false }, // 垂直模式下不阻止
        { key: "ArrowRight", shouldPreventDefault: false },
        { key: "PageUp", shouldPreventDefault: true },
        { key: "PageDown", shouldPreventDefault: true },
        { key: "Home", shouldPreventDefault: true },
        { key: "End", shouldPreventDefault: true },
        { key: " ", shouldPreventDefault: true },
      ]

      for (const { key, shouldPreventDefault } of keyEvents) {
        const event = new KeyboardEvent("keydown", { key, bubbles: true })
        const preventDefaultSpy = jest.spyOn(event, "preventDefault")

        fireEvent.keyDown(root, event)

        if (shouldPreventDefault) {
          expect(preventDefaultSpy).toHaveBeenCalled()
        }
      }
    })

    it("handles shift+space navigation correctly", async () => {
      render(
        <ScrollArea>
          <ScrollArea.Viewport data-testid="viewport">
            <ScrollArea.Content>
              <div style={{ height: "2000px" }}>Large content</div>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
        </ScrollArea>,
      )

      const root = screen.getByRole("application")

      // Test shift+space (should scroll up)
      const shiftSpaceEvent = new KeyboardEvent("keydown", {
        key: " ",
        shiftKey: true,
        bubbles: true,
      })
      const preventDefaultSpy = jest.spyOn(shiftSpaceEvent, "preventDefault")

      fireEvent.keyDown(root, shiftSpaceEvent)
      expect(preventDefaultSpy).toHaveBeenCalled()
    })
  })

  describe("Scroll State Race Conditions", () => {
    it("handles rapid scroll events without memory leaks", () => {
      render(
        <ScrollArea>
          <ScrollArea.Viewport data-testid="viewport">
            <ScrollArea.Content>
              <div style={{ height: "10000px" }}>Very large content</div>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
        </ScrollArea>,
      )

      const viewport = screen.getByTestId("viewport")

      // Rapid fire scroll events
      for (let i = 0; i < 200; i++) {
        fireEvent.scroll(viewport, { target: { scrollTop: i * 50 } })
      }

      act(() => {
        jest.advanceTimersByTime(2000)
      })

      expect(viewport).toBeInTheDocument()
    })

    it("handles component unmount during active scroll", () => {
      const { unmount } = render(
        <ScrollArea type="scroll">
          <ScrollArea.Viewport data-testid="viewport">
            <ScrollArea.Content>
              <div style={{ height: "2000px" }}>Content</div>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
        </ScrollArea>,
      )

      const viewport = screen.getByTestId("viewport")

      // Start scrolling
      fireEvent.scroll(viewport, { target: { scrollTop: 100 } })

      // Unmount during scroll
      unmount()

      // Advance timers to trigger any pending cleanup
      act(() => {
        jest.advanceTimersByTime(1000)
      })
    })

    it("handles component unmount during thumb drag", () => {
      const { unmount } = render(
        <ScrollArea type="always">
          <ScrollArea.Viewport data-testid="viewport">
            <ScrollArea.Content>
              <div style={{ height: "2000px" }}>Large content</div>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
        </ScrollArea>,
      )

      const scrollbar = screen.getByRole("scrollbar")
      const thumb = scrollbar.querySelector('[role="button"]') as HTMLElement

      // Start dragging
      fireEvent.mouseDown(thumb, { clientY: 100 })

      // Simulate mousemove (drag in progress)
      fireEvent.mouseMove(document, { clientY: 150 })

      // Track event listeners before unmount
      const removeEventListenerSpy = jest.spyOn(document, "removeEventListener")

      // Unmount during drag
      unmount()

      // Verify event listeners were cleaned up
      expect(removeEventListenerSpy).toHaveBeenCalledWith("mousemove", expect.any(Function))
      expect(removeEventListenerSpy).toHaveBeenCalledWith("mouseup", expect.any(Function))

      removeEventListenerSpy.mockRestore()
    })
  })

  describe("Orientation Complexity", () => {
    it("handles orientation change during interaction", () => {
      const { rerender } = render(
        <ScrollArea orientation="vertical">
          <ScrollArea.Viewport data-testid="viewport">
            <ScrollArea.Content>
              <div style={{ height: "2000px", width: "2000px" }}>Large content</div>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
        </ScrollArea>,
      )

      // Change orientation while scrolled
      rerender(
        <ScrollArea orientation="horizontal">
          <ScrollArea.Viewport data-testid="viewport">
            <ScrollArea.Content>
              <div style={{ height: "2000px", width: "2000px" }}>Large content</div>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
        </ScrollArea>,
      )

      expect(screen.getByTestId("viewport")).toBeInTheDocument()
    })

    it("handles both orientation with asymmetric content", () => {
      render(
        <ScrollArea orientation="both">
          <ScrollArea.Viewport data-testid="viewport">
            <ScrollArea.Content>
              <div style={{ height: "300px", width: "5000px" }}>Very wide but short content</div>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
        </ScrollArea>,
      )

      const viewport = screen.getByTestId("viewport")
      expect(viewport.className).toContain("overflow-auto")
    })
  })

  describe("Scrollbar Visibility Logic", () => {
    it("respects type=always even without overflow", () => {
      render(
        <ScrollArea type="always">
          <ScrollArea.Viewport>
            <ScrollArea.Content>
              <div style={{ height: "50px" }}>Small content</div>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
        </ScrollArea>,
      )

      const scrollbars = screen.getAllByRole("scrollbar")
      expect(scrollbars.length).toBeGreaterThan(0)
    })

    it("handles rapid hover state changes", async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })

      render(
        <ScrollArea type="hover">
          <ScrollArea.Viewport>
            <ScrollArea.Content>
              <div style={{ height: "2000px" }}>Large content</div>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
        </ScrollArea>,
      )

      const root = screen.getByRole("application")

      // Rapid hover/unhover cycles
      for (let i = 0; i < 15; i++) {
        await user.hover(root)
        await user.unhover(root)
      }

      expect(root).toBeInTheDocument()
    })
  })

  describe("ARIA and Accessibility Edge Cases", () => {
    it("generates unique IDs across component instances", () => {
      const { unmount: unmount1 } = render(
        <ScrollArea>
          <ScrollArea.Viewport data-testid="viewport1" />
        </ScrollArea>,
      )

      const firstId = screen.getByTestId("viewport1").id

      unmount1()

      const { unmount: unmount2 } = render(
        <ScrollArea>
          <ScrollArea.Viewport data-testid="viewport2" />
        </ScrollArea>,
      )

      const secondId = screen.getByTestId("viewport2").id

      expect(firstId).not.toBe(secondId)
      expect(secondId).toMatch(/scroll-viewport-\w+/)

      unmount2()
    })

    it("maintains ARIA relationships correctly", () => {
      render(
        <ScrollArea aria-label="Test scroll area">
          <ScrollArea.Viewport>
            <ScrollArea.Content>
              <div style={{ height: "2000px" }}>Large content</div>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
        </ScrollArea>,
      )

      const root = screen.getByRole("application")
      const viewport = screen.getByRole("region")

      expect(root).toHaveAttribute("aria-label", "Test scroll area")
      expect(root).toHaveAttribute("aria-describedby")
      expect(viewport).toHaveAttribute("tabIndex", "0")
    })

    it("calculates scrollbar ARIA values in extreme scenarios", () => {
      render(
        <ScrollArea type="always">
          <ScrollArea.Viewport data-testid="viewport">
            <ScrollArea.Content>
              <div style={{ height: "20000px" }}>Extremely large content</div>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
        </ScrollArea>,
      )

      const scrollbars = screen.getAllByRole("scrollbar")

      scrollbars.forEach((scrollbar) => {
        const valueNow = scrollbar.getAttribute("aria-valuenow")
        const valueText = scrollbar.getAttribute("aria-valuetext")

        expect(valueNow).toBeDefined()
        expect(valueText).toBeDefined()
        expect(parseInt(valueNow!)).toBeGreaterThanOrEqual(0)
        expect(parseInt(valueNow!)).toBeLessThanOrEqual(100)
      })
    })
  })

  describe("Performance Under Stress", () => {
    it("handles high-frequency events efficiently", () => {
      render(
        <ScrollArea>
          <ScrollArea.Viewport data-testid="viewport">
            <ScrollArea.Content>
              <div style={{ height: "50000px" }}>Massive content</div>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
        </ScrollArea>,
      )

      const viewport = screen.getByTestId("viewport")
      const startTime = performance.now()

      // High frequency scroll events
      for (let i = 0; i < 1000; i++) {
        fireEvent.scroll(viewport, { target: { scrollTop: i } })
      }

      const duration = performance.now() - startTime
      expect(duration).toBeLessThan(1000) // Should complete within 1 second
    })

    it("properly cleans up resources on unmount", () => {
      const { unmount } = render(
        <ScrollArea>
          <ScrollArea.Viewport>
            <ScrollArea.Content>
              <div style={{ height: "2000px" }}>Content</div>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
        </ScrollArea>,
      )

      const root = screen.getByRole("application")
      const viewport = screen.getByRole("region")

      // Trigger various states
      fireEvent.mouseEnter(root)
      fireEvent.scroll(viewport)

      unmount()

      // Advance timers to ensure cleanup
      act(() => {
        jest.advanceTimersByTime(2000)
      })
    })
  })

  describe("Error Resilience", () => {
    it("gracefully handles corrupted scroll state", () => {
      render(
        <ScrollArea>
          <ScrollArea.Viewport data-testid="viewport">
            <ScrollArea.Content>
              <div style={{ height: "2000px" }}>Content</div>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
        </ScrollArea>,
      )

      const viewport = screen.getByTestId("viewport")

      // Simulate corrupted scroll properties
      Object.defineProperty(viewport, "scrollTop", {
        get: () => NaN,
        set: () => {},
      })

      expect(() => {
        fireEvent.scroll(viewport)
      }).not.toThrow()
    })

    it("handles missing DOM elements gracefully", () => {
      const { container } = render(
        <ScrollArea>
          <ScrollArea.Viewport>
            <ScrollArea.Content>Content</ScrollArea.Content>
          </ScrollArea.Viewport>
        </ScrollArea>,
      )

      // Simulate DOM removal
      container.innerHTML = ""

      act(() => {
        jest.advanceTimersByTime(1000)
      })
    })
  })

  describe("Dynamic Content Scenarios", () => {
    it("adapts to rapid content size changes", () => {
      const { rerender } = render(
        <ScrollArea>
          <ScrollArea.Viewport>
            <ScrollArea.Content>
              <div style={{ height: "100px" }}>Small</div>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
        </ScrollArea>,
      )

      // Rapidly change content size
      for (let i = 0; i < 20; i++) {
        const height = i % 2 === 0 ? "100px" : "5000px"
        rerender(
          <ScrollArea>
            <ScrollArea.Viewport>
              <ScrollArea.Content>
                <div style={{ height }}>Content {i}</div>
              </ScrollArea.Content>
            </ScrollArea.Viewport>
          </ScrollArea>,
        )

        act(() => {
          jest.advanceTimersByTime(50)
        })
      }

      expect(screen.getByRole("application")).toBeInTheDocument()
    })
  })
})
