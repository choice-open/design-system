import React from "react"
import { DropPosition } from "../types"

interface DropIndicatorProps {
  dropPosition: DropPosition | null | undefined
  isDropTarget: boolean
  isExpanded: boolean
  isFolderWithChildren: boolean
  level: number
}

export const DropIndicator: React.FC<DropIndicatorProps> = ({
  dropPosition,
  isDropTarget,
  level,
  isFolderWithChildren,
  isExpanded,
}) => {
  if (!isDropTarget || !dropPosition) return null

  // 计算指示器缩进
  const indicatorPadding = level * 24

  // 如果不是文件夹，但放置位置是"inside"，不显示指示器
  if (dropPosition === "inside" && !isFolderWithChildren) {
    return null
  }

  // 已展开的文件夹允许上部区域before放置，中部和下部区域只允许inside放置
  if (
    isFolderWithChildren &&
    isExpanded &&
    dropPosition !== "inside" &&
    dropPosition !== "before"
  ) {
    return null
  }

  if (dropPosition === "before") {
    return (
      <div
        className="z-2 pointer-events-none absolute -top-px left-0 right-0 flex items-center"
        style={{ paddingLeft: `${indicatorPadding}px` }}
      >
        <div className="bg-default-foreground h-0.5 w-full" />
      </div>
    )
  } else if (dropPosition === "after") {
    return (
      <div
        className="z-2 pointer-events-none absolute -bottom-px left-0 right-0 flex items-center"
        style={{ paddingLeft: `${indicatorPadding}px` }}
      >
        <div className="bg-default-foreground h-0.5 w-full" />
      </div>
    )
  } else if (dropPosition === "inside" && isFolderWithChildren) {
    return (
      <div className="border-selected-boundary z-2 pointer-events-none absolute inset-0 border-y" />
    )
  }

  return null
}
