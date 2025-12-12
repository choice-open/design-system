import { tcx } from "@choice-ui/shared"
import { forwardRef, memo } from "react"
import { SeparatorTV } from "./tv"

export type SeparatorOrientation = "horizontal" | "vertical"

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 分隔符的方向
   * @default "horizontal"
   */
  orientation?: SeparatorOrientation
  /**
   * 是否为装饰性分隔符（不需要被屏幕阅读器读取）
   * @default false
   */
  decorative?: boolean
  variant?: "default" | "light" | "dark" | "reset"
}

/**
 * Separator - 分隔符组件
 *
 * 用于在内容之间创建视觉分隔，支持水平和垂直两种方向。
 * 对屏幕阅读器友好，使用正确的 ARIA 属性。
 *
 */
export const Separator = memo(
  forwardRef<HTMLDivElement, SeparatorProps>((props, ref) => {
    const {
      className,
      orientation = "horizontal",
      decorative = false,
      variant = "default",
      ...rest
    } = props

    const styles = SeparatorTV({ orientation, variant })

    // 装饰性分隔符使用 role="none"，否则使用 role="separator"
    const semanticProps = decorative
      ? { role: "none" as const }
      : {
          role: "separator" as const,
          "aria-orientation": orientation,
        }

    return (
      <div
        ref={ref}
        {...semanticProps}
        {...rest}
        className={tcx(styles.root(), className)}
      />
    )
  }),
)

Separator.displayName = "Separator"
