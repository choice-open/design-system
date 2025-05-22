import { memo, useContext } from "react"
import { MenuLabel, MenuLabelProps } from "../../menus"
import { DropdownContext } from "../dropdown-context"

export const DropdownLabel = memo(function DropdownLabel(props: MenuLabelProps) {
  const menu = useContext(DropdownContext)

  return (
    <MenuLabel
      selection={menu.selection}
      {...props}
    />
  )
})
