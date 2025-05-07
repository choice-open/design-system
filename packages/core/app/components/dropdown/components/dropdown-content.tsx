import { forwardRef, HTMLProps } from "react"
import { MenusBase } from "../../menus"

interface DropdownContentProps extends HTMLProps<HTMLDivElement> {
  children: React.ReactNode
  matchTriggerWidth?: boolean
}

export const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>((props, ref) => {
  const { children, className, matchTriggerWidth, ...rest } = props

  return (
    <MenusBase
      ref={ref}
      matchTriggerWidth={matchTriggerWidth}
      className={className}
      {...rest}
    >
      {children}
    </MenusBase>
  )
})

DropdownContent.displayName = "DropdownContent"
