"use client"
import { typography } from "@choice-ui/design-tokens"
import FillColor from "@choiceform/icons-react/FillColor"
import { memo } from "react"
import styles from "./color-field.module.css"

interface ColorFieldProps {
  className?: string
  colorClass?: string
  colorString: React.ReactNode
  colorValue?: string
}

export const ColorField = memo(function ColorField(props: ColorFieldProps) {
  const { colorValue, colorString, colorClass, className } = props
  const bodyTypography = typography("body.medium")

  return (
    <div
      className={`${styles.field} ${className || ""}`}
      style={{
        fontFamily: bodyTypography.fontFamily,
        fontSize: bodyTypography.fontSize,
        fontWeight: bodyTypography.fontWeight,
        lineHeight: bodyTypography.lineHeight,
        letterSpacing: bodyTypography.letterSpacing,
      }}
    >
      <FillColor className={styles.icon} />
      <span className={styles.flex}>{colorString}</span>

      {colorValue ? (
        <div
          className={`${styles.swatch} ${colorClass || ""}`}
          style={{ "--swatch-color": colorValue } as React.CSSProperties}
        />
      ) : (
        <div className={`${styles.swatchAtomic} ${colorClass || ""}`} />
      )}
    </div>
  )
})

ColorField.displayName = "ColorField"
