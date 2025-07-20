import React, { useState, useContext } from "react"
import { Check, CopySmall } from "@choiceform/icons-react"
import { IconButton } from "../../../icon-button"
import { ContextInputEditorContext } from "../../hooks"
import { convertSlateToText } from "../../utils"
import type { Descendant } from "slate"

export interface CopyButtonProps {
  /** 是否禁用 */
  disabled?: boolean
  /** 点击回调 */
  onClick?: (copiedText: string) => void
  /** 按钮尺寸 */
  size?: "default" | "large"
  /** 成功状态持续时间 (ms) */
  successDuration?: number
}

export function CopyButton({
  size = "default",
  disabled = false,
  successDuration = 2000,
  onClick,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const editor = useContext(ContextInputEditorContext)

  const handleCopy = async () => {
    if (!editor) {
      console.warn("CopyButton must be used within ContextInput")
      return
    }

    try {
      // 转换SlateJS内容为字符串
      const textContent = convertSlateToText(editor.children)

      // 复制到剪贴板
      await navigator.clipboard.writeText(textContent)

      // 设置成功状态
      setCopied(true)

      // 触发回调
      onClick?.(textContent)

      // 重置状态
      setTimeout(() => setCopied(false), successDuration)
    } catch (error) {
      console.error("Failed to copy content:", error)
    }
  }

  return (
    <IconButton
      size={size}
      disabled={disabled}
      onClick={handleCopy}
      aria-label={copied ? "已复制" : "复制内容"}
      variant={copied ? "solid" : "ghost"}
    >
      {copied ? <Check /> : <CopySmall />}
    </IconButton>
  )
}
