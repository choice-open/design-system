import * as ScrollArea from "@radix-ui/react-scroll-area"
import { type ScrollAreaViewportProps } from "@radix-ui/react-scroll-area"
import { forwardRef } from "react"

export const Viewport = forwardRef<HTMLDivElement, ScrollAreaViewportProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <ScrollArea.Viewport
      ref={ref}
      {...rest}
    >
      {children}
    </ScrollArea.Viewport>
  )
})

Viewport.displayName = "Scroll.Viewport"
