import { createContext, useContext } from "react"
import type { Editor } from "slate"

// 创建编辑器上下文
export const ContextInputEditorContext = createContext<Editor | null>(null)

// 使用编辑器的 hook
export const useContextInputEditor = () => {
  const editor = useContext(ContextInputEditorContext)
  if (!editor) {
    throw new Error("useContextInputEditor must be used within a ContextInputEditorProvider")
  }
  return editor
}
