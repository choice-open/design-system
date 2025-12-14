import { Slot } from "@choice-ui/slot"
import { useMergeRefs } from "@floating-ui/react"
import { forwardRef, HTMLProps } from "react"
import { useTooltipState } from "../context/tooltip-context"

export const TooltipTrigger = forwardRef<HTMLElement, HTMLProps<HTMLElement>>(
  function TooltipTrigger({ children, ...props }, propRef) {
    const state = useTooltipState()

    // Slot will handle merging childRef internally
    const ref = useMergeRefs([state.refs.setReference, propRef])

    return (
      <Slot
        ref={ref}
        {...(state.disabled && { disabled: true })}
        {...state.getReferenceProps(props)}
      >
        {children}
      </Slot>
    )
  },
)
