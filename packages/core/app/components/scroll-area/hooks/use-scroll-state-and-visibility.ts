import { useCallback, useEffect, useRef, useState } from "react"
import type { ScrollState } from "../types"

/**
 * 合并的滚动状态和可见性管理 hook - 避免重复监听滚动事件
 */
export function useScrollStateAndVisibility(viewport: HTMLDivElement | null) {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollLeft: 0,
    scrollTop: 0,
    scrollWidth: 0,
    scrollHeight: 0,
    clientWidth: 0,
    clientHeight: 0,
  })

  const [isHovering, setIsHovering] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<number>()
  const rafRef = useRef<number>()

  // 使用 RAF 优化滚动性能，避免频繁状态更新
  const updateScrollState = useCallback(() => {
    if (!viewport) return

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    rafRef.current = requestAnimationFrame(() => {
      const newState = {
        scrollLeft: viewport.scrollLeft,
        scrollTop: viewport.scrollTop,
        scrollWidth: viewport.scrollWidth,
        scrollHeight: viewport.scrollHeight,
        clientWidth: viewport.clientWidth,
        clientHeight: viewport.clientHeight,
      }

      // 使用高效的浅比较，只在真正有变化时更新状态
      setScrollState((prevState) => {
        // 使用位运算进行快速比较
        const hasChanges =
          (prevState.scrollLeft ^ newState.scrollLeft) |
          (prevState.scrollTop ^ newState.scrollTop) |
          (prevState.scrollWidth ^ newState.scrollWidth) |
          (prevState.scrollHeight ^ newState.scrollHeight) |
          (prevState.clientWidth ^ newState.clientWidth) |
          (prevState.clientHeight ^ newState.clientHeight)

        return hasChanges ? newState : prevState
      })
    })
  }, [viewport])

  useEffect(() => {
    if (!viewport) return

    const handleScroll = () => {
      updateScrollState()

      // 处理滚动状态
      setIsScrolling(true)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false)
      }, 1000)
    }

    const handleResize = () => {
      updateScrollState()
    }

    // 使用AbortController进行更好的事件清理（现代浏览器支持）
    const abortController = new AbortController()
    const signal = abortController.signal

    viewport.addEventListener("scroll", handleScroll, { passive: true, signal })
    window.addEventListener("resize", handleResize, { passive: true, signal })

    // 初始化
    updateScrollState()

    return () => {
      // 统一清理所有资源
      abortController.abort()

      // 清理定时器
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
        scrollTimeoutRef.current = undefined
      }

      // 清理RAF
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = undefined
      }
    }
  }, [viewport, updateScrollState])

  const handleMouseEnter = useCallback(() => setIsHovering(true), [])
  const handleMouseLeave = useCallback(() => setIsHovering(false), [])

  return {
    scrollState,
    isHovering,
    isScrolling,
    handleMouseEnter,
    handleMouseLeave,
  }
}
