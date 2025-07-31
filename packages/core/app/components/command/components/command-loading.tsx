import React, { forwardRef } from "react"
import { tcx } from "~/utils"
import { commandTv } from "../tv"

export interface CommandLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Accessible label for this loading progressbar. Not shown visibly.
   */
  label?: string
  /** Estimated progress of loading asynchronous options. */
  progress?: number
}

export const CommandLoading = forwardRef<HTMLDivElement, CommandLoadingProps>(
  ({ className, children, label = "Loading...", progress, ...props }, forwardedRef) => {
    const tv = commandTv()

    return (
      <div
        ref={forwardedRef}
        {...props}
        className={tcx(tv.loading({ className }))}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div aria-hidden>{children}</div>
      </div>
    )
  },
)

CommandLoading.displayName = "CommandLoading"
