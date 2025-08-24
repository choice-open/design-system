import React, { forwardRef, HTMLProps, useEffect, useMemo, useRef } from "react"
import { tcx } from "~/utils"
import { GroupContext, useCommand, useCommandState, useValue } from "../hooks"
import { commandItemTv } from "../tv"
import { SELECT_EVENT, VALUE_ATTR } from "../utils"
import { tcv } from "~/utils"

export const CommandValue = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>((props, ref) => {
  const { className, children, ...rest } = props
  const context = useCommand()

  const tv = commandItemTv({ size: context.size })

  return (
    <div
      ref={ref}
      {...rest}
      className={tcx(tv.value({ className }))}
    >
      {children}
    </div>
  )
})

CommandValue.displayName = "CommandValue"
