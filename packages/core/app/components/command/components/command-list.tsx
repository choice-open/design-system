import React, { forwardRef, useEffect, useRef } from "react"
import { tcx } from "~/utils"
import { useCommand, useCommandState } from "../hooks"
import { commandListTv, commandTv } from "../tv"
import { ScrollArea } from "~/components"

export interface CommandListProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
}

export const CommandList = forwardRef<HTMLDivElement, CommandListProps>(
  ({ className, children, label = "Suggestions", ...props }, forwardedRef) => {
    const ref = useRef<HTMLDivElement | null>(null)
    const height = useRef<HTMLDivElement | null>(null)
    const selectedItemId = useCommandState((state) => state.selectedItemId)
    const context = useCommand()

    useEffect(() => {
      if (height.current && ref.current) {
        const el = height.current
        const wrapper = ref.current
        let animationFrame: number
        const observer = new ResizeObserver(() => {
          animationFrame = requestAnimationFrame(() => {
            const height = el.offsetHeight
            wrapper.style.setProperty(`--cmdk-list-height`, height.toFixed(1) + "px")
          })
        })
        observer.observe(el)
        return () => {
          cancelAnimationFrame(animationFrame)
          observer.unobserve(el)
        }
      }
    }, [])

    const tv = commandListTv()

    return (
      <ScrollArea>
        <ScrollArea.Viewport
          ref={(el) => {
            ref.current = el
            if (typeof forwardedRef === "function") forwardedRef(el)
            else if (forwardedRef) forwardedRef.current = el
          }}
          {...props}
          className={tcx(tv.root({ className }))}
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={selectedItemId}
          aria-label={label}
          id={context.listId}
        >
          <ScrollArea.Content
            className={tcx(tv.content())}
            ref={(el) => {
              height.current = el
              if (context.listInnerRef) {
                context.listInnerRef.current = el
              }
            }}
          >
            {children}
          </ScrollArea.Content>
        </ScrollArea.Viewport>
      </ScrollArea>
    )
  },
)

CommandList.displayName = "CommandList"
