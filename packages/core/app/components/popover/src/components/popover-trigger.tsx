import { mergeRefs } from "@choice-ui/shared"
import { Slot } from "@choice-ui/slot"
import { forwardRef, memo } from "react"
import { usePopoverContext } from "../popover-context"

export const PopoverTrigger = memo(
  forwardRef<
    HTMLElement,
    {
      children: React.ReactNode
    }
  >((props, forwardedRef) => {
    const { children } = props
    const { getReferenceProps, refs } = usePopoverContext()

    return (
      <Slot
        ref={mergeRefs(refs.setReference, forwardedRef)}
        {...getReferenceProps()}
      >
        {children}
      </Slot>
    )
  }),
)

PopoverTrigger.displayName = "PopoverTrigger"
