import { createContext } from "react"
import { useContext } from "react"

interface PopoverContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement>
  getReferenceProps: (props?: any) => any
  getFloatingProps: (props?: any) => any
  refs: {
    setReference: (node: HTMLElement | null) => void
    setFloating: (node: HTMLElement | null) => void
  }
  draggable: boolean
  handleDragStart: (e: React.MouseEvent) => void
  onCloseClick: () => void
  titleId: string
  descriptionId: string
  dragContentRef: React.RefObject<HTMLDivElement>
}

export const PopoverContext = createContext<PopoverContextValue | null>(null)

export const usePopoverContext = () => {
  const context = useContext(PopoverContext)
  if (!context) {
    throw new Error("Popover compound components must be used within a Popover component")
  }
  return context
}
