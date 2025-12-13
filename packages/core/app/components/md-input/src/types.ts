import type { HTMLAttributes } from "react"
import { useMarkdownFormatting } from "./hooks/use-markdown-formatting"

export interface MdInputMentionItemProps {
  [key: string]: unknown
  id: string
  label: string
}

export interface UseMdInputMentionsOptions {
  disabled?: boolean
  items?: MdInputMentionItemProps[]
  onChange?: (value: string) => void
  onSelect?: (item: MdInputMentionItemProps, query: string) => string
  readOnly?: boolean
}

export interface MdInputProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "children"
> {
  children: React.ReactNode
  disabled?: boolean
  mentionItems?: MdInputMentionItemProps[]
  mentionOnSelect?: (item: MdInputMentionItemProps, query: string) => string
  onChange?: (value: string) => void
  readOnly?: boolean
  value?: string
}

export interface MdInputMentionState {
  closeMentionSearch: () => void
  filteredItems: MdInputMentionItemProps[]
  handleSelect: (item: MdInputMentionItemProps) => void
  isOpen: boolean
  position: { x: number; y: number } | null
  query: string
  /** Virtual selection index for keyboard navigation */
  selectedIndex: number
}

export interface MdInputContextValue {
  activeTab: "write" | "preview"
  disabled?: boolean
  handleToolbarAction: (action: string) => void
  hasTabs: boolean
  insertListPrefix: ReturnType<typeof useMarkdownFormatting>["insertListPrefix"]
  insertText: ReturnType<typeof useMarkdownFormatting>["insertText"]
  mentionItems?: MdInputMentionItemProps[]
  mentionOnSelect?: (item: MdInputMentionItemProps, query: string) => string
  mentionState?: MdInputMentionState
  onChange?: (value: string) => void
  readOnly?: boolean
  setActiveTab: (tab: "write" | "preview") => void
  setMentionState?: (state: MdInputMentionState) => void
  textareaRef: React.RefObject<HTMLTextAreaElement>
  value: string
  wrapText: ReturnType<typeof useMarkdownFormatting>["wrapText"]
}

export interface MdInputToolbarAction {
  icon?: React.ReactNode
  id: string
  label?: string
}

export interface MdInputToolbarProps {
  afterElement?: React.ReactNode
  beforeElement?: React.ReactNode
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  groups?: MdInputToolbarAction[][]
  i18n?: {
    bold: string
    code: string
    "code-block": string
    heading: string
    italic: string
    "ordered-list": string
    quote: string
    "task-list": string
    "unordered-list": string
  }
  onAction?: (action: string) => void
  visible?: boolean
  visibleActions?: string[]
}
