import { useTableStatic, useTableDragResize } from "../context"
import { tableVariants } from "../tv"

/**
 * Vertical guide line shown during column resize drag.
 * Positioned at the current drag position.
 */
export function ResizeGuide() {
  const { tableRef } = useTableStatic()
  const { resizeState } = useTableDragResize()
  const tv = tableVariants()

  if (!resizeState || !tableRef.current) return null

  const { startX, startWidth, currentX } = resizeState
  const tableRect = tableRef.current.getBoundingClientRect()

  // Calculate the guide line position relative to table
  const guideLeft = currentX - tableRect.left

  return (
    <div
      className={tv.resizeGuide()}
      style={{
        left: guideLeft,
        height: tableRef.current.offsetHeight,
      }}
    />
  )
}
