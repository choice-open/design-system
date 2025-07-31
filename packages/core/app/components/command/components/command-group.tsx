import React, { forwardRef, useEffect, useMemo, useRef } from "react"
import { tcx } from "~/utils"
import { GroupContext, useCommand, useCommandState, useValue } from "../hooks"
import { commandGroupTv, commandTv } from "../tv"

export interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether this group is forcibly rendered regardless of filtering. */
  forceMount?: boolean
  /** Optional heading to render for this group. */
  heading?: React.ReactNode
  /** If no heading is provided, you must provide a value that is unique for this group. */
  value?: string
}

export const CommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ className, heading, children, forceMount, value, ...props }, forwardedRef) => {
    const id = React.useId()
    const ref = useRef<HTMLDivElement | null>(null)
    const headingRef = useRef<HTMLDivElement | null>(null)
    const headingId = React.useId()
    const context = useCommand()

    const render = useCommandState((state) =>
      forceMount
        ? true
        : context.filter() === false
          ? true
          : !state.search
            ? true
            : state.filtered.groups.has(id),
    )

    // Register group
    useEffect(() => {
      return context.group(id)
    }, [context, id])

    // Handle value
    const valueDeps = useMemo(() => [value, heading, headingRef], [value, heading])
    useValue(id, ref, valueDeps)

    const contextValue = useMemo(() => ({ id, forceMount }), [id, forceMount])

    const tv = commandGroupTv()

    if (!render) return null

    return (
      <div
        ref={(el) => {
          ref.current = el
          if (typeof forwardedRef === "function") forwardedRef(el)
          else if (forwardedRef) forwardedRef.current = el
        }}
        {...props}
        className={tcx(tv.root({ className }))}
        role="presentation"
        data-value={value}
      >
        {heading && (
          <div
            ref={headingRef}
            className={tcx(tv.heading())}
            aria-hidden
            id={headingId}
          >
            {heading}
          </div>
        )}
        <div
          role="group"
          aria-labelledby={heading ? headingId : undefined}
        >
          <GroupContext.Provider value={contextValue}>{children}</GroupContext.Provider>
        </div>
      </div>
    )
  },
)

CommandGroup.displayName = "CommandGroup"
