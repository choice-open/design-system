import { Dot } from "@choiceform/icons-react"
import { forwardRef, HTMLProps } from "react"
import { IconButton, type IconButtonProps } from "~/components/icon-button"
import { tcx } from "~/utils"
import { numericInputMenuActionPromptTv, numericInputMenuTriggerTv } from "../tv"

interface NumericInputMenuTriggerProps extends IconButtonProps {
  className?: string
  type?: "menu" | "action"
}

export const NumericInputMenuTrigger = forwardRef<HTMLButtonElement, NumericInputMenuTriggerProps>(
  (props, ref) => {
    const { className, type = "menu", ...rest } = props

    return (
      <IconButton
        ref={ref}
        variant={type === "menu" ? (props.disabled ? "ghost" : "solid") : undefined}
        className={tcx(numericInputMenuTriggerTv({ disabled: props.disabled, type }), className)}
        {...rest}
      >
        <Dot />
      </IconButton>
    )
  },
)

NumericInputMenuTrigger.displayName = "NumericInputMenuTrigger"

interface NumericInputMenuActionPromptProps extends HTMLProps<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
  disabled?: boolean
}

export const NumericInputMenuActionPrompt = forwardRef<
  HTMLDivElement,
  NumericInputMenuActionPromptProps
>((props, ref) => {
  const { className, children, disabled, ...rest } = props

  return (
    <div
      ref={ref}
      className={tcx(numericInputMenuActionPromptTv({ disabled }), className)}
      {...rest}
    >
      {children}
    </div>
  )
})

NumericInputMenuActionPrompt.displayName = "NumericInputMenuActionPrompt"
