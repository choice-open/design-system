import { useMemo } from "react"
import { useTableStatic, useTableColumnState, useTableDragResize } from "../context"
import { tableVariants } from "../tv"

/**
 * Visual guides shown during column drag-to-reorder:
 * 1. Ghost column - semi-transparent column following mouse
 * 2. Drop indicator - vertical line showing drop position
 */
export function DragGuide() {
  const tv = tableVariants()
  const { columns, selectable, tableRef } = useTableStatic()
  const { columnOrder, getColumnWidth } = useTableColumnState()
  const { dragState } = useTableDragResize()

  // Calculate drop indicator position
  const dropIndicatorStyle = useMemo(() => {
    if (!dragState || !tableRef.current) return null

    const { columnId, targetIndex } = dragState

    // Only show if we have a valid target
    if (!columnId || targetIndex < 0) return null

    const orderedColumns = columnOrder.length > 0 ? columnOrder : columns.map((c) => c.id)
    if (orderedColumns.length === 0) return null

    let leftOffset = selectable ? 40 : 0

    // Calculate position at target index
    const effectiveTargetIndex = Math.max(0, Math.min(targetIndex, orderedColumns.length))

    for (let i = 0; i < effectiveTargetIndex && i < orderedColumns.length; i++) {
      const colId = orderedColumns[i]
      if (!colId) continue

      const col = columns.find((c) => c.id === colId)
      const width = Math.max(
        0,
        getColumnWidth(colId) ?? (typeof col?.width === "number" ? col.width : 100),
      )
      leftOffset += width
    }

    return {
      left: leftOffset - 1, // Center the 2px line
      height: tableRef.current.offsetHeight,
    }
  }, [dragState, tableRef, columns, columnOrder, getColumnWidth, selectable])

  // Calculate ghost column style (follows mouse)
  const ghostStyle = useMemo(() => {
    if (!dragState || !tableRef.current) return null

    const { mouseX, sourceWidth } = dragState

    // Center ghost on mouse
    const left = mouseX - sourceWidth / 2

    return {
      left,
      width: sourceWidth,
      height: tableRef.current.offsetHeight,
    }
  }, [dragState, tableRef])

  if (!dragState) return null

  return (
    <>
      {/* Ghost column - follows mouse */}
      {ghostStyle && (
        <div
          className={tv.dragGhost()}
          style={ghostStyle}
        />
      )}
      {/* Drop indicator - vertical line at target position */}
      {dropIndicatorStyle && (
        <div
          className={tv.dragIndicator()}
          style={dropIndicatorStyle}
        />
      )}
    </>
  )
}
