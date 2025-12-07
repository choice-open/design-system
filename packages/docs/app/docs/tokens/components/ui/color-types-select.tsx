"use client"
import { memo } from "react"
import styles from "./color-types-select.module.css"

export enum ColorTypes {
  FUNCTION = "function",
  VALUE = "value",
  VARIABLE = "variable",
}

interface ColorTypesSelectProps {
  colorType: ColorTypes
  setColorType: (colorType: ColorTypes) => void
}

export const ColorTypesSelect = memo(function ColorTypesSelect(props: ColorTypesSelectProps) {
  const { colorType, setColorType } = props
  return (
    <select
      className={styles.select}
      name="color-type"
      value={colorType}
      onChange={(e) => setColorType(e.target.value as ColorTypes)}
    >
      {Object.values(ColorTypes).map((type) => (
        <option
          key={type}
          value={type}
        >
          {type}
        </option>
      ))}
    </select>
  )
})
