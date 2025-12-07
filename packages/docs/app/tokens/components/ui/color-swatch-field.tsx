"use client"
import { memo } from "react"
import { overviewPaleGroup, overviewRampsGroups } from "../colors/contents"
import { ColorSwatch } from "./color-swatch"
import styles from "./color-swatch-field.module.css"

interface ColorSwatchFieldProps {
  colorData: (typeof overviewRampsGroups)[number] | (typeof overviewPaleGroup)[number]
  theme: "light" | "dark"
}

export const ColorSwatchField = memo(function ColorSwatchField(props: ColorSwatchFieldProps) {
  const { colorData, theme } = props

  return (
    <div
      className={`${styles.colorRow} ${
        colorData.name === "white" && theme === "light" ? styles.colorRowBlack : ""
      }`}
    >
      <div className={styles.label}>{colorData.name}</div>
      <div className={styles.colorSwatches}>
        {colorData.shades.slice(0, 10).map((shade) => {
          const key = "opacity" in shade ? `${shade.key}-${shade.opacity}` : shade.key
          return (
            <ColorSwatch
              key={key}
              shade={shade}
            />
          )
        })}
      </div>
    </div>
  )
})

ColorSwatchField.displayName = "ColorSwatchField"
