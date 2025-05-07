import { LayoutWallpaper } from "@choiceform/icons-react"
import type { StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { toast as sonnerToast, Toaster } from "sonner"
import { Button } from "../button"
import { Dialog } from "../dialog"
import { notifications } from "./notifications"
const meta = {
  title: "Notifications",
  component: notifications,
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
