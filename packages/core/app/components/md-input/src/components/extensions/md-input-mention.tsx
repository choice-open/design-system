import { Combobox } from "@choice-ui/combobox"
import { memo, useEffect, useRef } from "react"
import type { MdInputMentionItemProps } from "../../types"

export interface MdInputMentionProps {
  filteredItems: MdInputMentionItemProps[]
  isOpen: boolean
  onClose: () => void
  onSelect: (item: MdInputMentionItemProps) => void
  position: { x: number; y: number } | null
  query: string
  /** Virtual selection index for keyboard navigation (managed by hook) */
  selectedIndex: number
  renderItem?: (item: MdInputMentionItemProps) => React.ReactNode
}

/**
 * Focus manager props to keep focus in the textarea (virtual focus for menu)
 * This prevents focus from transferring to the menu, allowing continuous typing
 */
const FOCUS_MANAGER_PROPS = {
  modal: false,
  initialFocus: -1,
  returnFocus: false,
} as const

/** Default render function for mention items (defined outside to avoid recreation) */
const defaultRenderItem = (item: MdInputMentionItemProps) => (
  <Combobox.Value>{item.label}</Combobox.Value>
)

export const MdInputMention = memo(function MdInputMention({
  isOpen,
  position,
  query,
  filteredItems,
  selectedIndex,
  onSelect,
  onClose,
  renderItem = defaultRenderItem,
}: MdInputMentionProps) {
  const listRef = useRef<HTMLDivElement>(null)

  // Auto scroll selected item into view
  useEffect(() => {
    if (!listRef.current || filteredItems.length === 0) return

    const selectedElement = listRef.current.querySelector(`[data-index="${selectedIndex}"]`)
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: "nearest" })
    }
  }, [selectedIndex, filteredItems.length])

  if (!isOpen || !position) {
    return null
  }

  return (
    <Combobox
      trigger="coordinate"
      position={position}
      value={query}
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      placement="bottom-start"
      autoSelection={false}
      focusManagerProps={FOCUS_MANAGER_PROPS}
    >
      <Combobox.Content ref={listRef}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <Combobox.Item
              key={item.id}
              data-index={index}
              customActive={index === selectedIndex}
              onClick={() => onSelect(item)}
            >
              {renderItem(item)}
            </Combobox.Item>
          ))
        ) : (
          <div className="text-muted-foreground p-4 text-center text-sm">No results found</div>
        )}
      </Combobox.Content>
    </Combobox>
  )
})

MdInputMention.displayName = "MdInputMention"
