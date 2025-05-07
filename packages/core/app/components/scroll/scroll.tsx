import { forwardRef } from "react"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import { ScrollAreaProps } from "@radix-ui/react-scroll-area"
import { Viewport } from "./viewport"
import { tcx } from "~/utils"
import { ScrollTv } from "./tv"

export interface ScrollProps extends ScrollAreaProps {
  classNames?: {
    root?: string
    content?: string
    scrollbar?: string
    thumb?: string
    corner?: string
  }
  variant?: "auto" | "light" | "dark"
  scrollbarMode?: "default" | "large-y" | "large-t" | "large-b" | "large-x" | "large-l" | "large-r"
}

const ScrollComponent = forwardRef<HTMLDivElement, ScrollProps>((props, ref) => {
  const { className, classNames, children, variant, scrollbarMode, ...rest } = props

  const style = ScrollTv({
    variant,
    scrollbarMode,
  })

  return (
    <ScrollArea.Root
      ref={ref}
      className={tcx(style.root(), classNames?.root, className)}
      {...rest}
    >
      {children}

      <ScrollArea.Scrollbar
        className={tcx(style.scrollbar({ orientation: "vertical" }), classNames?.scrollbar)}
        orientation="vertical"
      >
        <ScrollArea.Thumb className={tcx(style.thumb(), classNames?.thumb)} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className={tcx(style.scrollbar({ orientation: "horizontal" }), classNames?.scrollbar)}
        orientation="horizontal"
      >
        <ScrollArea.Thumb className={tcx(style.thumb(), classNames?.thumb)} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className={tcx(style.corner(), classNames?.corner)} />
    </ScrollArea.Root>
  )
})

ScrollComponent.displayName = "Scroll"

export const Scroll = Object.assign(ScrollComponent, {
  Viewport: Viewport,
})
