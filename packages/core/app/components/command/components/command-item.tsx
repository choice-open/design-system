import React, { forwardRef, useEffect, useMemo, useRef } from "react"
import { tcx } from "~/utils"
import { GroupContext, useCommand, useCommandState, useValue } from "../hooks"
import { commandItemTv } from "../tv"
import { SELECT_EVENT } from "../utils"

export interface CommandItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  disabled?: boolean
  forceMount?: boolean
  keywords?: string[]
  onSelect?: (value: string) => void
  value?: string
}

export const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  (
    { className, disabled, forceMount, keywords, onSelect, value, children, ...props },
    forwardedRef,
  ) => {
    const ref = useRef<HTMLDivElement | null>(null)
    const id = React.useId()
    const context = useCommand()
    const groupContext = React.useContext(GroupContext)
    // Update props ref directly without useEffect
    const propsRef = useRef({
      disabled,
      forceMount: forceMount ?? groupContext?.forceMount,
      keywords,
      onSelect,
      value,
    })

    // Update ref on every render
    propsRef.current = {
      disabled,
      forceMount: forceMount ?? groupContext?.forceMount,
      keywords,
      onSelect,
      value,
    }

    // Register item
    useEffect(() => {
      if (!propsRef.current.forceMount) {
        return context.item(id, groupContext?.id)
      }
    }, [context, groupContext?.id, id])

    // Handle value
    const valueDeps = useMemo(() => [value, children, ref], [value, children])
    const stableKeywords = useMemo(() => keywords || [], [keywords])
    const valueRef = useValue(id, ref, valueDeps, stableKeywords)

    const store = context.store
    const selected = useCommandState((state) =>
      Boolean(state.value && state.value === valueRef?.current),
    )
    const render = useCommandState((state) =>
      propsRef.current.forceMount
        ? true
        : context.filter() === false
          ? true
          : !state.search
            ? true
            : (state.filtered.items.get(id) ?? 0) > 0,
    )

    // Handle selection events
    useEffect(() => {
      const element = ref.current
      if (!element || disabled) return

      const handleSelect = () => {
        select()
        propsRef.current.onSelect?.(valueRef.current || "")
      }

      element.addEventListener(SELECT_EVENT, handleSelect)
      return () => element.removeEventListener(SELECT_EVENT, handleSelect)
    }, [render, disabled, valueRef])

    const select = () => {
      store.setState("value", valueRef.current || "", true)
    }

    const tv = commandItemTv({ selected, disabled, size: context.size })

    if (!render) return null

    return (
      <div
        ref={(el) => {
          ref.current = el
          if (typeof forwardedRef === "function") forwardedRef(el)
          else if (forwardedRef) forwardedRef.current = el
        }}
        {...props}
        id={id}
        className={tcx(tv.root({ className }))}
        role="option"
        aria-disabled={disabled}
        aria-selected={selected || undefined}
        data-disabled={disabled}
        data-selected={selected}
        data-value={valueRef.current}
        onPointerMove={disabled || context.getDisablePointerSelection() ? undefined : select}
        onClick={disabled ? undefined : () => propsRef.current.onSelect?.(valueRef.current || "")}
      >
        {children}
      </div>
    )
  },
)

CommandItem.displayName = "CommandItem"
