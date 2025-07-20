import React from "react"
import { CoordinateMenu, type CoordinateMenuPosition } from "../../coordinate-menu"
import { contextInputTv } from "../tv"
import type { MentionItem } from "../types"

// Mentions 菜单组件 - 使用 CoordinateMenu
interface MentionMenuProps {
  isOpen: boolean
  loading: boolean
  onClose: () => void
  onSelect: (mention: MentionItem, index: number) => void
  position: CoordinateMenuPosition | null
  renderSuggestion?: (item: MentionItem, isSelected: boolean) => React.ReactNode
  suggestions: MentionItem[]
}

export const MentionMenu = React.memo(function MentionMenu({
  suggestions,
  loading,
  position,
  onSelect,
  renderSuggestion,
  isOpen,
  onClose,
}: MentionMenuProps) {
  const tv = contextInputTv()

  return loading ? null : (
    <CoordinateMenu
      isOpen={isOpen}
      onClose={onClose}
      position={position}
      placement="bottom-start"
    >
      <CoordinateMenu.Content>
        {suggestions.map((item, index) => (
          <CoordinateMenu.Item
            key={item.id}
            onClick={() => onSelect(item, index)}
            shortcut={{
              keys: [item.type],
            }}
          >
            {renderSuggestion ? (
              renderSuggestion(item, false)
            ) : (
              <>
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt={item.label}
                    className={tv.avatar()}
                  />
                ) : (
                  <div className={tv.avatar()}>{item.label.charAt(0).toUpperCase()}</div>
                )}
                <CoordinateMenu.Value>{item.label}</CoordinateMenu.Value>
              </>
            )}
          </CoordinateMenu.Item>
        ))}
      </CoordinateMenu.Content>
    </CoordinateMenu>
  )
})
