"use client"
import EffectsSettings from "@choiceform/icons-react/EffectsSettings"
import { memo } from "react"
import styles from "./shadow-field.module.css"

interface ShadowFieldProps {
  className?: string
  shadowString: React.ReactNode
}

export const ShadowField = memo(function ShadowField(props: ShadowFieldProps) {
  const { shadowString, className } = props

  return (
    <div className={`${styles.field} ${className || ""}`}>
      <EffectsSettings className={styles.icon} />
      <span className={styles.text}>{shadowString}</span>
    </div>
  )
})

ShadowField.displayName = "ShadowField"
