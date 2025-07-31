import React, { forwardRef } from "react"
import { Dialog, DialogProps } from "~/components/dialog"
import { tcx } from "~/utils"
import { Command } from "../command"
import { commandTv } from "../tv"
import type { CommandProps } from "../types"

export interface CommandDialogProps extends CommandProps {
  className?: string
  dialogProps?: Omit<DialogProps, "open" | "onOpenChange" | "children">
  onOpenChange?: (open: boolean) => void
  open?: boolean
}

export const CommandDialog = forwardRef<HTMLDivElement, CommandDialogProps>(
  ({ open, onOpenChange, className, dialogProps, ...commandProps }, forwardedRef) => {
    const tv = commandTv()

    return (
      <Dialog
        open={open}
        onOpenChange={onOpenChange}
        overlay={true}
        className={tcx(tv.content({ className }))}
        {...dialogProps}
      >
        <Command
          ref={forwardedRef}
          {...commandProps}
        />
      </Dialog>
    )
  },
)

CommandDialog.displayName = "CommandDialog"
