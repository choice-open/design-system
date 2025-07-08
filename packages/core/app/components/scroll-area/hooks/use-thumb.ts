import { useCallback, useRef, useMemo, useEffect } from "react"
import type { ScrollState } from "../types"

/**
 * 缓存的 thumb 样式计算 hook
 */
export function useThumbStyle(scrollState: ScrollState, orientation: "vertical" | "horizontal") {
  return useMemo(() => {
    if (orientation === "vertical") {
      if (scrollState.scrollHeight <= scrollState.clientHeight) {
        return { height: "0%", top: "0%" }
      }

      const scrollRatio =
        scrollState.scrollTop / (scrollState.scrollHeight - scrollState.clientHeight) || 0
      const thumbHeight = (scrollState.clientHeight / scrollState.scrollHeight) * 100
      const thumbTop = scrollRatio * (100 - thumbHeight)

      return {
        height: `${Math.max(thumbHeight, 10)}%`,
        top: `${Math.max(0, Math.min(thumbTop, 100 - Math.max(thumbHeight, 10)))}%`,
      }
    } else {
      if (scrollState.scrollWidth <= scrollState.clientWidth) {
        return { width: "0%", left: "0%" }
      }

      const scrollRatio =
        scrollState.scrollLeft / (scrollState.scrollWidth - scrollState.clientWidth) || 0
      const thumbWidth = (scrollState.clientWidth / scrollState.scrollWidth) * 100
      const thumbLeft = scrollRatio * (100 - thumbWidth)

      return {
        width: `${Math.max(thumbWidth, 10)}%`,
        left: `${Math.max(0, Math.min(thumbLeft, 100 - Math.max(thumbWidth, 10)))}%`,
      }
    }
  }, [
    scrollState.scrollLeft,
    scrollState.scrollTop,
    scrollState.scrollWidth,
    scrollState.scrollHeight,
    scrollState.clientWidth,
    scrollState.clientHeight,
    orientation,
  ])
}

/**
 * 优化的 thumb 拖拽 hook
 */
export function useThumbDrag(
  viewport: HTMLDivElement | null,
  scrollState: ScrollState,
  orientation: "vertical" | "horizontal",
) {
  const isDragging = useRef(false)
  const startPos = useRef(0)
  const startScroll = useRef(0)
  const rafId = useRef<number>()
  const cleanupRef = useRef<(() => void) | null>(null)

  // 确保组件卸载时清理事件监听器
  useEffect(() => {
    return () => {
      // 清理拖拽状态
      isDragging.current = false

      // 清理RAF
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
        rafId.current = undefined
      }

      // 清理事件监听器
      if (cleanupRef.current) {
        cleanupRef.current()
        cleanupRef.current = null
      }
    }
  }, [])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!viewport) return

      // 🔧 修复：获取scrollbar元素而不是依赖viewport
      const target = e.currentTarget as HTMLElement
      const scrollbar = target.closest('[role="scrollbar"]') as HTMLElement
      if (!scrollbar) return

      isDragging.current = true
      startPos.current = orientation === "vertical" ? e.clientY : e.clientX
      startScroll.current =
        orientation === "vertical" ? scrollState.scrollTop : scrollState.scrollLeft

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current || !viewport || !scrollbar) return

        // 使用RAF节流，确保拖拽流畅且不阻塞UI
        if (rafId.current) {
          cancelAnimationFrame(rafId.current)
        }

        rafId.current = requestAnimationFrame(() => {
          const currentPos = orientation === "vertical" ? e.clientY : e.clientX
          const delta = currentPos - startPos.current

          if (orientation === "vertical") {
            const scrollableHeight = scrollState.scrollHeight - scrollState.clientHeight
            // 使用scrollbar的实际高度而不是viewport高度
            const scrollbarRect = scrollbar.getBoundingClientRect()
            const scrollbarHeight = scrollbarRect.height
            const scrollDelta = (delta / scrollbarHeight) * scrollableHeight
            const newScrollTop = Math.max(
              0,
              Math.min(startScroll.current + scrollDelta, scrollableHeight),
            )
            viewport.scrollTop = newScrollTop
          } else {
            const scrollableWidth = scrollState.scrollWidth - scrollState.clientWidth
            // 使用scrollbar的实际宽度而不是viewport宽度
            const scrollbarRect = scrollbar.getBoundingClientRect()
            const scrollbarWidth = scrollbarRect.width
            const scrollDelta = (delta / scrollbarWidth) * scrollableWidth
            const newScrollLeft = Math.max(
              0,
              Math.min(startScroll.current + scrollDelta, scrollableWidth),
            )
            viewport.scrollLeft = newScrollLeft
          }
        })
      }

      const handleMouseUp = () => {
        isDragging.current = false
        if (rafId.current) {
          cancelAnimationFrame(rafId.current)
        }
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        cleanupRef.current = null
      }

      // 创建清理函数
      const cleanup = () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }

      cleanupRef.current = cleanup

      document.addEventListener("mousemove", handleMouseMove, { passive: true })
      document.addEventListener("mouseup", handleMouseUp, { passive: true })

      e.preventDefault()
    },
    [viewport, orientation, scrollState],
  )

  return {
    isDragging: isDragging.current,
    handleMouseDown,
  }
}
