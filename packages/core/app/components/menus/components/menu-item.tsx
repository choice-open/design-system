import { forwardRef, memo, ReactNode } from "react"
import { tcx } from "~/utils"
import { Kbd, type KbdKey } from "../../kbd"
import { MenuItemTv } from "../tv"

export interface MenuItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  active?: boolean
  disabled?: boolean
  selected?: boolean
  shortcut?: {
    modifier?: KbdKey | KbdKey[] | undefined
    keys?: ReactNode
  }
  classNames?: {
    root?: string
    icon?: string
    shortcut?: string
  }
  prefixElement?: ReactNode
  suffixElement?: ReactNode
}

export const MenuItem = memo(
  forwardRef<HTMLButtonElement, MenuItemProps>((props, ref) => {
    const {
      children,
      className,
      active,
      disabled,
      selected,
      shortcut,
      prefixElement,
      suffixElement,
      ...rest
    } = props

    const styles = MenuItemTv({
      active,
      disabled,
      selected,
      hasPrefix: !!prefixElement,
      hasSuffix: !!suffixElement,
    })

    const hasValidShortcut = shortcut && (shortcut.modifier || shortcut.keys)

    return (
      <button
        {...rest}
        ref={ref}
        type="button"
        role="menuitem"
        className={tcx(styles.root(), className)}
        tabIndex={active ? 0 : -1}
        disabled={disabled}
        aria-disabled={disabled}
        aria-selected={selected}
      >
        {prefixElement && <div className={styles.icon()}>{prefixElement}</div>}

        {children}

        {hasValidShortcut && (
          <Kbd
            className={styles.shortcut()}
            keys={shortcut!.modifier}
          >
            {shortcut!.keys}
          </Kbd>
        )}

        {suffixElement && <div className={styles.icon()}>{suffixElement}</div>}
      </button>
    )
  }),
)

MenuItem.displayName = "MenuItem"
