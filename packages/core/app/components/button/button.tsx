import { LoaderCircle } from "@choiceform/icons-react"
import { cloneElement, forwardRef, HTMLProps, isValidElement, useMemo } from "react"
import { isMultiElement, tcx } from "~/utils"
import { Slot } from "../slot"
import { Tooltip, type TooltipProps } from "../tooltip"
import { buttonTv } from "./tv"

export interface ButtonProps extends Omit<HTMLProps<HTMLButtonElement>, "size"> {
  active?: boolean
  asChild?: boolean
  className?: string
  focused?: boolean
  loading?: boolean
  size?: "default" | "large"
  tooltip?: TooltipProps
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
    "aria-label": ariaLabel,
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

  const ariaLabelProps = useMemo(() => {
    if (typeof children === "string") {
      return children
    }

    return props["aria-label"]
  }, [children, props])

  const button = (
    <Button
      {...rest}
      ref={ref}
      type={(rest.type as "button" | "submit" | "reset" | undefined) || "button"}
      disabled={disabled || loading}
      className={tcx(style.button(), className)}
      data-multi-element={isMultiElement(content)}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      aria-label={ariaLabelProps}
    >
      {content}
    </Button>
  )

  return tooltip ? <Tooltip {...tooltip}>{button}</Tooltip> : button
})

Button.displayName = "Button"
