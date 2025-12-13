import { tcx } from "@choice-ui/shared"
import type { ReactNode } from "react"
import { memo, useMemo } from "react"
import { useTableStatic, useTableColumnState } from "../context"
import type { TableCellProps } from "../types"
import { tableVariants } from "../tv"

/**
 * Internal props for the pure memoized component
 * Using primitive values instead of objects for better memo comparison
 */
interface TableCellPureProps {
  children: ReactNode
  className?: string
  columnClassName?: string
  // Primitive style values for stable comparison
  width?: string
  minWidth?: number
  flex?: number
  flexShrink?: number
}

/**
 * Pure cell component without context dependencies
 */
function TableCellPure({
  children,
  className,
  columnClassName,
  width,
  minWidth,
  flex,
  flexShrink,
}: TableCellPureProps): ReactNode {
  const tv = tableVariants()

  const cellClassName = useMemo(
    () => tcx(tv.cell(), columnClassName, className),
    [tv, columnClassName, className],
  )

  // Build style object inside the component
  const style = useMemo(() => {
    if (flex !== undefined) {
      return { flex, minWidth }
    }
    return { width, minWidth, flexShrink: flexShrink ?? 0 }
  }, [width, minWidth, flex, flexShrink])

  return (
    <div
      role="cell"
      className={cellClassName}
      style={style}
    >
      {children}
    </div>
  )
}

// Memoized pure component - comparing primitive values is fast and reliable
const TableCellMemo = memo(TableCellPure, (prev, next) => {
  return (
    prev.className === next.className &&
    prev.columnClassName === next.columnClassName &&
    prev.width === next.width &&
    prev.minWidth === next.minWidth &&
    prev.flex === next.flex &&
    prev.flexShrink === next.flexShrink &&
    prev.children === next.children
  )
})

// Default width for columns without explicit width
const DEFAULT_COLUMN_WIDTH = 150

/**
 * Public TableCell component that handles context
 */
export function TableCell({ children, columnId, className }: TableCellProps): ReactNode {
  const { columns } = useTableStatic()
  const { getColumnWidth } = useTableColumnState()

  // Find column definition if columnId is provided
  const column = useMemo(
    () => (columnId ? columns.find((c) => c.id === columnId) : null),
    [columnId, columns],
  )

  // Get dynamic width from state, fallback to column definition
  const dynamicWidth = columnId ? getColumnWidth(columnId) : undefined
  const definedWidth = column?.width
  const actualWidth = dynamicWidth ?? (typeof definedWidth === "number" ? definedWidth : undefined)

  // Flex column uses flex:N, width becomes minWidth
  if (column?.flex !== undefined) {
    const minW = typeof definedWidth === "number" ? definedWidth : (column?.minWidth ?? 100)
    return (
      <TableCellMemo
        className={className}
        columnClassName={column?.className}
        flex={column.flex}
        minWidth={minW}
      >
        {children}
      </TableCellMemo>
    )
  }

  // Compute width - must match table-column.tsx logic exactly
  let width: string | undefined
  let minWidth: number | undefined

  if (actualWidth !== undefined) {
    // Dynamic or numeric width
    width = `${actualWidth}px`
    minWidth = actualWidth
  } else if (typeof definedWidth === "string") {
    // String width (e.g., "25%")
    width = definedWidth
  } else {
    // No width: use default fixed width for header/body sync
    const defaultWidth = column?.minWidth ?? DEFAULT_COLUMN_WIDTH
    width = `${defaultWidth}px`
    minWidth = defaultWidth
  }

  return (
    <TableCellMemo
      className={className}
      columnClassName={column?.className}
      width={width}
      minWidth={minWidth}
      flexShrink={0}
    >
      {children}
    </TableCellMemo>
  )
}
