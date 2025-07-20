import React, { useCallback } from "react"
import { Descendant, Editor, Element as SlateElement, Node } from "slate"
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  RenderPlaceholderProps,
  Slate,
  useFocused,
  useSelected,
} from "slate-react"
import { Badge } from "../../badge"
import { ScrollArea } from "../../scroll-area"
import { contextInputTv } from "../tv"
import type { ContextInputProps, ContextMentionElement, MentionMatch } from "../types"

interface SlateEditorProps
  extends Pick<
    ContextInputProps,
    | "placeholder"
    | "disabled"
    | "autoFocus"
    | "variant"
    | "renderMention"
    | "onFocus"
    | "onBlur"
    | "className"
    | "maxLength"
  > {
  editor: Editor
  hasHeader: boolean
  onChange: (value: Descendant[]) => void
  onKeyDown: (event: React.KeyboardEvent) => void
  slateValue: Descendant[]
}

export const SlateEditor = React.forwardRef<HTMLDivElement, SlateEditorProps>(function SlateEditor(
  {
    editor,
    slateValue,
    placeholder = "输入消息...",
    disabled = false,
    autoFocus = false,
    variant = "default",
    renderMention,
    className,
    maxLength,
    onChange,
    onKeyDown,
    onFocus,
    onBlur,
    hasHeader,
    ...props
  },
  ref,
) {
  const tv = contextInputTv({ variant, disabled, hasHeader })

  const selected = useSelected()
  const focused = useFocused()

  // 渲染 Mention 元素
  const renderElement = useCallback(
    (props: RenderElementProps) => {
      const { attributes, children, element } = props

      if ((element as unknown as { type: string }).type === "mention") {
        const mentionElement = element as unknown as ContextMentionElement

        if (renderMention) {
          return (
            <span
              {...attributes}
              contentEditable={false}
            >
              {renderMention({
                item: {
                  id: mentionElement.mentionId,
                  type: mentionElement.mentionType,
                  label: mentionElement.mentionLabel,
                  metadata: mentionElement.mentionData,
                },
                startIndex: 0,
                endIndex: 0,
                text: mentionElement.mentionLabel,
              } as MentionMatch)}
              {children}
            </span>
          )
        }

        return (
          <Badge
            {...attributes}
            contentEditable={false}
            className={tv.mention()}
            variant="brand"
          >
            @{mentionElement.mentionLabel}
            {children}
          </Badge>
        )
      }

      return <div {...attributes}>{children}</div>
    },
    [renderMention, tv],
  )

  // 渲染叶子节点
  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <span {...props.attributes}>{props.children}</span>
  }, [])

  // 键盘事件处理
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      // 先让父组件处理 mentions 相关逻辑
      onKeyDown(event)

      // 检查最大长度
      if (maxLength) {
        const currentText = slateValue.map((n) => Node.string(n)).join("")
        if (
          currentText.length >= maxLength &&
          !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(
            event.key,
          )
        ) {
          event.preventDefault()
        }
      }
    },
    [onKeyDown, maxLength, slateValue],
  )

  return (
    <ScrollArea
      className={tv.scrollArea()}
      ref={ref}
      {...props}
    >
      <ScrollArea.Viewport className={tv.viewport()}>
        <ScrollArea.Content className={tv.scrollContainer()}>
          <Slate
            editor={editor}
            initialValue={slateValue}
            onChange={onChange}
          >
            <Editable
              className={tv.editor()}
              placeholder={placeholder}
              renderPlaceholder={({ children }: RenderPlaceholderProps) => (
                <p className={tv.placeholder()}>{children}</p>
              )}
              disabled={disabled}
              autoFocus={autoFocus}
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              onKeyDown={handleKeyDown}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </Slate>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
    </ScrollArea>
  )
})
