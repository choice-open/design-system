import { tcx } from "@choice-ui/shared"
import { ChevronDownSmall, ChevronUpSmall } from "@choiceform/icons-react"
import type { ReactNode } from "react"
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useTableColumnState, useTableDragResize, useTableStatic } from "../context"
import { tableVariants } from "../tv"
import type { TableColumnProps } from "../types"
import { ColumnResizer } from "./column-resizer"

function TableColumnInner({
  id,
  children,
  width,
  minWidth,
  maxWidth,
  flex: columnFlex,
  sortable: columnSortable,
  resizable: columnResizable,
  className,
}: TableColumnProps): ReactNode {
  const tv = tableVariants()
  const columnRef = useRef<HTMLDivElement>(null)

  const {
    registerColumn,
    unregisterColumn,
    sortable: tableSortable,
    resizable: tableResizable,
    reorderable,
    columns,
    toggleSort,
    getSortDirection,
    tableRef,
  } = useTableStatic()

  const { columnOrder, getColumnWidth } = useTableColumnState()
  const { dragState, startDrag, updateDragTarget, updateDragPosition, endDrag } =
    useTableDragResize()

  const isSortable = columnSortable ?? tableSortable
  const isResizable = columnResizable ?? tableResizable
  const sortDirection = getSortDirection(id)
  const isDragging = dragState?.columnId === id

  // Hold-to-drag state (300ms delay before drag is allowed)
  const [canDrag, setCanDrag] = useState(false)
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Transparent drag image ref - must be in DOM for setDragImage to work
  const dragImageRef = useRef<HTMLImageElement | null>(null)

  // Get current width (from state or props)
  const currentWidth = getColumnWidth(id) ?? (typeof width === "number" ? width : undefined)

  // Register column on mount
  useEffect(() => {
    registerColumn({
      id,
      header: children,
      width,
      minWidth,
      maxWidth,
      flex: columnFlex,
      sortable: isSortable,
      resizable: isResizable,
      headerClassName: className,
    })

    return () => {
      unregisterColumn(id)
    }
  }, [
    id,
    children,
    width,
    minWidth,
    maxWidth,
    columnFlex,
    isSortable,
    isResizable,
    className,
    registerColumn,
    unregisterColumn,
  ])

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      // Don't sort if we're resizing
      if ((e.target as HTMLElement).closest('[role="separator"]')) return

      if (isSortable) {
        toggleSort(id)
      }
    },
    [isSortable, toggleSort, id],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (isSortable && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault()
        toggleSort(id)
      }
    },
    [isSortable, toggleSort, id],
  )

  // Hold-to-drag: mousedown starts timer, mouseup/mouseleave clears it
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!reorderable) return
      // Don't start hold timer if clicking on resizer
      if ((e.target as HTMLElement).closest('[role="separator"]')) return

      // Start hold timer - after 300ms, allow dragging
      holdTimerRef.current = setTimeout(() => {
        setCanDrag(true)
      }, 300)
    },
    [reorderable],
  )

  const handleMouseUp = useCallback(() => {
    // Clear hold timer
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
    }
    setCanDrag(false)
  }, [])

  const handleMouseLeave = useCallback(() => {
    // Clear hold timer if mouse leaves before drag starts
    if (holdTimerRef.current && !isDragging) {
      clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
      setCanDrag(false)
    }
  }, [isDragging])

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current)
      }
    }
  }, [])

  // Create transparent drag image in DOM (required for setDragImage to work)
  useEffect(() => {
    if (!reorderable) return

    const img = new Image()
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    img.style.position = "absolute"
    img.style.top = "-9999px"
    img.style.left = "-9999px"
    document.body.appendChild(img)
    dragImageRef.current = img

    return () => {
      if (dragImageRef.current?.parentNode) {
        dragImageRef.current.parentNode.removeChild(dragImageRef.current)
        dragImageRef.current = null
      }
    }
  }, [reorderable])

  // Drag handlers for column reordering
  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      // Only allow drag if held for 300ms
      if (!canDrag || !reorderable || !tableRef.current || !columnRef.current) {
        e.preventDefault()
        return
      }

      e.dataTransfer.effectAllowed = "move"
      e.dataTransfer.setData("text/plain", id)

      // Set body cursor and disable text selection during drag
      document.body.style.cursor = "grabbing"
      document.body.style.userSelect = "none"

      // Get positions relative to table
      const tableRect = tableRef.current.getBoundingClientRect()
      const columnRect = columnRef.current.getBoundingClientRect()
      const mouseX = e.clientX - tableRect.left
      const sourceLeft = columnRect.left - tableRect.left
      const sourceWidth = columnRect.width

      // Use transparent image from DOM as drag image
      if (dragImageRef.current) {
        e.dataTransfer.setDragImage(dragImageRef.current, 0, 0)
      }

      startDrag(id, mouseX, sourceLeft, sourceWidth)
    },
    [canDrag, reorderable, id, startDrag, tableRef],
  )

  const handleDrag = useCallback(
    (e: React.DragEvent) => {
      if (!reorderable || !tableRef.current) return
      // Skip if coordinates are 0,0 (happens at drag end)
      if (e.clientX === 0 && e.clientY === 0) return

      const tableRect = tableRef.current.getBoundingClientRect()
      const mouseX = e.clientX - tableRect.left
      updateDragPosition(mouseX)
    },
    [reorderable, tableRef, updateDragPosition],
  )

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      if (!reorderable || !tableRef.current) return

      e.preventDefault()
      e.dataTransfer.dropEffect = "move"

      // Update mouse position for ghost
      const tableRect = tableRef.current.getBoundingClientRect()
      const mouseX = e.clientX - tableRect.left
      updateDragPosition(mouseX)

      // Calculate drop position
      const rect = columnRef.current?.getBoundingClientRect()
      if (!rect) return

      const midpoint = rect.left + rect.width / 2
      const orderedColumns = columnOrder.length > 0 ? columnOrder : columns.map((c) => c.id)
      const currentIndex = orderedColumns.indexOf(id)

      // Determine if we should insert before or after
      const insertIndex = e.clientX < midpoint ? currentIndex : currentIndex + 1
      updateDragTarget(insertIndex)
    },
    [reorderable, columnOrder, columns, id, updateDragTarget, updateDragPosition, tableRef],
  )

  const handleDragEnd = useCallback(() => {
    if (!reorderable) return

    // Restore body styles
    document.body.style.cursor = ""
    document.body.style.userSelect = ""

    // Reset hold-to-drag state
    setCanDrag(false)
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
    }
    endDrag()
  }, [reorderable, endDrag])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  // Calculate style
  // - flex column: flex:N to fill space proportionally (width becomes minWidth)
  // - other columns: fixed width
  const DEFAULT_COLUMN_WIDTH = 150
  const style = useMemo<React.CSSProperties>(() => {
    // Flex column fills remaining space proportionally, width is used as minWidth
    if (columnFlex !== undefined) {
      const minW = typeof width === "number" ? width : (minWidth ?? 100)
      return { flex: columnFlex, minWidth: minW }
    }
    // Resized width takes priority
    if (currentWidth !== undefined) {
      return { width: currentWidth, minWidth: currentWidth, flexShrink: 0 }
    }
    // Explicit width
    if (width !== undefined) {
      const w = typeof width === "number" ? width : width
      return { width: w, minWidth: typeof width === "number" ? width : undefined, flexShrink: 0 }
    }
    // Default fixed width
    const defaultWidth = minWidth ?? DEFAULT_COLUMN_WIDTH
    return { width: defaultWidth, minWidth: defaultWidth, flexShrink: 0 }
  }, [columnFlex, currentWidth, width, minWidth])

  // Check if this is the last column (no resize handle for last column)
  const isLastColumn = useMemo(() => {
    const orderedColumns = columnOrder.length > 0 ? columnOrder : columns.map((c) => c.id)
    return orderedColumns[orderedColumns.length - 1] === id
  }, [columnOrder, columns, id])

  const headerClassName = useMemo(
    () =>
      tcx(
        tv.headerCell({ sortable: isSortable }),
        reorderable && tv.headerCellDraggable(),
        reorderable && canDrag && tv.headerCellCanDrag(),
        isDragging && tv.headerCellDragging(),
        className,
      ),
    [tv, isSortable, reorderable, canDrag, isDragging, className],
  )

  return (
    <div
      ref={columnRef}
      role="columnheader"
      aria-sort={
        sortDirection === "asc" ? "ascending" : sortDirection === "desc" ? "descending" : undefined
      }
      className={headerClassName}
      style={style}
      onClick={handleClick}
      tabIndex={isSortable ? 0 : undefined}
      draggable={reorderable && canDrag}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
      onKeyDown={isSortable ? handleKeyDown : undefined}
    >
      <span className="truncate">{children}</span>
      {isSortable && sortDirection && (
        <span className={tv.sortIcon()}>
          {sortDirection === "asc" ? <ChevronUpSmall /> : <ChevronDownSmall />}
        </span>
      )}
      {/* Resize handle - not for last column */}
      {isResizable && !isLastColumn && (
        <ColumnResizer
          columnId={id}
          columnWidth={currentWidth ?? 100}
          dragging={isDragging}
        />
      )}
    </div>
  )
}

export const TableColumn = memo(TableColumnInner)
