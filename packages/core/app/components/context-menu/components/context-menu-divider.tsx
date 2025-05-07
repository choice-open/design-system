import * as CM from "@radix-ui/react-context-menu"
import { forwardRef } from "react"
import { tcx } from "~/utils/tcx"
import { MenuDividerTv } from "../../menus/tv"

export interface ContextMenuDividerProps {
  className?: string
}

export const ContextMenuDivider = forwardRef<HTMLDivElement, ContextMenuDividerProps>(
  ({ className, ...props }, ref) => {
    const styles = MenuDividerTv()

    return (
      <div className={styles.root()}>
        <CM.Separator
          {...props}
          ref={ref}
          className={tcx(styles.divider(), className)}
        />
      </div>
    )
  },
)

ContextMenuDivider.displayName = "ContextMenu.Divider"
