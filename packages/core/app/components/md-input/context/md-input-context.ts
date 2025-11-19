import { createContext, useContext } from "react"
import type { useMarkdownFormatting } from "../hooks"
import type { MentionItemProps, MentionRenderProps } from "../types"

export interface MentionState {
  closeMentionSearch: () => void
  filteredItems: MentionItemProps[]
  handleSelect: (item: MentionItemProps) => void
  isOpen: boolean
  position: { x: number; y: number } | null
  query: string
}

export interface MdInputContextValue {
  activeTab: "write" | "preview"
  allowedPrefixes?: string[]
  disabled?: boolean
  handleToolbarAction: (action: string) => void
  hasTabs: boolean
  insertListPrefix: ReturnType<typeof useMarkdownFormatting>["insertListPrefix"]
  insertText: ReturnType<typeof useMarkdownFormatting>["insertText"]
  mentionItems?: MentionItemProps[]
  mentionOnSelect?: (item: MentionItemProps, query: string) => string
  mentionRenderComponent?: React.ComponentType<MentionRenderProps>
  mentionState?: MentionState
  onChange?: (value: string) => void
  readOnly?: boolean
  setActiveTab: (tab: "write" | "preview") => void
  setMentionState?: (state: MentionState) => void
  textareaRef: React.RefObject<HTMLTextAreaElement>
  theme?: "light" | "dark"
  value: string
  wrapText: ReturnType<typeof useMarkdownFormatting>["wrapText"]
}

export const MdInputContext = createContext<MdInputContextValue | null>(null)

export const useMdInputContext = () => {
  const context = useContext(MdInputContext)
  if (!context) {
    throw new Error("MdInput compound components must be used within a MdInput component")
  }
  return context
}
