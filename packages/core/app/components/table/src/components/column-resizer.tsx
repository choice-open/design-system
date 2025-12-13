import { tcx } from "@choice-ui/shared"
import { memo, useCallback, useEffect, useState } from "react"
import { useTableStatic, useTableDragResize } from "../context"
import { tableVariants } from "../tv"

interface ColumnResizerProps {
  columnId: string
  columnWidth: number
  dragging?: boolean
}

function ColumnResizerInner({ columnId, columnWidth, dragging }: ColumnResizerProps) {
  const tv = tableVariants()
  const { resizable } = useTableStatic()
  const { startResize, updateResize, endResize } = useTableDragResize()
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!resizable) return

      e.preventDefault()
      e.stopPropagation()
      setIsDragging(true)
      startResize(columnId, e.clientX, columnWidth)
    },
    [resizable, columnId, columnWidth, startResize],
  )

  // Only register global listeners when actually dragging
  useEffect(() => {
    if (!isDragging) return

    // Set cursor on body and disable pointer events on table
    const originalCursor = document.body.style.cursor
    const originalUserSelect = document.body.style.userSelect
    document.body.style.cursor = "col-resize"
    document.body.style.userSelect = "none"

    const handleMouseMove = (e: MouseEvent) => {
      updateResize(e.clientX)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      endResize()
    }

    // Use passive for mousemove to improve scroll performance
    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      // Restore original styles
      document.body.style.cursor = originalCursor
      document.body.style.userSelect = originalUserSelect
    }
  }, [isDragging, updateResize, endResize])

  if (!resizable) return null

  return (
    <div
      className={tcx(tv.resizer({ dragging }))}
      onMouseDown={handleMouseDown}
      role="separator"
      aria-orientation="vertical"
      aria-label={`Resize column ${columnId}`}
    />
  )
}

export const ColumnResizer = memo(ColumnResizerInner)
