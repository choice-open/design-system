"use client"
import { typography } from "@choice-ui/design-tokens"
import { memo } from "react"
import styles from "./section.module.css"

interface SectionProps {
  children: React.ReactNode
  className?: string
  content?: React.ReactNode
  orientation?: "horizontal" | "vertical"
  title: string
}

export const Section = memo(function Section(props: SectionProps) {
  const { title, children, content, className, orientation = "horizontal" } = props

  const headingTypography = typography("heading.small")
  const bodyTypography = typography("body.medium")

  return (
    <section className={`${styles.sectionRoot} ${className || ""}`}>
      <div
        className={styles.sectionContainer}
        data-orientation={orientation}
      >
        <div className={styles.sectionLeftColumn}>
          <h2
            className={styles.sectionTitle}
            style={{
              fontFamily: headingTypography.fontFamily,
              fontSize: headingTypography.fontSize,
              fontWeight: headingTypography.fontWeight,
              lineHeight: headingTypography.lineHeight,
              letterSpacing: headingTypography.letterSpacing,
            }}
          >
            {title}
          </h2>
          <div
            className={styles.sectionContent}
            style={{
              fontFamily: bodyTypography.fontFamily,
              fontSize: bodyTypography.fontSize,
              fontWeight: bodyTypography.fontWeight,
              lineHeight: bodyTypography.lineHeight,
              letterSpacing: bodyTypography.letterSpacing,
            }}
          >
            {content}
          </div>
        </div>
        <div className={styles.sectionChildren}>{children}</div>
      </div>
    </section>
  )
})

Section.displayName = "Section"
