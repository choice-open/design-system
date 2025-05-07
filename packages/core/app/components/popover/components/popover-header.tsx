import { forwardRef, memo } from "react"
import { ModalHeader } from "../../modal"
import { usePopoverContext } from "../popover-context"

export const PopoverHeader = memo(
  forwardRef<HTMLDivElement, React.ComponentProps<typeof ModalHeader>>((props, ref) => {
    const { children, className, ...rest } = props
    const { titleId, onCloseClick } = usePopoverContext()

    return (
      <ModalHeader
        ref={ref}
        id={titleId}
        onClose={onCloseClick}
        {...rest}
      >
        {children}
      </ModalHeader>
    )
  }),
)

PopoverHeader.displayName = "PopoverHeader"
