import { useCallback, useRef, useMemo } from "react"
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

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!viewport) return

      isDragging.current = true
      startPos.current = orientation === "vertical" ? e.clientY : e.clientX
      startScroll.current =
        orientation === "vertical" ? scrollState.scrollTop : scrollState.scrollLeft

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current || !viewport) return

        // 使用RAF节流，确保拖拽流畅且不阻塞UI
        if (rafId.current) {
          cancelAnimationFrame(rafId.current)
        }

        rafId.current = requestAnimationFrame(() => {
          const currentPos = orientation === "vertical" ? e.clientY : e.clientX
          const delta = currentPos - startPos.current

          if (orientation === "vertical") {
            const scrollableHeight = scrollState.scrollHeight - scrollState.clientHeight
            const thumbTrackHeight = scrollState.clientHeight
            const scrollDelta = (delta / thumbTrackHeight) * scrollableHeight
            const newScrollTop = Math.max(
              0,
              Math.min(startScroll.current + scrollDelta, scrollableHeight),
            )
            viewport.scrollTop = newScrollTop
          } else {
            const scrollableWidth = scrollState.scrollWidth - scrollState.clientWidth
            const thumbTrackWidth = scrollState.clientWidth
            const scrollDelta = (delta / thumbTrackWidth) * scrollableWidth
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
      }

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
