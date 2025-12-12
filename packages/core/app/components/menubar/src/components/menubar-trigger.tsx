import { Button, type ButtonProps } from "@choice-ui/button"
import { tcx } from "@choice-ui/shared"
import { forwardRef, memo, type ReactNode } from "react"
import { MenubarTriggerTv } from "../tv"

export interface MenubarTriggerProps extends Omit<ButtonProps, "children"> {
  children?: ReactNode | ((active: boolean) => ReactNode)
  prefixElement?: ReactNode
  suffixElement?: ReactNode
}

export const MenubarTrigger = memo(
  forwardRef<HTMLButtonElement, MenubarTriggerProps>((props, ref) => {
    const {
      children,
      className,
      size = "default",
      prefixElement,
      suffixElement,
      active,
      disabled,
      ...rest
    } = props

    const tv = MenubarTriggerTv({
      size,
      hasPrefix: prefixElement !== undefined,
      hasSuffix: suffixElement !== undefined,
    })

    return (
      <Button
        ref={ref}
        className={tcx(tv.root(), className)}
        variant="ghost"
        active={active}
        disabled={disabled}
        size={size}
        {...rest}
      >
        {prefixElement && <div className={tv.icon()}>{prefixElement}</div>}
        {typeof children === "function" ? children(active ?? false) : children}
        {suffixElement && <div className={tv.icon()}>{suffixElement}</div>}
      </Button>
    )
  }),
)

MenubarTrigger.displayName = "MenubarTrigger"
