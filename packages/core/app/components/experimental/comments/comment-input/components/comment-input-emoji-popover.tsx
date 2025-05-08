import { useMemo } from "react"
import { EmojiData, EmojiPicker, Popover } from "~/components"

interface CommentInputEmojiPopoverProps {
  setSelectedEmoji: (emoji: string) => void
  anchorRect: React.RefObject<HTMLButtonElement>
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const CommentInputEmojiPopover = ({
  setSelectedEmoji,
  anchorRect,
  open = false,
  onOpenChange,
}: CommentInputEmojiPopoverProps) => {
  const handleEmojiSelect = (emoji: EmojiData) => {
    setSelectedEmoji(emoji.native)

    if (onOpenChange) {
      onOpenChange(false)
    }
  }

  const emojiPickerContent = useMemo(
    () => (
      <EmojiPicker
        onEmojiSelect={(emoji) => {
          handleEmojiSelect(emoji)
        }}
      />
    ),
    [handleEmojiSelect],
  )

  return (
    <Popover
      open={open}
      onOpenChange={onOpenChange}
      triggerRef={anchorRect}
    >
      <Popover.Content className="overflow-hidden p-0">{emojiPickerContent}</Popover.Content>
    </Popover>
  )
}
