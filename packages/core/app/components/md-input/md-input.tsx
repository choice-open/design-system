import { forwardRef, useRef, useState } from "react"
import { useEventCallback } from "usehooks-ts"
import { mergeRefs, tcx } from "~/utils"
import { Tabs } from "../tabs"
import { Preview, Toolbar, MarkdownThemeProvider } from "./components"
import { useMarkdownFormatting, useMarkdownShortcuts } from "./hooks"
import { mdInputTv } from "./tv"
import type { MdInputProps } from "./types"
import { Textarea } from "../textarea"

export const MdInput = forwardRef<HTMLTextAreaElement, MdInputProps>(function MdInput(props, ref) {
  const {
    value = "",
    onChange,
    placeholder = "",
    className,
    disabled,
    readOnly,
    showToolbar = true,
    showPreview = true,
    theme = "light",
    toolbarActions,
    i18n = {
      preview: "Preview",
      write: "Write",
    },
    minRows = 6,
    maxRows = 10,
    ...rest
  } = props
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { insertText, wrapText, insertListPrefix } = useMarkdownFormatting(textareaRef)
  const { handleKeyDown } = useMarkdownShortcuts({
    textareaRef,
    insertText,
    wrapText,
    onChange,
    disabled,
    readOnly,
  })

  const handleChange = useEventCallback((newValue: string) => {
    onChange?.(newValue)
  })

  const handleToolbarAction = useEventCallback((action: string) => {
    switch (action) {
      case "heading":
        wrapText("### ", "", onChange)
        break
      case "bold":
        wrapText("**", "**", onChange)
        break
      case "italic":
        wrapText("*", "*", onChange)
        break
      case "unordered-list":
        insertListPrefix("- ", onChange)
        break
      case "ordered-list":
        insertListPrefix("1. ", onChange)
        break
      case "task-list":
        insertListPrefix("- [ ] ", onChange)
        break
      case "code":
        wrapText("`", "`", onChange)
        break
      case "code-block":
        wrapText("```\n", "\n```", onChange)
        break
      case "quote":
        insertListPrefix("> ", onChange)
        break
      case "link":
        wrapText("[", "](url)", onChange)
        break
      default:
        break
    }
  })

  const tv = mdInputTv({ disabled, readOnly, visible: activeTab === "write" })

  return (
    <MarkdownThemeProvider theme={theme}>
      <div className={tcx(tv.root(), className)}>
        {(showToolbar || showPreview) && (
          <div className={tv.header()}>
            {showPreview && (
              <Tabs
                value={activeTab}
                onChange={(val) => setActiveTab(val as "write" | "preview")}
              >
                <Tabs.Item value="write">{i18n.write}</Tabs.Item>
                <Tabs.Item value="preview">{i18n.preview}</Tabs.Item>
              </Tabs>
            )}
            {showToolbar && (
              <Toolbar
                visible={activeTab === "write"}
                onAction={handleToolbarAction}
                disabled={disabled || readOnly}
                visibleActions={toolbarActions}
              />
            )}
          </div>
        )}
        <div className={tv.content()}>
          <Textarea
            padding={8}
            variant="reset"
            focusSelection="none"
            ref={mergeRefs(ref, textareaRef)}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            className={tv.textarea()}
            minRows={minRows}
            maxRows={maxRows}
            {...rest}
          />
          {activeTab === "preview" && (
            <Preview
              content={value}
              className={tv.preview()}
            />
          )}
        </div>
      </div>
    </MarkdownThemeProvider>
  )
})

MdInput.displayName = "MdInput"
