import { forwardRef, HTMLProps } from "react"
import { tcx } from "~/utils"
import { commandFooterTv } from "../tv"

export const CommandFooter = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const tv = commandFooterTv()

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
