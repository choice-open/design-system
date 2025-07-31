import React, { forwardRef } from "react"
import { tcx } from "~/utils"
import { useCommandState } from "../hooks"
import { commandTv } from "../tv"

export interface CommandEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const CommandEmpty = forwardRef<HTMLDivElement, CommandEmptyProps>(
  ({ className, ...props }, forwardedRef) => {
    const render = useCommandState((state) => state.filtered.count === 0)
    const tv = commandTv()

    if (!render) return null

    return (
      <div
        ref={forwardedRef}
        {...props}
        className={tcx(tv.empty({ className }))}
        role="presentation"
      />
    )
  },
)

CommandEmpty.displayName = "CommandEmpty"
