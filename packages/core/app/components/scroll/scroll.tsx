import { forwardRef } from "react"
import * as ScrollArea from "./scroll-area"
import { Content, ScrollAreaProps, Viewport } from "./scroll-area"
import { tcx } from "~/utils"
import { ScrollTv } from "./tv"

export interface ScrollProps extends ScrollAreaProps {
  classNames?: {
    content?: string
    corner?: string
    root?: string
    scrollbar?: string
    thumb?: string
  }
  orientation?: "vertical" | "horizontal" | "both"
  scrollbarMode?: "default" | "large-y" | "large-t" | "large-b" | "large-x" | "large-l" | "large-r"
  variant?: "auto" | "light" | "dark"
}

const ScrollComponent = forwardRef<HTMLDivElement, ScrollProps>((props, ref) => {
  const {
    className,
    classNames,
    children,
    variant,
    scrollbarMode,
    orientation = "both",
    ...rest
  } = props

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

      {(orientation === "vertical" || orientation === "both") && (
        <ScrollArea.Scrollbar
          className={tcx(style.scrollbar({ orientation: "vertical" }), classNames?.scrollbar)}
          orientation="vertical"
        >
          <ScrollArea.Thumb className={tcx(style.thumb(), classNames?.thumb)} />
        </ScrollArea.Scrollbar>
      )}

      {(orientation === "horizontal" || orientation === "both") && (
        <ScrollArea.Scrollbar
          className={tcx(style.scrollbar({ orientation: "horizontal" }), classNames?.scrollbar)}
          orientation="horizontal"
        >
          <ScrollArea.Thumb className={tcx(style.thumb(), classNames?.thumb)} />
        </ScrollArea.Scrollbar>
      )}

      <ScrollArea.Corner className={tcx(style.corner(), classNames?.corner)} />
    </ScrollArea.Root>
  )
})

ScrollComponent.displayName = "Scroll"

export const Scroll = Object.assign(ScrollComponent, {
  Viewport: Viewport,
  Content: Content,
})
