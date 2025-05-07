import { Check } from "@choiceform/icons-react"
import { forwardRef, memo, useMemo } from "react"
import { MenuItem, type MenuItemProps } from "../../menus"

export interface SelectItemPublicProps extends MenuItemProps {
  value: string
  disabled?: boolean
  active?: boolean
  selected?: boolean
}

export const SelectItem = memo(
  forwardRef<HTMLButtonElement, SelectItemPublicProps>((props, ref) => {
    const { className, classNames, selected, children, ...rest } = props

    const shortcutConfig = useMemo(
      () => ({
        modifier: props.shortcut?.modifier,
        keys: props.shortcut?.keys,
      }),
      [props.shortcut?.modifier, props.shortcut?.keys],
    )

    const prefixConfig = useMemo(
      () => props.prefixElement || (selected ? <Check /> : <></>),
      [props.prefixElement, selected],
    )

    return (
      <MenuItem
        ref={ref}
        shortcut={shortcutConfig}
        prefixElement={prefixConfig}
        {...rest}
      >
        {children}
      </MenuItem>
    )
  }),
)

SelectItem.displayName = "SelectItem"
