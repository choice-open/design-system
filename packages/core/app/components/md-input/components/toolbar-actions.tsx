import {
  FontBoldSmall,
  ParagraphCode,
  ParagraphCodeBlock,
  ParagraphHeading,
  ParagraphItalic,
  ParagraphList,
  ParagraphListOrdered,
  ParagraphListTodo,
  ParagraphQuote,
} from "@choiceform/icons-react"

export interface ToolbarAction {
  divider?: boolean
  icon?: React.ReactNode
  id: string
  label?: string
}

export const TOOLBAR_ACTIONS: ToolbarAction[] = [
  { id: "heading", label: "Heading", icon: <ParagraphHeading /> },
  { id: "bold", label: "Bold", icon: <FontBoldSmall /> },
  { id: "italic", label: "Italic", icon: <ParagraphItalic /> },
  { id: "divider-1", divider: true },
  { id: "quote", label: "Quote", icon: <ParagraphQuote /> },
  { id: "code", label: "Code", icon: <ParagraphCode /> },
  { id: "code-block", label: "Code block", icon: <ParagraphCodeBlock /> },
  { id: "divider-2", divider: true },
  { id: "unordered-list", label: "Unordered list", icon: <ParagraphList /> },
  { id: "ordered-list", label: "Ordered list", icon: <ParagraphListOrdered /> },
  { id: "task-list", label: "Task list", icon: <ParagraphListTodo /> },
]
