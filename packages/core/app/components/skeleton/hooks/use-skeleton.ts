import { useMemo } from "react"
import { type SkeletonProps } from "../types"

export interface UseSkeletonParams {
  animation?: SkeletonProps["animation"]
  variant?: SkeletonProps["variant"]
  hasChildren: boolean
  width?: number | string
  height?: number | string
}

export interface UseSkeletonReturn {
  shouldShowWave: boolean
  fitContent: boolean
  heightAuto: boolean
  styles: React.CSSProperties
}

export function useSkeleton({
  animation,
  variant,
  hasChildren,
  width,
  height,
}: UseSkeletonParams): UseSkeletonReturn {
  const shouldShowWave = animation === "wave"
  const fitContent = hasChildren && !width
  const heightAuto = hasChildren && !height

  const styles = useMemo<React.CSSProperties>(() => {
    const result: React.CSSProperties = {}

    if (width) {
      result.width = typeof width === "number" ? `${width}px` : width
    }

    if (height) {
      result.height = typeof height === "number" ? `${height}px` : height
    }

    return result
  }, [width, height])

  return {
    shouldShowWave,
    fitContent,
    heightAuto,
    styles,
  }
}
