import { tcx } from "@choice-ui/shared"
import { Checkbox } from "@choice-ui/checkbox"
import { Children, isValidElement, type ReactNode, useCallback, useMemo } from "react"
import { memo } from "react"
import type { ConsecutiveStyle, RowKey, TableRowProps } from "../types"
import { tableVariants } from "../tv"

// Stable empty function for Checkbox onChange
const NOOP = () => {}

/**
 * Internal props that include pre-computed values from context
 * This allows the component to be properly memoized
 */
interface TableRowInternalProps extends TableRowProps {
  // Pre-computed from context to avoid context dependency
  selectable: boolean
  isSelected: boolean
  isActive: boolean
  consecutiveStyle: ConsecutiveStyle
  columnOrder: string[]
  reorderable: boolean
  hasRowClick: boolean
  // Stable handlers
  onCheckboxClick: (e: React.MouseEvent) => void
  onRowClickHandler: ((event: React.MouseEvent) => void) | undefined
  onRowKeyDown: ((event: React.KeyboardEvent) => void) | undefined
}

function TableRowPure({
  rowKey,
  index,
  children,
  className,
  // Pre-computed values
  selectable,
  isSelected,
  isActive,
  consecutiveStyle,
  columnOrder,
  reorderable,
  hasRowClick,
  // Stable handlers
  onCheckboxClick,
  onRowClickHandler,
  onRowKeyDown,
}: TableRowInternalProps): ReactNode {
  const tv = tableVariants()

  // Sort children based on columnOrder if reorderable
  const orderedChildren = useMemo(() => {
    if (!reorderable || columnOrder.length === 0) {
      return children
    }

    const childArray = Children.toArray(children)

    // Create a map of columnId to child element
    const childMap = new Map<string, ReactNode>()
    childArray.forEach((child) => {
      if (isValidElement(child) && child.props.columnId) {
        childMap.set(child.props.columnId, child)
      }
    })

    // Sort children according to columnOrder
    const sorted = columnOrder
      .map((id) => childMap.get(id))
      .filter((child): child is ReactNode => child !== undefined)

    // Add any children not in columnOrder at the end
    childArray.forEach((child) => {
      if (
        isValidElement(child) &&
        child.props.columnId &&
        !columnOrder.includes(child.props.columnId)
      ) {
        sorted.push(child)
      }
    })

    return sorted
  }, [children, columnOrder, reorderable])

  const rowClassName = useMemo(
    () =>
      tcx(
        tv.rowStatic({ selected: isSelected, active: isActive }), // Always use rowStatic - virtualized rows are wrapped by VirtualRowWrapper
        consecutiveStyle,
        className,
      ),
    [tv, hasRowClick, isSelected, isActive, consecutiveStyle, className],
  )

  return (
    <div
      role="row"
      aria-selected={isSelected}
      aria-rowindex={index + 2}
      className={rowClassName}
      data-selected={isSelected}
      data-active={isActive}
      data-index={index}
      onClick={onRowClickHandler}
      onKeyDown={onRowKeyDown}
      tabIndex={hasRowClick ? 0 : undefined}
    >
      {/* Selection checkbox */}
      {selectable && (
        <div
          role="cell"
          className={tv.cellCheckbox()}
          style={{ width: 40, minWidth: 40, flexShrink: 0 }}
        >
          <Checkbox
            variant="accent"
            value={isSelected}
            onChange={NOOP}
            onClick={onCheckboxClick}
          />
        </div>
      )}
      {/* Row cells - ordered by columnOrder */}
      {orderedChildren}
    </div>
  )
}

// Memoized pure component - no context dependencies
// Note: We don't compare children because render props always create new children.
// The row's own rendering (checkbox, className, etc.) will still be memoized.
const TableRowMemo = memo(TableRowPure, (prev, next) => {
  // Compare only the values that affect the row's own rendering
  // Children are intentionally not compared - they're managed by render props
  return (
    prev.rowKey === next.rowKey &&
    prev.index === next.index &&
    prev.className === next.className &&
    prev.selectable === next.selectable &&
    prev.isSelected === next.isSelected &&
    prev.isActive === next.isActive &&
    prev.consecutiveStyle === next.consecutiveStyle &&
    prev.reorderable === next.reorderable &&
    prev.hasRowClick === next.hasRowClick &&
    prev.columnOrder === next.columnOrder
  )
})

// Re-export types for the public API
export type { TableRowProps }

// Named export for internal use (will be wrapped by TableBody)
export { TableRowMemo as TableRowPure }

/**
 * Public TableRow component that handles context and wraps the memoized component.
 * This is the component users interact with.
 */
import { useTableStatic, useTableSelection, useTableColumnState, useTableRows } from "../context"

export function TableRow({
  rowKey,
  index,
  children,
  className,
  onClick,
}: TableRowProps): ReactNode {
  const { selectable, onRowClick, reorderable } = useTableStatic()
  const { isRowSelected, handleCheckboxClick, activeRowKey, getConsecutiveStyle } =
    useTableSelection()
  const { columnOrder } = useTableColumnState()
  const { rows } = useTableRows()

  // Pre-compute all values from context
  const isSelected = isRowSelected(rowKey)
  const isActive = activeRowKey === rowKey
  const consecutiveStyle = getConsecutiveStyle(index)
  const hasRowClick = !!onRowClick || !!onClick

  // Create stable handlers
  const onCheckboxClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      handleCheckboxClick(rowKey, index, e)
    },
    [handleCheckboxClick, rowKey, index],
  )

  // Use rows from context for O(1) lookup via index
  const onRowClickHandler = useMemo(() => {
    if (!onRowClick && !onClick) return undefined
    return (event: React.MouseEvent) => {
      onClick?.(event)
      // O(1) lookup using index with bounds check
      if (index >= 0 && index < rows.length) {
        const row = rows[index]
        if (row && onRowClick) {
          onRowClick(row.data, event)
        }
      }
    }
  }, [onClick, onRowClick, rows, index])

  const onRowKeyDown = useMemo(() => {
    if (!onRowClick && !onClick) return undefined
    return (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        // O(1) lookup using index with bounds check
        if (index >= 0 && index < rows.length) {
          const row = rows[index]
          if (row && onRowClick) {
            onRowClick(row.data, event as unknown as React.MouseEvent)
          }
        }
      }
    }
  }, [onClick, onRowClick, rows, index])

  return (
    <TableRowMemo
      rowKey={rowKey}
      index={index}
      className={className}
      selectable={selectable}
      isSelected={isSelected}
      isActive={isActive}
      consecutiveStyle={consecutiveStyle}
      columnOrder={columnOrder}
      reorderable={reorderable}
      hasRowClick={hasRowClick}
      onCheckboxClick={onCheckboxClick}
      onRowClickHandler={onRowClickHandler}
      onRowKeyDown={onRowKeyDown}
    >
      {children}
    </TableRowMemo>
  )
}
