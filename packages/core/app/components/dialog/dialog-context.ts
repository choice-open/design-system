import { createContext, useContext } from "react"

interface DialogContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  titleId: string
  descriptionId: string
  draggable?: boolean
  handleDragStart?: (e: React.MouseEvent) => void
  contentRef: React.RefObject<HTMLDivElement>
  dialogRef: React.RefObject<HTMLDivElement>
  onCloseClick: () => void
}

export const DialogContext = createContext<DialogContextValue | null>(null)

export const useDialogContext = () => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error("Dialog compound components must be used within a Dialog component")
  }
  return context
}
