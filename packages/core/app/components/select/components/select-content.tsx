import { forwardRef, HTMLProps } from "react"
import { MenusBase } from "../../menus"

interface SelectContentProps extends HTMLProps<HTMLDivElement> {
  children: React.ReactNode
  matchTriggerWidth?: boolean
}

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>((props, ref) => {
  const { children, matchTriggerWidth, ...rest } = props

  return (
    <MenusBase
      ref={ref}
      matchTriggerWidth={matchTriggerWidth}
      {...rest}
    >
      {children}
    </MenusBase>
  )
})

SelectContent.displayName = "SelectContent"
