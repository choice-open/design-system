import { createContext, useContext } from "react"

interface ContextMenuContextValue {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  selection?: boolean
}

export const ContextMenuContext = createContext<ContextMenuContextValue>({})

export const useContextMenu = () => useContext(ContextMenuContext)
