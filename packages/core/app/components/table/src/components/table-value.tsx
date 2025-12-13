import { tcx } from "@choice-ui/shared"
import type { ReactNode } from "react"

export interface TableValueProps {
  children?: ReactNode
  className?: string
}

export function TableValue({ children, className }: TableValueProps): ReactNode {
  return <span className={tcx("flex-1 truncate", className)}>{children}</span>
}
