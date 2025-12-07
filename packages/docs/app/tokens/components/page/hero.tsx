"use client"
import { typography } from "@choice-ui/design-tokens"
import { memo } from "react"
import styles from "./hero.module.css"

interface HeroProps {
  description?: string
  title: string
}

export const Hero = memo(function Hero(props: HeroProps) {
  const { title, description } = props
  const headingTypography = typography("heading.large")

  return (
    <div className={styles.hero}>
      <h1
        className={styles.heroTitle}
        style={{
          fontFamily: headingTypography.fontFamily,
          fontSize: headingTypography.fontSize,
          fontWeight: headingTypography.fontWeight,
          lineHeight: headingTypography.lineHeight,
          letterSpacing: headingTypography.letterSpacing,
        }}
      >
        {title}
      </h1>
      {description && <p className={styles.heroDescription}>{description}</p>}
    </div>
  )
})

Hero.displayName = "Hero"
