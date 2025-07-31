import { forwardRef, HTMLProps } from "react"
import { tcx } from "~/utils"
import { commandFooterTv } from "../tv"
import { useCommand } from "../hooks/use-command"

export const CommandFooter = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const context = useCommand()

    const tv = commandFooterTv({ variant: context.variant })

    return (
      <div
        ref={ref}
        className={tcx(tv.root({ className }))}
        {...props}
      />
    )
  },
)

CommandFooter.displayName = "CommandFooter"
