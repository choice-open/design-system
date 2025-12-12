import { Check, ChevronRightSmall } from "@choiceform/icons-react"
import { useFloatingTree, useListItem } from "@floating-ui/react"
import { forwardRef, memo, startTransition, useCallback, useContext, useMemo, useRef } from "react"
import { useEventCallback } from "usehooks-ts"
import { MenuItem, MenuItemProps } from "../components/menu-item"
import { MenuContext } from "./menu-context"

export const MenuContextSubTrigger = memo(
  forwardRef<HTMLButtonElement, MenuItemProps>((props, forwardedRef) => {
    const {
      children,
      active,
      selected,
      prefixElement,
      suffixElement = <ChevronRightSmall />,
      onClick,
      onMouseUp,
      onPointerUp,
      ...rest
    } = props

    const item = useListItem()
    const menu = useContext(MenuContext)
    const tree = useFloatingTree()
    const buttonRef = useRef<HTMLButtonElement | null>(null)

    // 如果没有 menu context，抛出错误
    if (!menu) {
      throw new Error("MenuContextSubTrigger must be used within a MenuContext component")
    }

    const isActive = useMemo(
      () => item.index === menu.activeIndex || !!active,
      [item.index, menu.activeIndex, active],
    )

    const handleFocus = useEventCallback((event: React.FocusEvent<HTMLButtonElement>) => {
      props.onFocus?.(event)
      menu.setHasFocusInside(true)
    })

    const closeMenu = useEventCallback(() => {
      if (menu.selection && selected !== undefined) {
        startTransition(() => {
          tree?.events.emit("click")
        })
      }
    })

    const handleClick = useEventCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      if (menu.readOnly) {
        return
      }

      onClick?.(event)
      closeMenu()
    })

    const handleMouseUp = useEventCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      if (menu.readOnly) {
        return
      }

      onMouseUp?.(event)
      closeMenu()
    })

    const handlePointerUp = useEventCallback((event: React.PointerEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      if (menu.readOnly) {
        return
      }

      onPointerUp?.(event)
      closeMenu()
    })

    const setRefs = useCallback(
      (node: HTMLButtonElement | null) => {
        buttonRef.current = node

        if (typeof item.ref === "function") {
          item.ref(node)
        }

        if (typeof forwardedRef === "function") {
          forwardedRef(node)
        } else if (forwardedRef) {
          forwardedRef.current = node
        }
      },
      [item, forwardedRef],
    )

    // 前缀配置 - 支持选中状态显示
    const prefixConfig = useMemo(() => {
      if (prefixElement) return prefixElement
      if (menu.selection && selected) {
        // 当处于 selection 模式且被选中时，显示选中标记
        return <Check />
      }
      if (menu.selection) return <></>
      return undefined
    }, [prefixElement, menu.selection, selected])

    return (
      <MenuItem
        ref={setRefs}
        active={isActive}
        selected={selected}
        suffixElement={suffixElement}
        prefixElement={prefixConfig}
        aria-haspopup="menu"
        {...menu.getItemProps({
          ...rest,
          // 在 selection 模式下，如果 selected 属性存在（说明是可选的），则使用 handleClick 关闭菜单
          // 否则保持默认行为（打开子菜单）
          onClick: menu.selection && selected !== undefined ? handleClick : undefined,
          onMouseUp: menu.selection && selected !== undefined ? handleMouseUp : undefined,
          onPointerUp: menu.selection && selected !== undefined ? handlePointerUp : undefined,
          onFocus: handleFocus,
          size: undefined,
        })}
      >
        {children}
      </MenuItem>
    )
  }),
)

MenuContextSubTrigger.displayName = "MenuContextSubTrigger"
