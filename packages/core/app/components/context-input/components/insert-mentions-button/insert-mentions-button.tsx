import { ApplyVariable } from "@choiceform/icons-react"
import React from "react"
import { Transforms } from "slate"
import { ReactEditor } from "slate-react"
import { tcx } from "~/utils"
import { IconButton } from "../../../icon-button"
import { useContextInputEditor } from "../../hooks"
import { insertMentionsButtonTv } from "./tv"

interface InsertMentionsButtonProps {
  className?: string
  disabled?: boolean
  onClick?: () => void
  size?: "default" | "large" | "reset"
  variant?: "default" | "secondary" | "solid" | "highlight" | "ghost" | "dark" | "reset"
}

export const InsertMentionsButton = React.memo(function InsertMentionsButton({
  className,
  disabled = false,
  variant = "ghost",
  size = "default",
  onClick,
}: InsertMentionsButtonProps) {
  const editor = useContextInputEditor()
  const tv = insertMentionsButtonTv()

  const handleInsertMention = () => {
    try {
      // 确保编辑器有焦点
      ReactEditor.focus(editor)

      // 在当前光标位置插入 @ 符号
      Transforms.insertText(editor, "@")

      // 触发回调
      onClick?.()
    } catch (error) {
      console.warn("Failed to insert mention trigger:", error)
    }
  }

  return (
    <IconButton
      variant={variant}
      size={size}
      disabled={disabled}
      className={tcx(tv.button(), className)}
      onClick={handleInsertMention}
      aria-label="插入提及"
      title="插入 @"
    >
      <ApplyVariable />
    </IconButton>
  )
})
