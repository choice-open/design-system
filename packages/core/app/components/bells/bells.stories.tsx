import { LayoutWallpaper } from "@choiceform/icons-react"
import type { StoryObj } from "@storybook/react"
import React from "react"
import { toast as sonnerToast, Toaster } from "sonner"
import { tcx } from "../../utils"
import { Button } from "../button"
import { Chip } from "../chip"
import { bells } from "./bells"

const meta = {
  title: "Status/Bells",
  component: bells,
  tags: ["new"],
}

export default meta
type Story = StoryObj<
  typeof meta & {
    args: {
      icon: React.ReactNode
      text: string
      actions: (id: string | number) => {
        action?: { label: string; onClick: () => void }
        dismiss?: { label: string; onClick: () => void }
      }
    }
  }
>

/**
 * Bells (toasts/notifications) are used to provide timely feedback or status updates to users.
 *
 * Features:
 * - Supports rich content: text, icons, actions, and progress indicators.
 * - Multiple variants for semantic meaning: default, accent, danger, success, warning, assistive.
 * - Customizable with close buttons and multiple actions (e.g., dismiss, custom callbacks).
 * - Integrates with Sonner for toast management and positioning.
 *
 * Usage:
 * - Use bells to notify users of important events, confirmations, errors, or status changes.
 * - Combine with icons and actions for interactive notifications.
 * - Place the <Toaster /> component once in your app, typically near the root.
 *
 * Best Practices:
 * - Keep notification messages concise and actionable.
 * - Use semantic variants to match the type of feedback (e.g., success for completed actions, danger for errors).
 * - Avoid overwhelming users with too many notifications at once.
 * - Provide clear actions when user intervention is required.
 *
 * Accessibility:
 * - Ensure notifications are accessible to screen readers.
 * - Use sufficient color contrast for text and backgrounds.
 * - Provide accessible labels for interactive elements within notifications.
 */

/**
 * Basic: Demonstrates the Bells component with various configurations.
 * - Shows simple text notifications, notifications with icons, close buttons, actions, and progress indicators.
 * - Useful for understanding how to trigger different types of bells and combine features.
 * - Each button triggers a different bell configuration for demonstration purposes.
 */
export const Basic: Story = {
  render: function BasicStory() {
    return (
      <div className="flex gap-2 capitalize">
        <Toaster position="bottom-center" />
        <Button
          variant="secondary"
          onClick={() => {
            bells({
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            })
          }}
        >
          Render bell
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            bells({
              icon: <LayoutWallpaper />,
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            })
          }}
        >
          With icon
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            bells({
              icon: <LayoutWallpaper />,
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              onClose: (id) => {
                sonnerToast.dismiss(id)
              },
            })
          }}
        >
          With close button
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            bells({
              icon: <LayoutWallpaper />,
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              onClose: (id) => {
                sonnerToast.dismiss(id)
              },
              action: (id) => (
                <Chip
                  size="medium"
                  className="border-menu-boundary flex-none bg-transparent hover:bg-white/5"
                  onClick={() => {
                    sonnerToast.dismiss(id)
                  }}
                >
                  Action
                </Chip>
              ),
            })
          }}
        >
          With close button and action
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            bells({
              icon: <LayoutWallpaper />,
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              onClose: (id) => {
                sonnerToast.dismiss(id)
              },
              action: (id) => (
                <>
                  <Chip
                    size="medium"
                    className="border-menu-boundary flex-none bg-transparent hover:bg-white/5"
                    onClick={() => {
                      sonnerToast.dismiss(id)
                    }}
                  >
                    Action
                  </Chip>
                  <Chip
                    size="medium"
                    className="border-menu-boundary flex-none bg-transparent hover:bg-white/5"
                    onClick={() => {
                      sonnerToast.dismiss(id)
                    }}
                  >
                    Dismiss
                  </Chip>
                </>
              ),
              progress: true,
            })
          }}
        >
          With progress
        </Button>
      </div>
    )
  },
}

/**
 * Color: Demonstrates the different color variants for the Bells component.
 * - Shows how to use semantic variants: accent, danger, success, warning, assistive.
 * - Each button triggers a bell with a different color and an associated action.
 * - Useful for providing feedback that matches the context of the notification (e.g., error, success).
 */
export const Color: Story = {
  render: function ColorStory() {
    const colors = [
      {
        color: "accent",
        className: "bg-accent-background",
      },
      {
        color: "danger",
        className: "bg-danger-background",
      },
      {
        color: "success",
        className: "bg-success-background",
      },
      {
        color: "warning",
        className: "bg-warning-background text-gray-900",
      },
      {
        color: "assistive",
        className: "bg-assistive-background",
      },
    ]

    return (
      <div className="flex gap-2 capitalize">
        <Toaster position="bottom-center" />
        {colors.map((color) => (
          <Button
            key={color.color}
            variant="secondary"
            onClick={() => {
              bells({
                variant: color.color as
                  | "default"
                  | "accent"
                  | "success"
                  | "warning"
                  | "danger"
                  | "assistive",
                icon: <LayoutWallpaper />,
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                onClose: (id) => {
                  sonnerToast.dismiss(id)
                },
                action: (id) => (
                  <Chip
                    size="medium"
                    className={tcx(
                      "flex-none",
                      color.color === "default"
                        ? "border-menu-boundary bg-transparent hover:bg-white/5"
                        : "border-black/10 bg-black/40 shadow-sm hover:bg-black/50",
                    )}
                    onClick={() => {
                      sonnerToast.dismiss(id)
                    }}
                  >
                    {color.color}
                  </Chip>
                ),
                progress: true,
              })
            }}
          >
            {color.color} color
          </Button>
        ))}
      </div>
    )
  },
}
