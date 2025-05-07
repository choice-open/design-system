import { Selector } from "@legendapp/state"
import { CSSProperties } from "react"

// 基础类型定义
export type SvgIconName = {
  interface: string
  // 添加其他需要的图标名称
}

export type PaintStyle = {
  id: string
  name: string
  // 添加其他需要的样式属性
}

export type Variable = {
  id: string
  name: string
  // 添加其他需要的变量属性
}

export type VariableReferenceKeys = string

export type AdsorptionResult = {
  position: { x: number; y: number }
  lines: {
    v: AdsorptionGuideLine[]
    h: AdsorptionGuideLine[]
    gap: { x: number; y: number; w: number; h: number; type: "x" | "y" }[]
  }
}

export type AdsorptionGuideLine = {
  value: number
  direction: string
}

export type Guideline = {
  /** 辅助线轴向 */
  axis: "x" | "y"

  /** 辅助线数值 */
  value: number
}

export type Rectangle = {
  x: number
  y: number
  w: number
  h: number
  isSquare?: boolean
  isDouble?: boolean
  isReverseX?: boolean
  isReverseY?: boolean
}

export type RectangleMode = "square" | "double" | "both"

export type Direction = "horizontal" | "vertical"

export type RulerHighlightItem = {
  end: number
  start: number
}

export type RulerHighlights = RulerHighlightItem[]

export type RenderRulerOptions = {
  /** 标尺背景色 */
  backgroundColor: string
  /** 标尺前景色 */
  foregroundColor: string
  /** 标尺大小，横向是高度，纵向是宽度 */
  rulerSize: number
  /** 缩放比例 */
  scale: number
  /** 视窗平移位置 */
  viewportOffset: { x: number; y: number }
  /** 视窗的大小 */
  viewportSize: { width: number; height: number }
}

export type RenderRulerHighlightOptions = {
  /** 缩放比例 */
  scale: number
  /** 主题色 */
  primaryColor: string
  /** 标尺背景色 */
  backgroundColor: string
  /** 标尺高亮的区域 */
  highlight: RulerHighlights
  /** 标尺高亮的颜色 */
  highlightColor: string
  /** 标尺渐变的颜色 */
  gradientColor: string
}

export type RenderGuidelineLabelOptions = {
  gradientColor: [string, string]
  values: number[]
}

/** 两个分离的盒子之间的相对方位 */
export enum SeparateBoxesRelativeDirection {
  LEFT_TOP = "left_top",
  LEFT_BOTTOM = "left_bottom",
  RIGHT_TOP = "right_top",
  RIGHT_BOTTOM = "right_bottom",
}

export enum AlignOperation {
  Left = "align_left",
  Right = "align_right",
  Top = "align_top",
  Bottom = "align_bottom",
  Horizontally = "align_horizontally",
  Vertically = "align_vertically",
}

export enum DistributeOperation {
  Horizontal = "distribute_horizontal",
  Vertical = "distribute_vertical",
}

export type Position = "top" | "right" | "bottom" | "left"
export type Edge = Position
export type Corner = "top_left" | "top_right" | "bottom_right" | "bottom_left"
export type SelectionCorner = Corner
export type SelectionEdge = Edge
export type SelectionHandle = SelectionCorner | SelectionEdge

export type RadiusCorner = Corner
export type PaddingEdge = Edge
export type BorderWidthEdge = Edge

export type ResizePositionType =
  | "bottom"
  | "left"
  | "right"
  | "leftTop"
  | "rightTop"
  | "leftBottom"
  | "rightBottom"
  | undefined

export enum PinButtonMode {
  None = "none",
  Mixed = "mixed",
  Whole = "whole",
}

export type PaletteType =
  | "Slate"
  | "Red"
  | "Pink"
  | "Purple"
  | "Blue"
  | "Green"
  | "Brown"
  | "Orange"
  | "Yellow"
  | "Sky"

export type ReactiveCSSProperties = Selector<CSSProperties | undefined>

export const THEMES = { light: "", dark: "html.dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

export type FillTriggerContextType = React.MutableRefObject<
  Map<string, HTMLFieldSetElement | HTMLDivElement>
>
export type VariablePopoverTriggerContextType = React.MutableRefObject<
  Map<VariableReferenceKeys, HTMLLabelElement | HTMLDivElement | HTMLButtonElement>
>

export type VirtualizedFillLibraryItem =
  | { type: "header"; title: string }
  | { type: "item"; item: Variable | PaintStyle; itemType: "VARIABLE" | "STYLE"; index: number }
