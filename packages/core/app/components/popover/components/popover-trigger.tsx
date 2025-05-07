import { Slot } from "@radix-ui/react-slot"
import { forwardRef, memo } from "react"
import { mergeRefs } from "~/utils"
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
