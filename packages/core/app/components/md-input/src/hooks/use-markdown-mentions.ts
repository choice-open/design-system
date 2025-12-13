import { useRef, useState, useMemo, useEffect } from "react"
import { useEventCallback } from "usehooks-ts"
import type { MdInputMentionItemProps, UseMdInputMentionsOptions } from "../types"

const EMPTY_ITEMS: MdInputMentionItemProps[] = []

export function useMarkdownMentions({
  items = EMPTY_ITEMS,
  onSelect,
  onChange,
  disabled,
  readOnly,
}: UseMdInputMentionsOptions) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null)
  const [query, setQuery] = useState("")
  const [mentionStart, setMentionStart] = useState<number | null>(null)
  // Virtual selection index for keyboard navigation (focus stays in textarea)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const filteredItems = useMemo(() => {
    // Return empty array (cached reference) if no items
    if (!items || items.length === 0) {
      return EMPTY_ITEMS
    }

    if (!query.trim()) {
      return items
    }

    const lowerQuery = query.toLowerCase()
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(lowerQuery) || item.id.toLowerCase().includes(lowerQuery),
    )
  }, [items, query])

  // Reset selectedIndex when filteredItems change
  useEffect(() => {
    setSelectedIndex(0)
  }, [filteredItems])

  const getCaretCoordinates = useEventCallback(
    (textarea: HTMLTextAreaElement, position: number) => {
      // Create a hidden div to simulate textarea layout
      const div = document.createElement("div")
      const style = getComputedStyle(textarea)

      // Copy all style properties that affect layout
      const properties = [
        "direction",
        "boxSizing",
        "width",
        "height",
        "overflowX",
        "overflowY",
        "borderTopWidth",
        "borderRightWidth",
        "borderBottomWidth",
        "borderLeftWidth",
        "borderStyle",
        "paddingTop",
        "paddingRight",
        "paddingBottom",
        "paddingLeft",
        "fontStyle",
        "fontVariant",
        "fontWeight",
        "fontStretch",
        "fontSize",
        "fontSizeAdjust",
        "lineHeight",
        "fontFamily",
        "textAlign",
        "textTransform",
        "textIndent",
        "textDecoration",
        "letterSpacing",
        "wordSpacing",
        "tabSize",
        "MozTabSize",
      ]

      properties.forEach((prop) => {
        div.style.setProperty(prop, style.getPropertyValue(prop))
      })

      // Set positioning and visibility
      div.style.position = "absolute"
      div.style.visibility = "hidden"
      div.style.whiteSpace = "pre-wrap"
      div.style.wordWrap = "break-word"
      div.style.overflow = "hidden"

      // Set width to textarea's clientWidth (excluding scrollbar)
      div.style.width = `${textarea.clientWidth}px`

      // Split text content into before and after cursor
      const textBefore = textarea.value.substring(0, position)
      const textAfter = textarea.value.substring(position)

      // Create cursor marker element
      const marker = document.createElement("span")
      marker.style.width = "1px"
      marker.style.height = "1px"
      marker.style.display = "inline-block"
      marker.textContent = "\u200B" // Zero-width space to mark position

      // Build content: text before cursor + marker + text after cursor
      div.textContent = textBefore
      div.appendChild(marker)
      if (textAfter) {
        const afterSpan = document.createElement("span")
        afterSpan.textContent = textAfter
        div.appendChild(afterSpan)
      }

      // Add to DOM to calculate position
      document.body.appendChild(div)

      // Get position information
      const textareaRect = textarea.getBoundingClientRect()
      const markerRect = marker.getBoundingClientRect()
      const divRect = div.getBoundingClientRect()

      // Calculate caret position
      // x: textarea left edge + marker offset relative to div (considering padding) + 8px offset (to show @ symbol)
      // y: textarea top + marker vertical offset relative to div + line height
      // Note: getBoundingClientRect() returns viewport-relative coordinates, no need for scrollY
      const coordinates = {
        x: textareaRect.left + (markerRect.left - divRect.left) + 8, // 8px right offset to show @ symbol
        y: textareaRect.top + (markerRect.top - divRect.top) + markerRect.height + 8, // 8px gap
      }

      // Cleanup
      document.body.removeChild(div)

      return coordinates
    },
  )

  const handleInputChange = useEventCallback(
    (value: string, textarea: HTMLTextAreaElement, onChange?: (value: string) => void) => {
      if (disabled || readOnly) {
        return
      }

      const cursorPosition = textarea.selectionStart
      const textBeforeCursor = value.substring(0, cursorPosition)

      const match = textBeforeCursor.match(/@(\w*)$/)

      if (match) {
        const start = cursorPosition - match[0].length
        setMentionStart(start)
        setQuery(match[1] || "")

        const coordinates = getCaretCoordinates(textarea, cursorPosition)
        setPosition(coordinates)
        setIsOpen(true)
      } else {
        setIsOpen(false)
        setQuery("")
        setMentionStart(null)
        setPosition(null)
      }

      onChange?.(value)
    },
  )

  const handleSelect = useEventCallback((item: MdInputMentionItemProps) => {
    if (!textareaRef.current || mentionStart === null) {
      return
    }

    const textarea = textareaRef.current
    const value = textarea.value
    const cursorPosition = textarea.selectionStart

    const textBeforeMention = value.substring(0, mentionStart)
    const textAfterCursor = value.substring(cursorPosition)

    const insertText = onSelect ? onSelect(item, query) : `@${item.label} `

    const newValue = textBeforeMention + insertText + textAfterCursor
    const newCursorPosition = textBeforeMention.length + insertText.length

    setIsOpen(false)
    setQuery("")
    setMentionStart(null)
    setPosition(null)

    onChange?.(newValue)

    textarea.value = newValue
    textarea.setSelectionRange(newCursorPosition, newCursorPosition)

    const inputEvent = new Event("input", { bubbles: true, cancelable: true })
    textarea.dispatchEvent(inputEvent)

    setTimeout(() => {
      textarea.focus()
    }, 0)
  })

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!isOpen || disabled || readOnly) {
      return
    }

    const isIMEComposing = event.nativeEvent.isComposing || event.keyCode === 229
    if (isIMEComposing) {
      return
    }

    // Escape: close menu
    if (event.key === "Escape") {
      event.preventDefault()
      closeMentionSearch()
      return
    }

    // No items to navigate
    if (filteredItems.length === 0) {
      return
    }

    // ArrowDown: select next item
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length)
      return
    }

    // ArrowUp: select previous item
    if (event.key === "ArrowUp") {
      event.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
      return
    }

    // Enter/Tab: confirm selection
    if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault()
      // Safe bounds check for selectedIndex
      const safeIndex = Math.min(selectedIndex, filteredItems.length - 1)
      const selectedItem = filteredItems[safeIndex]
      if (selectedItem) {
        handleSelect(selectedItem)
      }
    }
  })

  const closeMentionSearch = useEventCallback(() => {
    setIsOpen(false)
    setQuery("")
    setMentionStart(null)
    setPosition(null)
  })

  return {
    isOpen,
    position,
    query,
    filteredItems,
    selectedIndex,
    handleInputChange,
    handleSelect,
    handleKeyDown,
    closeMentionSearch,
    setTextareaRef: (ref: HTMLTextAreaElement | null) => {
      textareaRef.current = ref
    },
  }
}
