import { LayoutWallpaper } from "@choiceform/icons-react"
import type { StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { toast as sonnerToast, Toaster } from "sonner"
import { Button } from "../button"
import { Dialog } from "../dialog"
import { notifications } from "./notifications"

const meta = {
  title: "Status/Notifications",
  component: notifications,
  tags: ["new"],
}

export default meta
type Story = StoryObj<
  typeof meta & {
    args: {
      icon: React.ReactNode
      text: string
      actions: {
        action: { label: string; onClick: () => void }
        dismiss: { label: string; onClick: () => void }
      }
    }
  }
>

/**
 * `Notifications` is a versatile toast-style notification system for displaying temporary messages and alerts.
 *
 * Features:
 * - Non-intrusive toast-style notifications
 * - Customizable duration and placement
 * - Support for icons to enhance visual context
 * - Action buttons for user interaction
 * - Dismiss functionality for user control
 * - Automatic dismissal after timeout
 * - Built on Sonner toast library for reliability
 *
 * Usage Guidelines:
 * - Use for non-critical feedback and updates
 * - Keep messages concise and actionable
 * - Include icons to provide visual context
 * - Add action buttons for common responses
 * - Always provide a way to dismiss notifications
 * - Consider duration based on message importance
 *
 * Accessibility:
 * - Notifications are announced to screen readers
 * - Focus management for interactive notifications
 * - Timeout periods consider reading time
 * - Proper contrast for all notification variants
 * - Keyboard accessible actions and dismiss controls
 */

/**
 * Basic: Demonstrates the Notifications component with various configurations.
 *
 * Features:
 * - Simple notification with icon and text
 * - Notification with a single action button
 * - Notification with both action and dismiss buttons
 * - Integration with Dialog component for action follow-up
 *
 * This example showcases three common notification patterns:
 * 1. Basic informational notification
 * 2. Notification with a primary action
 * 3. Notification with both primary and dismiss actions
 *
 * The notifications appear in the bottom-right corner of the screen
 * and automatically dismiss after a timeout period, or when the user
 * takes an action.
 */
export const Basic: Story = {
  render: function BasicStory() {
    const [open, setOpen] = useState(false)
    return (
      <div className="flex gap-4">
        <Toaster position="bottom-right" />

        <Dialog
          open={open}
          onOpenChange={setOpen}
        >
          <Dialog.Header title="Lorem ipsum dolor sit amet" />
          <Dialog.Content className="w-96 p-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Dialog.Content>
        </Dialog>

        <Button
          variant="secondary"
          onClick={() => {
            notifications({
              icon: <LayoutWallpaper />,
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            })
          }}
        >
          Basic Notification
        </Button>

        <Button
          variant="secondary"
          onClick={() => {
            notifications({
              icon: <LayoutWallpaper />,
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              actions: (id) => ({
                action: {
                  content: "Reply",
                  onClick: () => {
                    setOpen(true)
                    sonnerToast.dismiss(id)
                  },
                },
              }),
            })
          }}
        >
          Notification with actions
        </Button>

        <Button
          variant="secondary"
          onClick={() => {
            notifications({
              icon: <LayoutWallpaper />,
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              actions: (id) => ({
                action: {
                  content: "Reply",
                  onClick: () => {
                    setOpen(true)
                    sonnerToast.dismiss(id)
                  },
                },
                dismiss: {
                  content: "Dismiss",
                  onClick: () => {
                    sonnerToast.dismiss(id)
                  },
                },
              }),
            })
          }}
        >
          Notification with actions and dismiss
        </Button>
      </div>
    )
  },
}
