import * as CM from "@radix-ui/react-context-menu"
import React, { ReactNode } from "react"
import {
  ContextMenuContent,
  ContextMenuDivider,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuTrigger,
  ContextSubmenu,
} from "./components"
import { ContextMenuContext } from "./context-menu-context"
import { processMenuChildren } from "./utils"

export interface ContextMenuProps {
  children: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  modal?: boolean
  selection?: boolean
  // 内容选项
  contentProps?: Omit<React.ComponentProps<typeof ContextMenuContent>, "children">
}

// Main ContextMenu component
const ContextMenuComponent = ({
  children,
  open,
  onOpenChange,
  modal = false,
  selection = false,
  contentProps,
}: ContextMenuProps) => {
  const contextValue = {
    open,
    onOpenChange,
    selection,
  }

  // 使用公共函数处理子元素
  const { triggerElement, contentElement } = processMenuChildren(
    children,
    ContextMenuTrigger,
    ContextMenuContent,
    contentProps,
  )

  return (
    <ContextMenuContext.Provider value={contextValue}>
      <CM.Root
        modal={modal}
        dir="ltr"
      >
        {triggerElement}
        {contentElement}
      </CM.Root>
    </ContextMenuContext.Provider>
  )
}

// Assemble the compound component
export const ContextMenu = Object.assign(ContextMenuComponent, {
  Trigger: ContextMenuTrigger,
  Content: ContextMenuContent,
  Item: ContextMenuItem,
  Divider: ContextMenuDivider,
  Submenu: ContextSubmenu,
  Label: ContextMenuLabel,
})
