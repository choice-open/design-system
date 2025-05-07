import {
  Children,
  cloneElement,
  forwardRef,
  HTMLProps,
  isValidElement,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
  useId,
  useMemo,
} from "react"
import { useEventCallback } from "usehooks-ts"
import { tcx } from "~/utils"
import { TabItem, TabItemProps } from "./tab-item"
import { tabsTv } from "./tv"

interface TabsProps extends Omit<HTMLProps<HTMLDivElement>, "onChange"> {
  className?: string
  classNames?: {
    container?: string
    tab?: string
    label?: string
  }
  value: string
  onChange?: (value: string) => void
  children?: ReactNode
}

interface TabsComponent
  extends React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>> {
  Item: typeof TabItem
}

const TabsBase = forwardRef<HTMLDivElement, TabsProps>(function Tabs(props, ref) {
  const {
    value: valueProp,
    onChange,
    classNames,
    className,
    "aria-label": ariaLabel,
    children,
    ...rest
  } = props
  const id = useId()

  const handleMouseDown = useEventCallback(
    (
      e: MouseEvent<HTMLButtonElement>,
      value: string,
      disabled?: boolean,
      originalHandler?: (e: MouseEvent<HTMLButtonElement>) => void,
    ) => {
      if (!disabled) {
        e.preventDefault()
        onChange?.(value)
      }
      e.stopPropagation()
      if (originalHandler) {
        originalHandler(e)
      }
    },
  )

  const handleKeyDown = useEventCallback(
    (
      e: KeyboardEvent<HTMLButtonElement>,
      value: string,
      disabled?: boolean,
      originalHandler?: (e: KeyboardEvent<HTMLButtonElement>) => void,
    ) => {
      if (!disabled && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault()
        onChange?.(value)
      }
      if (originalHandler) {
        originalHandler(e)
      }
    },
  )

  const validChildren = useMemo(() => {
    return Children.toArray(children).filter(
      (child): child is ReactElement<TabItemProps> =>
        isValidElement(child) && child.type === TabItem,
    )
  }, [children])

  const renderTabItems = useMemo(() => {
    return validChildren.map((tabChild, index) => {
      const {
        value,
        disabled,
        children: tabChildren,
        "aria-label": itemAriaLabel,
        onMouseDown: originalMouseDown,
        onKeyDown: originalKeyDown,
      } = tabChild.props
      const isActive = value === valueProp
      const styles = tabsTv({ active: isActive, disabled })
      const tabId = `${id}-tab-${value}`

      let ariaLabelText = itemAriaLabel
      if (!ariaLabelText && typeof tabChildren === "string") {
        ariaLabelText = tabChildren
      }

      return cloneElement(tabChild, {
        key: value || index,
        role: "tab",
        type: "button" as const,
        "aria-selected": isActive,
        "aria-disabled": disabled,
        tabIndex: isActive ? 0 : -1,
        id: tabId,
        className: tcx(styles.tab(), classNames?.tab, tabChild.props.className),
        onMouseDown: (e) => handleMouseDown(e, value, disabled, originalMouseDown),
        onKeyDown: (e) => handleKeyDown(e, value, disabled, originalKeyDown),
        children: (
          <>
            <span
              aria-hidden="true"
              className={tcx(
                typeof tabChildren === "string" ? styles.label() : "sr-only",
                classNames?.label,
              )}
            >
              {typeof tabChildren === "string" ? tabChildren : ariaLabelText}
            </span>
            <span className={tcx(styles.label(), classNames?.label)}>{tabChildren}</span>
          </>
        ),
      })
    })
  }, [validChildren, valueProp, id, classNames, handleMouseDown, handleKeyDown])

  return (
    <div
      ref={ref}
      role="tablist"
      aria-orientation="horizontal"
      aria-label={ariaLabel || "Tabs"}
      className={tcx(tabsTv().root(), classNames?.container, className)}
      {...rest}
    >
      {renderTabItems}
    </div>
  )
})

TabsBase.displayName = "Tabs"

const Tabs = TabsBase as TabsComponent
Tabs.Item = TabItem

export { Tabs }
