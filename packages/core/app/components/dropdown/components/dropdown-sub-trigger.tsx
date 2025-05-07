import { ChevronRightSmall } from "@choiceform/icons-react"
import { useListItem } from "@floating-ui/react"
import { forwardRef, memo, useCallback, useContext, useEffect, useMemo, useRef } from "react"
import { MenuItem, MenuItemProps } from "../../menus"
import { DropdownContext } from "../dropdown-context"

interface DropdownSubTriggerProps extends MenuItemProps {
  selection?: boolean
  active?: boolean
}

export const DropdownSubTrigger = memo(
  forwardRef<HTMLButtonElement, DropdownSubTriggerProps>((props, forwardedRef) => {
    const {
      selection,
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

    const handleFocus = useCallback(
      (event: React.FocusEvent<HTMLButtonElement>) => {
        props.onFocus?.(event)
        menu.setHasFocusInside(true)
      },
      [menu, props],
    )

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
      [item.ref, forwardedRef],
    )

    const prefixConfig = useMemo(() => {
      if (prefixElement) return prefixElement
      if (selection) return <></>
      return undefined
    }, [prefixElement, selection])

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
