import { forwardRef, memo } from "react"
import { contextInputTv } from "../tv"

interface ContextInputHeaderProps {
  children?: React.ReactNode
}

export const ContextInputHeader = memo(
  forwardRef<HTMLDivElement, ContextInputHeaderProps>(function ContextInputHeader(props, ref) {
    const { children } = props

    const tv = contextInputTv()

    return (
      <div
        ref={ref}
        className={tv.header()}
      >
        {children}
      </div>
    )
  }),
)
