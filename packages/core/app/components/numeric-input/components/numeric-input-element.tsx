import { Slot } from "@radix-ui/react-slot"
import { memo, ReactNode } from "react"
import { tcx } from "~/utils"
import { numericInputElementTv } from "../tv"

interface HandlerProps {
  ref: (el: HTMLElement | null) => void
  onPointerDown: (e: React.PointerEvent<HTMLElement>) => void
  style?: React.CSSProperties
}

interface NumericInputElementProps {
  handlerProps?: HandlerProps
  className?: string
  children: ReactNode
  position: "prefix" | "suffix"
  type: "handler" | "action" | "menu"
  disabled?: boolean
}

const TAG_PROPS_MAP = {
  handler: (props: HandlerProps | undefined) => props,
  action: () => undefined,
  menu: () => undefined,
} as const

export const NumericInputElement = memo(function NumericInputElement(
  props: NumericInputElementProps,
) {
  const { handlerProps, className, children, position, type, disabled } = props

  const handlerClassName = numericInputElementTv({ type, position, disabled })
  const tagProps = TAG_PROPS_MAP[type](handlerProps)

  return (
    <Slot
      {...tagProps}
      className={tcx(handlerClassName, className)}
    >
      {children}
    </Slot>
  )
})

NumericInputElement.displayName = "NumericInputElement"
