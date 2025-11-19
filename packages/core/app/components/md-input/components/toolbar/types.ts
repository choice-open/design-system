export interface ToolbarAction {
  icon?: React.ReactNode
  id: string
  label?: string
}

export interface ToolbarProps {
  afterElement?: React.ReactNode
  beforeElement?: React.ReactNode
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  groups?: ToolbarAction[][]
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
