import { ChevronRightSmall } from "@choiceform/icons-react"
import { useListItem } from "@floating-ui/react"
import { forwardRef, memo, useCallback, useContext, useEffect, useMemo, useRef } from "react"
import { MenuItem, MenuItemProps } from "../../menus"
import { DropdownContext } from "../dropdown-context"
import { useEventCallback } from "usehooks-ts"

export const DropdownSubTrigger = memo(
  forwardRef<HTMLButtonElement, MenuItemProps>((props, forwardedRef) => {
    const {
      children,
      active,
      prefixElement,
      suffixElement = <ChevronRightSmall />,
      ...rest
    } = props

    const item = useListItem()
    const menu = useContext(DropdownContext)
    const buttonRef = useRef<HTMLButtonElement | null>(null)

    const isActive = useMemo(
      () => item.index === menu.activeIndex || !!active,
      [item.index, menu.activeIndex, active],
    )

    useEffect(() => {
      const currentRef = buttonRef.current
      if (!currentRef) return

      const handleKeyDown = (e: KeyboardEvent) => {
        if (isActive && (e.key === "Enter" || e.key === "ArrowRight")) {
          e.preventDefault()
          e.stopPropagation()
          const clickEvent = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
          currentRef.dispatchEvent(clickEvent)
        }
      }

      currentRef.addEventListener("keydown", handleKeyDown)
      return () => {
        currentRef.removeEventListener("keydown", handleKeyDown)
      }
    }, [isActive])

    const handleFocus = useEventCallback((event: React.FocusEvent<HTMLButtonElement>) => {
      props.onFocus?.(event)
      menu.setHasFocusInside(true)
    })

    const setRefs = useEventCallback((node: HTMLButtonElement | null) => {
      buttonRef.current = node

      if (typeof item.ref === "function") {
        item.ref(node)
      }

      if (typeof forwardedRef === "function") {
        forwardedRef(node)
      } else if (forwardedRef) {
        forwardedRef.current = node
      }
    })

    const prefixConfig = useMemo(() => {
      if (prefixElement) return prefixElement
      if (menu.selection) return <></>
      return undefined
    }, [prefixElement, menu.selection])

    return (
      <MenuItem
        ref={setRefs}
        active={isActive}
        suffixElement={suffixElement}
        prefixElement={prefixConfig}
        {...menu.getItemProps({
          ...rest,
          onFocus: handleFocus,
        })}
      >
        {children}
      </MenuItem>
    )
  }),
)

DropdownSubTrigger.displayName = "DropdownSubTrigger"
