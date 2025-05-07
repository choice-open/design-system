import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { EmojiPicker, EmojiData } from "./index"
import { Popover } from "../popover"
import { IconButton } from "../icon-button"
import { RatingSmileRegular } from "@choiceform/icons-react"

const meta = {
  title: "EmojiPicker",
  component: EmojiPicker,
} satisfies Meta<typeof EmojiPicker>

export default meta
type Story = StoryObj<typeof meta>

// 基础示例 - 直接显示 Emoji Picker
export const Basic: Story = {
  render: function BasicStory() {
    return (
      <div className="p-4">
        <EmojiPicker />
      </div>
    )
  },
}

// 结合 Popover 使用
export const WithPopover: Story = {
  render: function PopoverStory() {
    const [selectedEmoji, setSelectedEmoji] = useState<string>("")
    const [open, setOpen] = useState(false)

    const handleEmojiSelect = (emoji: EmojiData) => {
      setSelectedEmoji(emoji.native)
    }

    return (
      <>
        <Popover
          open={open}
          onOpenChange={setOpen}
        >
          <Popover.Trigger>
            <IconButton className="text-lg">{selectedEmoji || <RatingSmileRegular />}</IconButton>
          </Popover.Trigger>
          <Popover.Content className="overflow-hidden p-0">
            <EmojiPicker
              onEmojiSelect={(emoji) => {
                handleEmojiSelect(emoji)
                setOpen(false)
              }}
            />
          </Popover.Content>
        </Popover>
      </>
    )
  },
}
