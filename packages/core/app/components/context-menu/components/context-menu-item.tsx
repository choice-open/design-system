import { Check } from "@choiceform/icons-react"
import * as CM from "@radix-ui/react-context-menu"
import { ReactNode, forwardRef } from "react"
import { tcx } from "~/utils/tcx"
import { Kbd, KbdKey } from "../../kbd"
import { MenuItemTv } from "../../menus/tv"
import { useContextMenu } from "../context-menu-context"

export interface ContextMenuItemProps {
  children?: ReactNode
  disabled?: boolean
  selected?: boolean
  prefixElement?: ReactNode
  suffixElement?: ReactNode
  shortcut?: {
    modifier?: KbdKey | KbdKey[] | undefined
    keys?: ReactNode
  }
  onClick?: () => void
  onHover?: () => void
  className?: string
}

export const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(
  function ContextMenuItem(
    {
      children,
      disabled,
      onClick,
      selected,
      prefixElement = <Check />,
      suffixElement,
      shortcut,
      onHover,
      className,
      ...props
    },
    ref,
  ) {
    const { selection = false } = useContextMenu()

    const hasPrefix = selection

    const styles = MenuItemTv({
      disabled,
      hasPrefix,
      hasSuffix: !!shortcut || !!suffixElement,
    })

    const renderPrefixElement = () => {
      if (!selection) return null

      return <div className={styles.icon()}>{selected ? prefixElement : null}</div>
    }

    const renderShortcut = () => {
      if (!shortcut) return null

      return (
        <Kbd
          className={styles.shortcut()}
          keys={shortcut.modifier}
        >
          {shortcut.keys}
        </Kbd>
      )
    }

    const renderSuffixElement = () => {
      if (!suffixElement) return null

      return suffixElement
    }

    return (
      <CM.Item
        {...props}
        ref={ref}
        disabled={disabled}
        onSelect={onClick}
        className={tcx(
          styles.root(),
          "data-[highlighted]:bg-accent-background data-[highlighted]:text-on-accent-foreground",
          className,
        )}
        onMouseEnter={() => {
          if (disabled) return
          onHover?.()
        }}
      >
        {renderPrefixElement()}
        <span className="flex-1">{children}</span>
        {renderShortcut()}
        {renderSuffixElement()}
      </CM.Item>
    )
  },
)

ContextMenuItem.displayName = "ContextMenu.Item"
