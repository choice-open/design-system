import { LayoutWallpaper } from "@choiceform/icons-react"
import type { StoryObj } from "@storybook/react"
import React from "react"
import { toast as sonnerToast, Toaster } from "sonner"
import { tcx } from "../../utils"
import { Button } from "../button"
import { Chip } from "../chip"
import { bells } from "./bells"

const meta = {
  title: "Bells",
  component: bells,
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
 * Bells are used to call attention to status, and come in a strong “filled” and light “outline” form.
 * We typically use them to call attention to things like “New” or “Beta” features, descriptions like “Added”, “Removed”, and labels for individuals, like “Admin”.
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
 * Our toasts come in various shapes and sizes.
 * Here are some examples that could be useful for conveying feedback on user-initiated actions.
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
