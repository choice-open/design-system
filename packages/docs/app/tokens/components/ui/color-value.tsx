"use client"
import { memo, useMemo } from "react"
import { getRealColorValue } from "../../utils"
import { TokenFunctionDisplay } from "./token-function-display"
import { ColorTypes } from "./color-types-select"
import styles from "./color-value.module.css"

interface ColorValueProps {
  colorType: ColorTypes
  opacity?: number
  selectedColor: string
  shade: { key: string; opacity?: number }
  theme: "light" | "dark"
}

export const ColorValue = memo(function ColorValue({
  opacity = 1,
  selectedColor,
  colorType,
  shade,
  theme,
}: ColorValueProps) {
  const realColorValue = useMemo(() => {
    if ("opacity" in shade && shade.opacity !== undefined) {
      return getRealColorValue(shade.key, shade.opacity, "semantic", theme)
    }
    return getRealColorValue(shade.key, opacity, "semantic", theme)
  }, [shade, theme, opacity])

  // 获取真实的 alpha 值
  const realAlpha = useMemo(() => {
    if ("opacity" in shade && shade.opacity !== undefined) {
      return shade.opacity
    }
    return opacity
  }, [shade, opacity])

  if (colorType === ColorTypes.VARIABLE) {
    return (
      <span>
        rgba(
        <span className={styles.assistiveText}>var(--cdt-{selectedColor})</span>, {realAlpha})
      </span>
    )
  }

  if (colorType === ColorTypes.VALUE) {
    // 确保总是显示 rgba 值
    const rgbaValue = realColorValue.rgbaValue

    // 如果已经是完整的 rgba 格式，直接解析
    const rgbaMatch = rgbaValue?.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)

    if (rgbaMatch) {
      const [, r, g, b, a] = rgbaMatch
      // 使用解析出的 alpha 值，如果没有则使用真实的 alpha
      const alphaValue = a || realAlpha
      return (
        <span>
          rgba(
          <span className={styles.assistiveText}>
            {r}, {g}, {b}, {alphaValue}
          </span>
          )
        </span>
      )
    }

    // 如果没有 rgba 值，从 rgb 值构建
    if (realColorValue.rgbValue) {
      const rgbMatch = realColorValue.rgbValue.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
      if (rgbMatch) {
        const [, r, g, b] = rgbMatch
        return (
          <span>
            rgba(
            <span className={styles.assistiveText}>
              {r}, {g}, {b}, {realAlpha}
            </span>
            )
          </span>
        )
      }
    }

    // 最后的回退：显示原始的 rgba 值或 css 值
    return <span>{rgbaValue || realColorValue.cssValue}</span>
  }

  return (
    <TokenFunctionDisplay
      functionName="color"
      value={selectedColor}
    />
  )
})

ColorValue.displayName = "ColorValue"
