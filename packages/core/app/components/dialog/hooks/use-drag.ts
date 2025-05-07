import { useCallback, useEffect, useRef, useState } from "react"
import { useEventCallback } from "usehooks-ts"

// Constants
const MIN_VISIBLE_RATIO = 0.25
const HEADER_HEIGHT = 40

interface Position {
  x: number
  y: number
}

interface DragState {
  isDragging: boolean
  position: Position | null
}

interface UseDragOptions {
  enabled?: boolean
  onDragStart?: (e: React.MouseEvent) => void
  onDragEnd?: (position: Position) => void
}

function adjustPosition(
  position: Position,
  dialogRect: DOMRect,
  viewportWidth = window.innerWidth,
  viewportHeight = window.innerHeight,
): Position {
  // 确保至少 25% 的窗口宽度在可视范围内
  const minVisibleWidth = dialogRect.width * MIN_VISIBLE_RATIO
  const maxLeft = viewportWidth - minVisibleWidth
  const minLeft = minVisibleWidth - dialogRect.width

  // 确保 header 始终在可视范围内
  const maxTop = viewportHeight - HEADER_HEIGHT
  const minTop = 0

  return {
    x: Math.min(Math.max(position.x, minLeft), maxLeft),
    y: Math.min(Math.max(position.y, minTop), maxTop),
  }
}

export function useDrag(elementRef: React.RefObject<HTMLElement>, options: UseDragOptions = {}) {
  const { enabled = true, onDragStart, onDragEnd } = options

  const [state, setState] = useState<DragState>({
    isDragging: false,
    position: null,
  })

  const dragOriginRef = useRef({ x: 0, y: 0 })
  const lastPositionRef = useRef<Position | null>(null)
  const isInitializedRef = useRef(false)

  // Initialize position when element is mounted
  useEffect(() => {
    if (!isInitializedRef.current && elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect()
      const position = { x: rect.left, y: rect.top }
      lastPositionRef.current = position
      setState((prev) => ({ ...prev, position }))
      isInitializedRef.current = true
    }
  }, [])

  const handleDragStart = useEventCallback((e: React.MouseEvent) => {
    if (!enabled) return

    const rect = elementRef.current?.getBoundingClientRect()
    if (!rect) return

    e.preventDefault()
    e.stopPropagation()

    setState((prev) => ({ ...prev, isDragging: true }))
    onDragStart?.(e)

    const currentX = lastPositionRef.current?.x ?? rect.left
    const currentY = lastPositionRef.current?.y ?? rect.top

    dragOriginRef.current = {
      x: e.clientX - currentX,
      y: e.clientY - currentY,
    }

    if (!lastPositionRef.current) {
      const newPosition = { x: currentX, y: currentY }
      lastPositionRef.current = newPosition
      setState((prev) => ({ ...prev, position: newPosition }))
    }
  })

  const handleDrag = useCallback(
    (e: MouseEvent) => {
      if (!enabled || !state.isDragging) return

      const x = e.clientX - dragOriginRef.current.x
      const y = e.clientY - dragOriginRef.current.y
      const newPosition = { x, y }
      lastPositionRef.current = newPosition
      setState((prev) => ({ ...prev, position: newPosition }))
    },
    [enabled, state.isDragging],
  )

  const handleDragEnd = useCallback(() => {
    if (!enabled) return

    if (elementRef.current && lastPositionRef.current) {
      const dialogRect = elementRef.current.getBoundingClientRect()
      const adjustedPosition = adjustPosition(lastPositionRef.current, dialogRect)

      // 更新位置状态
      lastPositionRef.current = adjustedPosition
      setState((prev) => ({ ...prev, position: adjustedPosition, isDragging: false }))
      onDragEnd?.(adjustedPosition)
    } else {
      setState((prev) => ({ ...prev, isDragging: false }))
    }
  }, [enabled, onDragEnd])

  const reset = useCallback(() => {
    setState({
      isDragging: false,
      position: null,
    })
    lastPositionRef.current = null
    isInitializedRef.current = false
  }, [])

  useEffect(() => {
    if (enabled && state.isDragging) {
      document.addEventListener("mousemove", handleDrag)
      document.addEventListener("mouseup", handleDragEnd)
      return () => {
        document.removeEventListener("mousemove", handleDrag)
        document.removeEventListener("mouseup", handleDragEnd)
      }
    }
  }, [enabled, state.isDragging, handleDrag, handleDragEnd])

  return {
    state,
    handleDragStart,
    reset,
  }
}
