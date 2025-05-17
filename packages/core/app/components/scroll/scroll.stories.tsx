import type { Meta, StoryObj } from "@storybook/react"
import { useMemo } from "react"
import { Scroll } from "./scroll"
import React from "react"
import { Modal } from "../modal"

const meta: Meta<typeof Scroll> = {
  title: "Layouts/Scroll",
  component: Scroll,
  tags: ["new"],
}

export default meta

type Story = StoryObj<typeof Scroll>

/**
 * `Scroll` is a customizable scrollable container component with enhanced scrollbar functionality.
 *
 * Features:
 * - Custom-styled scrollbars with different appearance modes
 * - Responsive scrolling behavior
 * - Supports both vertical and horizontal scrolling
 * - Integration with other components like Modal
 * - Virtualized scrolling for performance
 * - Customizable viewport and scrollbar styling
 *
 * Usage Guidelines:
 * - Use for content areas that need scrolling with custom scrollbar appearance
 * - Always specify explicit height for the container
 * - Define appropriate scrollbar mode for your use case
 * - Use Scroll.Viewport for the scrollable content
 * - Apply appropriate padding inside the viewport
 *
 * Accessibility:
 * - Maintains keyboard scrolling functionality
 * - Provides visual focus indicators
 * - Supports screen reader announcements
 * - Adheres to proper contrast ratios
 * - Preserves standard scrolling behaviors for assistive technologies
 */

/**
 * Basic: Demonstrates the simplest Scroll implementation.
 *
 * Features:
 * - Standard scrollbar appearance
 * - Vertical scrolling with large content
 * - Fixed container dimensions
 *
 * This example shows the fundamental usage pattern with a viewport
 * containing a large number of items. The component requires explicit
 * height and width, with overflow handling.
 */
export const Basic: Story = {
  render: function BasicStory() {
    const contents = useMemo(() => {
      return Array.from({ length: 100 }, (_, i) => <div key={i}>{i}</div>)
    }, [])

    return (
      <Scroll className="h-64 w-64 overflow-hidden">
        <Scroll.Viewport className="h-full">
          <Scroll.Content>{contents}</Scroll.Content>
        </Scroll.Viewport>
      </Scroll>
    )
  },
}

/**
 * InModal: Demonstrates using Scroll within a Modal component.
 *
 * Features:
 * - Integration with Modal component
 * - Enhanced scrollbar appearance with 'large-y' mode
 * - Properly contained scrolling area
 *
 * This pattern is useful for:
 * - Modal dialogs with large content
 * - Maintaining fixed modal size while allowing content scrolling
 * - Forms or data displays that exceed available modal space
 *
 * The 'large-y' scrollbar mode provides a more prominent vertical scrollbar
 * that's easier to interact with in modal contexts.
 */
export const InModal: Story = {
  render: function InModalStory() {
    const contents = useMemo(() => {
      return Array.from({ length: 100 }, (_, i) => <div key={i}>{i}</div>)
    }, [])

    return (
      <Modal>
        <Modal.Content className="h-64 w-64 overflow-hidden">
          <Scroll
            className="h-64 overflow-hidden"
            scrollbarMode="large-y"
          >
            <Scroll.Viewport className="h-full p-4">
              <Scroll.Content>{contents}</Scroll.Content>
            </Scroll.Viewport>
          </Scroll>
        </Modal.Content>
      </Modal>
    )
  },
}

/**
 * InModalWithHeader: Demonstrates Scroll within a Modal that has a header.
 *
 * Features:
 * - Modal with header and scrollable content area
 * - 'large-b' scrollbar mode for combined scrollbar experience
 * - Proper spacing with internal padding
 *
 * This pattern is useful for:
 * - Content panels with clear section headers
 * - Document viewers or content browsers
 * - Settings or configuration panels with many options
 *
 * The 'large-b' scrollbar mode provides enhanced scrollbars for both
 * horizontal and vertical directions when needed.
 */
export const InModalWithHeader: Story = {
  render: function InModalWithHeaderStory() {
    const contents = useMemo(() => {
      return Array.from({ length: 100 }, (_, i) => <div key={i}>{i}</div>)
    }, [])

    return (
      <Modal>
        <Modal.Header title="Scroll" />
        <Modal.Content className="h-64 w-64 overflow-hidden">
          <Scroll
            className="h-64 overflow-hidden"
            scrollbarMode="large-b"
          >
            <Scroll.Viewport className="h-full p-4">
              <Scroll.Content>{contents}</Scroll.Content>
            </Scroll.Viewport>
          </Scroll>
        </Modal.Content>
      </Modal>
    )
  },
}
