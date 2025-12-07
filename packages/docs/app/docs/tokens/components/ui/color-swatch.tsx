"use client"
import { color, ColorPath } from "@choice-ui/design-tokens"
import { memo, useMemo } from "react"
import styles from "./color-swatch.module.css"

interface ColorSwatchProps {
  shade: { key: ColorPath; opacity?: number }
}

export const ColorSwatch = memo(function ColorSwatch(props: ColorSwatchProps) {
  const { shade } = props

  const colorValue = useMemo(() => {
    if ("opacity" in shade && shade.opacity !== undefined) {
      return color(shade.key, shade.opacity)
    }
    return color(shade.key)
  }, [shade])

  return (
    <div
      className={styles.colorSwatch}
      style={{ "--dynamic-color": colorValue } as React.CSSProperties}
    />
  )
})

ColorSwatch.displayName = "ColorSwatch"
