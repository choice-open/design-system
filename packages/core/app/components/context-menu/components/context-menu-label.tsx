import * as CM from "@radix-ui/react-context-menu"
import { ReactNode, forwardRef } from "react"
import { MenuLabelTv } from "../../menus/tv"
import { useContextMenu } from "../context-menu-context"
import { tcx } from "~/utils/tcx"

export interface ContextMenuLabelProps {
  children: ReactNode
  className?: string
}

export const ContextMenuLabel = forwardRef<HTMLDivElement, ContextMenuLabelProps>(
  ({ children, className }, ref) => {
    const { selection = false } = useContextMenu()
    const styles = MenuLabelTv({ selection })

    return (
      <CM.Label
        ref={ref}
        className={tcx(styles, className)}
      >
        {children}
      </CM.Label>
    )
  },
)
ContextMenuLabel.displayName = "ContextMenuLabel"
