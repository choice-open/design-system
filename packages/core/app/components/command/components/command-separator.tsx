import React, { forwardRef } from "react"
import { tcx } from "~/utils"
import { useCommandState } from "../hooks"
import { commandTv } from "../tv"

export interface CommandSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether this separator should always be rendered. Useful if you disable automatic filtering. */
  alwaysRender?: boolean
}

export const CommandSeparator = forwardRef<HTMLDivElement, CommandSeparatorProps>(
  ({ className, alwaysRender, ...props }, forwardedRef) => {
    const render = useCommandState((state) => !state.search)
    const tv = commandTv()

    if (!alwaysRender && !render) return null

    return (
      <div
        ref={forwardedRef}
        {...props}
        className={tcx(tv.separator({ className }))}
        role="separator"
      />
    )
  },
)

CommandSeparator.displayName = "CommandSeparator"
