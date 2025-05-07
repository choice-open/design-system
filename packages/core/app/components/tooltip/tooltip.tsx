import { Kbd, KbdKey } from "../kbd"
import { ReactNode } from "react"
import { tcx } from "~/utils"
import * as TooltipRadix from "@radix-ui/react-tooltip"

export interface TooltipProps {
  children?: React.ReactNode
  content?: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  delayDuration?: number
  disableHoverableContent?: boolean
  placement?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
  align?: "start" | "center" | "end"
  classNames?: {
    content?: string
    arrow?: string
  }
  shortcut?: {
    modifier?: KbdKey | KbdKey[] | undefined
    keys?: ReactNode
  }
}

export const TooltipProvider = TooltipRadix.Provider

export const Tooltip = (props: TooltipProps) => {
  const {
    children,
    content,
    open,
    defaultOpen,
    onOpenChange,
    className,
    classNames,
    delayDuration = 1000,
    disableHoverableContent = true,
    placement = "bottom",
    sideOffset = 2,
    align = "center",
    shortcut,
    ...rest
  } = props

  return (
    <TooltipRadix.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      delayDuration={delayDuration}
      disableHoverableContent={content ? disableHoverableContent : false}
    >
      <TooltipRadix.Trigger asChild>{children}</TooltipRadix.Trigger>

      <TooltipRadix.Portal>
        <TooltipRadix.Content
          className={tcx(
            "bg-menu-background text-white",
            "flex items-center gap-2",
            "rounded-md px-2 py-1",
            "shadow-md",
            "z-tooltip",
            "pointer-events-none select-none",
            classNames?.content,
          )}
          side={placement}
          sideOffset={sideOffset}
          align={align}
          {...rest}
        >
          {content}
          {shortcut && (
            <Kbd
              className="opacity-50"
              keys={shortcut.modifier}
            >
              {shortcut.keys}
            </Kbd>
          )}
          <TooltipRadix.Arrow className={tcx("fill-menu-background", classNames?.arrow)} />
        </TooltipRadix.Content>
      </TooltipRadix.Portal>
    </TooltipRadix.Root>
  )
}
