import { useMemo } from "react"
import type { ScrollState, ScrollbarVisibilityType } from "../types"

/**
 * 缓存的溢出检查 hook
 */
export function useHasOverflow(scrollState: ScrollState, orientation: "vertical" | "horizontal") {
  return useMemo(() => {
    if (orientation === "vertical") {
      return scrollState.scrollHeight > scrollState.clientHeight
    }
    return scrollState.scrollWidth > scrollState.clientWidth
  }, [
    scrollState.scrollHeight,
    scrollState.clientHeight,
    scrollState.scrollWidth,
    scrollState.clientWidth,
    orientation,
  ])
}

/**
 * 缓存的滚动条显示判断 hook
 */
export function useScrollbarShouldShow(
  type: ScrollbarVisibilityType,
  hasOverflow: boolean,
  isScrolling: boolean,
  isHovering: boolean,
) {
  return useMemo(() => {
    switch (type) {
      case "always":
        return true
      case "auto":
        return hasOverflow
      case "scroll":
        return hasOverflow && isScrolling
      case "hover":
        return hasOverflow && (isScrolling || isHovering)
      default:
        return hasOverflow
    }
  }, [type, hasOverflow, isScrolling, isHovering])
}
