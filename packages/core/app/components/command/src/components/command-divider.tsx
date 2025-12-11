import { tcx } from "@choice-ui/shared"
import { forwardRef, HTMLProps } from "react"
import { useCommand, useCommandState } from "../hooks"
import { commandTv } from "../tv"

export interface CommandDividerProps extends HTMLProps<HTMLDivElement> {
  /**
   * Whether to always render this divider. Useful when automatic filtering is disabled.
   * @default false
   */
  alwaysRender?: boolean
}

export const CommandDivider = forwardRef<HTMLDivElement, CommandDividerProps>(
  ({ className, alwaysRender, ...props }, forwardedRef) => {
    const context = useCommand()
    const render = useCommandState((state) => !state.search)
    const tv = commandTv({ variant: context.variant })

    if (!alwaysRender && !render) return null

    return (
      <div
        ref={forwardedRef}
        {...props}
        className={tcx(tv.divider({ className }))}
        role="separator"
      />
    )
  },
)

CommandDivider.displayName = "CommandDivider"
