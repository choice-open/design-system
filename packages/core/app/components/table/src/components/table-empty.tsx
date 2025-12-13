import { tcx } from "@choice-ui/shared"
import type { ReactNode } from "react"
import { tableVariants } from "../tv"

export interface TableEmptyProps {
  /** Empty state content */
  children: ReactNode
  /** Custom className */
  className?: string
}

const tv = tableVariants()

export function TableEmpty({ children, className }: TableEmptyProps): ReactNode {
  return <div className={tcx(tv.emptyState(), className)}>{children}</div>
}
