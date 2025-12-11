import { tcx } from "@choice-ui/shared"
import React, { forwardRef, HTMLProps, useEffect, useId, useMemo, useRef } from "react"
import { GroupContext, useCommand, useCommandState, useValue } from "../hooks"
import { commandGroupTv } from "../tv"

export interface CommandGroupProps extends HTMLProps<HTMLDivElement> {
  /**
   * Whether to force mount the group.
   * @default false
   */
  forceMount?: boolean
  /**
   * The heading of the group.
   */
  heading?: React.ReactNode
  /**
   * The value of the group.
   */
  value?: string
  /**
   * Whether the group is hidden.
   * @default false
   */
  hidden?: boolean
}

export const CommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>((props, forwardedRef) => {
  const { className, heading, children, forceMount, value, ...rest } = props
  const id = useId()
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

  // 注册group
  useEffect(() => {
    return context.group(id)
  }, [context, id])

  const valueDeps = useMemo(() => [value, heading, headingRef], [value, heading])
  useValue(id, ref, valueDeps)

  const contextValue = useMemo(() => ({ id, forceMount }), [id, forceMount])

  const tv = commandGroupTv({ variant: context.variant, hidden: !render })

  // 使用 CSS 隐藏而不是返回 null，保持 group 和其中的 item 始终注册
  // 这样搜索词变化时可以正确重新过滤
  return (
    <div
      ref={(el) => {
        ref.current = el
        if (typeof forwardedRef === "function") forwardedRef(el)
        else if (forwardedRef) forwardedRef.current = el
      }}
      {...rest}
      className={tv.root({ className })}
      role="presentation"
      data-value={value}
      data-hidden={!render || undefined}
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
})

CommandGroup.displayName = "CommandGroup"
