import { forwardRef } from "react"
import { Tabs, type TabsProps } from "~/components"
import { useCommand } from "../hooks/use-command"
import { commandTabsTv } from "../tv"

export const CommandTabs = forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const context = useCommand()
  const tv = commandTabsTv()

  return (
    <Tabs
      value={props.value || "all"}
      variant={props.variant || context.variant}
      className={tv.tabs()}
    >
      {props.children}
    </Tabs>
  )
})

CommandTabs.displayName = "CommandTabs"
