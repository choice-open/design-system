import { ComponentPropsWithoutRef } from "react"

export type SkeletonVariant = "text" | "rectangular" | "rounded" | "circular"
export type SkeletonAnimation = "pulse" | "wave" | false

export interface SkeletonProps extends ComponentPropsWithoutRef<"span"> {
  /**
   * The animation type
   * @default 'pulse'
   */
  animation?: SkeletonAnimation
  /**
   * The variant of the skeleton
   * @default 'text'
   */
  variant?: SkeletonVariant
  /**
   * Width of the skeleton
   */
  width?: number | string
  /**
   * Height of the skeleton
   */
  height?: number | string
  /**
   * Optional children to infer width and height from
   */
  children?: React.ReactNode
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Whether to render as child element
   */
  asChild?: boolean
}
