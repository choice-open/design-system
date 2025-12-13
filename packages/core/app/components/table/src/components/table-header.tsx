import { tcx } from "@choice-ui/shared"
import { Checkbox } from "@choice-ui/checkbox"
import { Children, isValidElement, type ReactNode, useCallback, useMemo } from "react"
import { useTableStatic, useTableSelection, useTableColumnState, useTableScroll } from "../context"
import type { TableHeaderProps } from "../types"
import { tableVariants } from "../tv"

// Cache variants at module level
const TV = tableVariants()

export function TableHeader({ children, className }: TableHeaderProps): ReactNode {
  const { selectable, selectionMode, reorderable } = useTableStatic()
  const { isAllSelected, isSomeSelected, selectAll, deselectAll } = useTableSelection()
  const { columnOrder } = useTableColumnState()
  const { headerInnerRef } = useTableScroll()

  const handleSelectAllChange = useCallback(
    (checked: boolean) => {
      if (checked) {
        selectAll()
      } else {
        deselectAll()
      }
    },
    [selectAll, deselectAll],
  )

  const handleCheckboxClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  // Sort children based on columnOrder if reorderable
  const orderedChildren = useMemo(() => {
    if (!reorderable || columnOrder.length === 0) {
      return children
    }

    const childArray = Children.toArray(children)
    const childMap = new Map<string, ReactNode>()

    childArray.forEach((child) => {
      if (isValidElement(child) && child.props.id) {
        childMap.set(child.props.id, child)
      }
    })

    const sorted = columnOrder
      .map((id) => childMap.get(id))
      .filter((child): child is ReactNode => child !== undefined)

    childArray.forEach((child) => {
      if (isValidElement(child) && child.props.id && !columnOrder.includes(child.props.id)) {
        sorted.push(child)
      }
    })

    return sorted
  }, [children, columnOrder, reorderable])

  // Only compute selection state when needed
  const showSelectAllCheckbox = selectable && selectionMode === "multiple"
  const allSelected = showSelectAllCheckbox ? isAllSelected() : false
  const someSelected = showSelectAllCheckbox ? isSomeSelected() : false

  return (
    <div
      role="rowgroup"
      className={tcx(TV.headerWrapper(), className)}
    >
      <div
        ref={headerInnerRef}
        role="row"
        className={TV.headerInner()}
      >
        <div className={TV.headerRow()}>
          {/* Selection checkbox column */}
          {selectable && (
            <div
              role="columnheader"
              aria-label="Select all"
              className={TV.headerCheckbox()}
              style={{ width: 40, minWidth: 40 }}
            >
              {selectionMode === "multiple" && (
                <Checkbox
                  variant="accent"
                  value={allSelected}
                  mixed={someSelected}
                  onChange={handleSelectAllChange}
                  onClick={handleCheckboxClick}
                />
              )}
            </div>
          )}
          {/* Column headers */}
          {orderedChildren}
        </div>
      </div>
    </div>
  )
}
