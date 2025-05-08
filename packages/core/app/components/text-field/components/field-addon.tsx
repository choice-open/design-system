import { forwardRef, HTMLProps, memo, ReactNode } from "react"

interface FieldAddonProps extends HTMLProps<HTMLDivElement> {
  className?: string
  children?: ReactNode
  placement?: "prefix" | "suffix"
}

export const FieldAddon = memo(
  forwardRef<HTMLDivElement, FieldAddonProps>((props, ref) => {
    const { placement, ...rest } = props
    return (
      <div
        ref={ref}
        data-placement={placement}
        {...rest}
      />
    )
  }),
)

FieldAddon.displayName = "FieldAddon"
