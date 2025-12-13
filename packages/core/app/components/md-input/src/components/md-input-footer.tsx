import { tcx } from "@choice-ui/shared"
import { forwardRef, memo } from "react"
import { useMdInputContext } from "../context"
import { mdInputTv } from "../tv"

export interface MdInputFooterProps {
  children?: React.ReactNode
  className?: string
}

export const MdInputFooter = memo(
  forwardRef<HTMLDivElement, MdInputFooterProps>((props, ref) => {
    const { children, className } = props
    const { disabled, readOnly } = useMdInputContext()
    const tv = mdInputTv({ disabled, readOnly })

    return (
      <div
        ref={ref}
        className={tcx(tv.footer(), className)}
      >
        {children}
      </div>
    )
  }),
)

MdInputFooter.displayName = "MdInputFooter"
