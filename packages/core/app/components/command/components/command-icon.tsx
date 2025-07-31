import { forwardRef, HTMLProps } from "react"
import { tcx } from "~/utils"
import { useCommand } from "../hooks"
import { commandItemTv } from "../tv"

export const CommandIcon = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>((props, ref) => {
  const { className, children, ...rest } = props
  const context = useCommand()

  const tv = commandItemTv({ size: context.size })

  return (
    <div
      ref={ref}
      {...rest}
      className={tcx(tv.icon({ className }))}
    >
      {children}
    </div>
  )
})

CommandIcon.displayName = "CommandIcon"
