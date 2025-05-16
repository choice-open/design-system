import { LoaderCircle } from "@choiceform/icons-react"
import { Slot } from "@radix-ui/react-slot"
import { forwardRef, HTMLProps } from "react"
import { tcx } from "~/utils"
import { Tooltip, type TooltipProps } from "../tooltip"
import { iconButtonTv } from "./tv"

export interface IconButtonProps extends Omit<HTMLProps<HTMLButtonElement>, "size"> {
  className?: string
  variant?: "default" | "secondary" | "solid" | "highlight" | "ghost" | "dark" | "reset" 
  size?: "default" | "large" | "reset"
  children?: React.ReactNode
  active?: boolean
  disabled?: boolean
  focused?: boolean
  loading?: boolean
  tooltip?: TooltipProps
  asChild?: boolean
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(props, ref) {
    const {
      className,
      children,
      disabled,
      active,
      loading,
      focused,
      variant = "default",
      size = "default",
      tooltip,
      asChild,
      ...rest
    } = props

    const Button = asChild ? Slot : "button"

    const style = iconButtonTv({
      disabled,
      active,
      focused,
      loading,
      variant,
      size,
    })

    const button = (
      <Button
        {...rest}
        ref={ref}
        type={(rest.type as "button" | "submit" | "reset" | undefined) || "button"}
        className={tcx(style.button(), className)}
        disabled={disabled || loading}
      >
        {loading ? <LoaderCircle className="animate-spin" /> : children}
      </Button>
    )

    return tooltip ? <Tooltip {...tooltip}>{button}</Tooltip> : button
  },
)

IconButton.displayName = "IconButton"
