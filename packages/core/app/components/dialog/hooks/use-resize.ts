import { useCallback, useEffect, useRef, useState } from "react"
import { useEventCallback } from "usehooks-ts"

interface Size {
  width: number
  height: number
}

interface ResizeDirection {
  width: boolean
  height: boolean
}

interface ResizeState {
  isResizing: ResizeDirection | null
  size: Size | null
}

interface UseResizeOptions {
  enabled?: boolean
  minWidth?: number
  maxWidth?: number
  minHeight?: number
  maxHeight?: number
  onResizeStart?: (e: React.MouseEvent, direction: ResizeDirection) => void
  onResizeEnd?: (size: Size) => void
}

const MAX_SIZE_RATIO = 0.9

function adjustSize(
  size: Size,
  minWidth = 200,
  maxWidth = window.innerWidth * MAX_SIZE_RATIO,
  minHeight = 100,
  maxHeight = window.innerHeight * MAX_SIZE_RATIO,
): Size {
  return {
    width: Math.min(Math.max(size.width, minWidth), maxWidth),
    height: Math.min(Math.max(size.height, minHeight), maxHeight),
  }
}

// 根据调整方向获取对应的鼠标样式
function getCursorStyle(direction: ResizeDirection | null): string {
  if (!direction) return "default"
  if (direction.width) return "ew-resize"
  if (direction.height) return "ns-resize"
  return "default"
}

export function useResize(
  elementRef: React.RefObject<HTMLElement>,
  options: UseResizeOptions = {},
) {
  const {
    enabled = true,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    onResizeStart,
    onResizeEnd,
  } = options

  const [state, setState] = useState<ResizeState>({
    isResizing: null,
    size: null,
  })

  const resizeOriginRef = useRef({ x: 0, y: 0, width: 0, height: 0 })
  const lastSizeRef = useRef<Size | null>(null)
  const isInitializedRef = useRef(false)
  const resizeOffsetRef = useRef({ x: 0, y: 0 })

  // Initialize size when element is mounted
  useEffect(() => {
    if (!isInitializedRef.current && elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect()
      const initialSize = {
        width: rect.width,
        height: rect.height,
      }
      lastSizeRef.current = initialSize
      setState((prev) => ({ ...prev, size: initialSize }))
      isInitializedRef.current = true
    }
  }, [])

  const handleResizeStart = useEventCallback((e: React.MouseEvent, direction: ResizeDirection) => {
    if (!enabled) return

    const rect = elementRef.current?.getBoundingClientRect()
    if (!rect) return

    e.preventDefault()
    e.stopPropagation()

    // 设置 body 的鼠标样式
    document.body.style.cursor = getCursorStyle(direction)

    setState((prev) => ({ ...prev, isResizing: direction }))
    onResizeStart?.(e, direction)

    // 计算鼠标相对于调整手柄的偏移量
    if (direction.width) {
      resizeOffsetRef.current.x = rect.right - e.clientX
    }
    if (direction.height) {
      resizeOffsetRef.current.y = rect.bottom - e.clientY
    }

    resizeOriginRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: rect.width,
      height: rect.height,
    }
  })

  const handleResize = useCallback(
    (e: MouseEvent) => {
      if (!enabled || !state.isResizing) return

      const direction = state.isResizing
      const rect = elementRef.current?.getBoundingClientRect()
      if (!rect) return

      let newWidth = rect.width
      let newHeight = rect.height

      if (direction.width) {
        newWidth = e.clientX + resizeOffsetRef.current.x - rect.left
      }
      if (direction.height) {
        newHeight = e.clientY + resizeOffsetRef.current.y - rect.top
      }

      const newSize = {
        width: direction.width ? newWidth : rect.width,
        height: direction.height ? newHeight : rect.height,
      }

      const adjustedSize = adjustSize(newSize, minWidth, maxWidth, minHeight, maxHeight)
      lastSizeRef.current = adjustedSize
      setState((prev) => ({ ...prev, size: adjustedSize }))
    },
    [enabled, state.isResizing, minWidth, maxWidth, minHeight, maxHeight],
  )

  const handleResizeEnd = useCallback(() => {
    if (!enabled) return

    // 恢复 body 的鼠标样式
    document.body.style.cursor = "default"

    if (lastSizeRef.current) {
      onResizeEnd?.(lastSizeRef.current)
    }

    setState((prev) => ({ ...prev, isResizing: null }))
  }, [enabled, onResizeEnd])

  const reset = useCallback(() => {
    // 恢复 body 的鼠标样式
    document.body.style.cursor = "default"

    setState({
      isResizing: null,
      size: null,
    })
    lastSizeRef.current = null
    isInitializedRef.current = false
  }, [])

  useEffect(() => {
    if (enabled && state.isResizing) {
      document.addEventListener("mousemove", handleResize)
      document.addEventListener("mouseup", handleResizeEnd)
      return () => {
        document.removeEventListener("mousemove", handleResize)
        document.removeEventListener("mouseup", handleResizeEnd)
      }
    }
  }, [enabled, state.isResizing, handleResize, handleResizeEnd])

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      document.body.style.cursor = "default"
    }
  }, [])

  return {
    state,
    handleResizeStart,
    reset,
  }
}
