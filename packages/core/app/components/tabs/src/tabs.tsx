import { tcx } from "@choice-ui/shared"
import { forwardRef, HTMLProps, ReactNode, useId } from "react"
import { useEventCallback } from "usehooks-ts"
import { TabsContext } from "./context"
import { TabItem } from "./tab-item"
import { tabsTv } from "./tv"

export interface TabsProps extends Omit<HTMLProps<HTMLElement>, "onChange" | "as"> {
  as?: React.ElementType
  children?: ReactNode
  className?: string
  disabled?: boolean
  onChange?: (value: string) => void
  readOnly?: boolean
  value: string
  variant?: "default" | "light" | "dark" | "accent" | "reset"
}

interface TabsComponent extends React.ForwardRefExoticComponent<
  TabsProps & React.RefAttributes<HTMLElement>
> {
  Item: typeof TabItem
}

const TabsRoot = forwardRef<HTMLElement, TabsProps>(function Tabs(props, ref) {
  const {
    as = "div",
    value: valueProp,
    onChange,
    className,
    disabled,
    readOnly = false,
    "aria-label": ariaLabel,
    children,
    variant = "default",
    ...rest
  } = props
  const id = useId()

  const handleChange = useEventCallback((newValue: string) => {
    if (readOnly) return
    onChange?.(newValue)
  })

  const As = as ?? "div"
  const divProps = As === "div" ? { role: "tablist" } : {}

  const tv = tabsTv({ variant })

  return (
    <TabsContext.Provider
      value={{
        disabled,
        readOnly,
        value: valueProp,
        onChange: handleChange,
        variant,
        id,
      }}
    >
      <As
        ref={ref}
        aria-orientation="horizontal"
        aria-disabled={disabled}
        aria-label={ariaLabel || "Tabs"}
        className={tcx(tv.root(), className)}
        {...divProps}
        {...rest}
      >
        {children}
      </As>
    </TabsContext.Provider>
  )
})

TabsRoot.displayName = "Tabs"

const Tabs = TabsRoot as TabsComponent
Tabs.Item = TabItem

export { Tabs }
