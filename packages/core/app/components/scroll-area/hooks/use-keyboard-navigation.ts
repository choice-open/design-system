import { useCallback } from "react"
import type { ScrollOrientation } from "../types"

/**
 * 滚动区域键盘导航 hook
 *
 * 提供完整的键盘导航支持，符合 WAI-ARIA 规范
 *
 * @param viewport 视口元素
 * @param orientation 滚动方向
 * @returns 键盘事件处理函数
 */
export function useKeyboardNavigation(
  viewport: HTMLDivElement | null,
  orientation: ScrollOrientation,
) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!viewport) return

      const scrollStep = 20
      const pageScrollStep = viewport.clientHeight * 0.8

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault()
          viewport.scrollTop = Math.max(0, viewport.scrollTop - scrollStep)
          break
        case "ArrowDown":
          e.preventDefault()
          viewport.scrollTop = Math.min(
            viewport.scrollHeight - viewport.clientHeight,
            viewport.scrollTop + scrollStep,
          )
          break
        case "ArrowLeft":
          if (orientation === "horizontal" || orientation === "both") {
            e.preventDefault()
            viewport.scrollLeft = Math.max(0, viewport.scrollLeft - scrollStep)
          }
          break
        case "ArrowRight":
          if (orientation === "horizontal" || orientation === "both") {
            e.preventDefault()
            viewport.scrollLeft = Math.min(
              viewport.scrollWidth - viewport.clientWidth,
              viewport.scrollLeft + scrollStep,
            )
          }
          break
        case "PageUp":
          e.preventDefault()
          viewport.scrollTop = Math.max(0, viewport.scrollTop - pageScrollStep)
          break
        case "PageDown":
          e.preventDefault()
          viewport.scrollTop = Math.min(
            viewport.scrollHeight - viewport.clientHeight,
            viewport.scrollTop + pageScrollStep,
          )
          break
        case "Home":
          e.preventDefault()
          viewport.scrollTop = 0
          viewport.scrollLeft = 0
          break
        case "End":
          e.preventDefault()
          viewport.scrollTop = viewport.scrollHeight - viewport.clientHeight
          if (orientation === "horizontal" || orientation === "both") {
            viewport.scrollLeft = viewport.scrollWidth - viewport.clientWidth
          }
          break
        case " ":
          e.preventDefault()
          if (e.shiftKey) {
            viewport.scrollTop = Math.max(0, viewport.scrollTop - pageScrollStep)
          } else {
            viewport.scrollTop = Math.min(
              viewport.scrollHeight - viewport.clientHeight,
              viewport.scrollTop + pageScrollStep,
            )
          }
          break
      }
    },
    [viewport, orientation],
  )

  return {
    handleKeyDown,
  }
}
