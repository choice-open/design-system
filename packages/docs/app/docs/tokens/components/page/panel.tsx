"use client"
import { typography } from "@choice-ui/design-tokens"
import { memo } from "react"
import styles from "./panel.module.css"

interface PanelProps {
  children: React.ReactNode
  empty?: boolean
  placeholder?: string
  theme: "light" | "dark"
}

export const Panel = memo(function Panel(props: PanelProps) {
  const { theme, empty, children, placeholder } = props
  const headingTypography = typography("heading.medium")

  return (
    <div
      className={`${styles.themePanel} ${empty ? styles.themePanelEmpty : ""} ${theme}`}
      data-theme={theme}
      style={
        empty
          ? {
              fontFamily: headingTypography.fontFamily,
              fontSize: headingTypography.fontSize,
              fontWeight: headingTypography.fontWeight,
              lineHeight: headingTypography.lineHeight,
              letterSpacing: headingTypography.letterSpacing,
            }
          : undefined
      }
    >
      {empty ? (
        <span>{placeholder}</span>
      ) : (
        <div className={styles.themeTitle}>{theme.toUpperCase()} MODE</div>
      )}
      {children}
    </div>
  )
})

Panel.displayName = "Panel"
