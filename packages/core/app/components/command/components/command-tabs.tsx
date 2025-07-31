import { forwardRef, HTMLProps, ReactNode } from "react"
import { tcx } from "~/utils"
import { Tabs } from "../../tabs"
import { commandTabsTv } from "../tv"

export interface CommandTabsProps extends Omit<HTMLProps<HTMLDivElement>, "onChange"> {
  children?: ReactNode
  className?: string
  onValueChange?: (value: string) => void
  value?: string
  variant?: "default" | "dark"
}

export const CommandTabs = forwardRef<HTMLDivElement, CommandTabsProps>(
  ({ className, children, value, onValueChange, variant = "default", ...props }, ref) => {
    const tv = commandTabsTv()

    return (
      <div
        ref={ref}
        className={tcx(tv.root({ className }))}
        {...props}
      >
        <Tabs
          value={value || "all"}
          onChange={onValueChange}
          variant={variant}
          className={tv.tabs()}
        >
          {children}
        </Tabs>
      </div>
    )
  },
)

CommandTabs.displayName = "CommandTabs"
