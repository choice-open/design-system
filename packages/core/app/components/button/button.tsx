import { LoaderCircle } from "@choiceform/icons-react"
import { Slot } from "@radix-ui/react-slot"
import { cloneElement, forwardRef, HTMLProps, isValidElement } from "react"
import { isMultiElement, tcx } from "~/utils"
import { Tooltip, type TooltipProps } from "../tooltip"
import { buttonTv } from "./tv"

export interface ButtonProps extends Omit<HTMLProps<HTMLButtonElement>, "size"> {
  className?: string
  variant?:
    | "primary"
    | "secondary"
    | "solid"
    | "destructive"
    | "secondary-destruct"
    | "inverse"
    | "success"
    | "link"
    | "link-danger"
    | "ghost"
    | "dark"
    | "reset"
  size?: "default" | "large"
  active?: boolean
  focused?: boolean
  loading?: boolean
  tooltip?: TooltipProps
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  const {
    className,
    variant = "primary",
    size = "default",
    disabled,
    active,
    focused,
    loading,
    asChild,
    children,
    tooltip,
    ...rest
  } = props

  const Button = asChild ? Slot : "button"

  const style = buttonTv({ variant, size, active, disabled, loading, focused, className })

  const content = isValidElement(children) ? (
    cloneElement(children as React.ReactElement, {
      children: (children as React.ReactElement).props.children,
    })
  ) : loading ? (
    <>
      <div className={tcx(style.spinner())}>
        <LoaderCircle className="animate-spin" />
      </div>
      <span className={tcx(style.content())}>{children}</span>
    </>
  ) : (
    children
  )

  const button = (
    <Button
      {...rest}
      ref={ref}
      type={(rest.type as "button" | "submit" | "reset" | undefined) || "button"}
      disabled={disabled || loading}
      className={tcx(style.button(), className)}
      data-multi-element={isMultiElement(content)}
    >
      {content}
    </Button>
  )

  return tooltip ? <Tooltip {...tooltip}>{button}</Tooltip> : button
})

Button.displayName = "Button"
