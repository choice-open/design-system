import { debounce } from "lodash-es"
import { useCallback, useMemo, useState } from "react"
import { Descendant } from "slate"
import type { ContextInputValue, MentionMatch } from "../types"
import { extractMentionContext, extractTextWithMentions, parseTextWithMentions } from "../utils"

interface UseContextInputProps {
  onChange?: (value: ContextInputValue) => void
  value?: ContextInputValue
}

export const useContextInput = ({ value, onChange }: UseContextInputProps) => {
  // 内部状态
  const [slateValue, setSlateValue] = useState<Descendant[]>(() => {
    // 从 value 初始化 Slate 值
    if (value?.text) {
      return parseTextWithMentions(value.text, value.mentions || [])
    }
    return [{ type: "paragraph", children: [{ text: "" }] }]
  })

  // 防抖的 onChange 回调
  const debouncedOnChange = useMemo(
    () =>
      debounce((newValue: ContextInputValue) => {
        onChange?.(newValue)
      }, 100),
    [onChange],
  )

  // 处理编辑器值变化
  const handleChange = useCallback(
    (newValue: Descendant[]) => {
      setSlateValue(newValue)

      // 使用自定义提取函数
      const { text, mentionsData } = extractTextWithMentions(newValue)
      const mentions: MentionMatch[] = []

      // 处理 mentions 数据
      for (const { element, startIndex, endIndex } of mentionsData) {
        // 提取上下文
        const context = extractMentionContext(text, startIndex, endIndex)

        mentions.push({
          item: {
            id: element.mentionId,
            type: element.mentionType,
            label: element.mentionLabel,
            metadata: element.mentionData,
          },
          startIndex,
          endIndex,
          text: element.mentionLabel,
          context: {
            fullContext: context.fullContext,
            mentionText: context.mentionText,
          },
        })
      }

      debouncedOnChange({ text, mentions })
    },
    [debouncedOnChange],
  )

  return {
    slateValue,
    handleChange,
  }
}
