"use client"
import { typography } from "@choice-ui/design-tokens"
import Link from "next/link"
import { Container } from "../page"
import styles from "./section-hero.module.css"

export const SectionHero: React.FC = () => {
  const displayTypography = typography("heading.display")
  const largeTypography = typography("body.large")
  const mediumTypography = typography("body.medium")
  const smallTypography = typography("body.small")

  return (
    <section className={styles.heroSection}>
      <Container>
        <div className={styles.heroContent}>
          <h1
            className={styles.heroTitle}
            style={{
              fontFamily: displayTypography.fontFamily,
              fontSize: displayTypography.fontSize,
              fontWeight: displayTypography.fontWeight,
              lineHeight: displayTypography.lineHeight,
              letterSpacing: displayTypography.letterSpacing,
            }}
          >
            @choice-ui/design-tokens
          </h1>

          <p
            className={styles.heroSubtitle}
            style={{
              fontFamily: largeTypography.fontFamily,
              fontSize: largeTypography.fontSize,
              fontWeight: largeTypography.fontWeight,
              lineHeight: largeTypography.lineHeight,
              letterSpacing: largeTypography.letterSpacing,
            }}
          >
            Modern CSS-in-JS design tokens system with Linaria. Zero runtime overhead, full
            TypeScript support, and complete theme integration.
          </p>

          <div className={styles.badgeList}>
            <span
              className={styles.badge}
              style={{
                fontFamily: smallTypography.fontFamily,
                fontSize: smallTypography.fontSize,
                fontWeight: smallTypography.fontWeight,
                lineHeight: smallTypography.lineHeight,
                letterSpacing: smallTypography.letterSpacing,
              }}
            >
              Zero Runtime
            </span>
            <span
              className={styles.badge}
              style={{
                fontFamily: smallTypography.fontFamily,
                fontSize: smallTypography.fontSize,
                fontWeight: smallTypography.fontWeight,
                lineHeight: smallTypography.lineHeight,
                letterSpacing: smallTypography.letterSpacing,
              }}
            >
              TypeScript
            </span>
            <span
              className={styles.badge}
              style={{
                fontFamily: smallTypography.fontFamily,
                fontSize: smallTypography.fontSize,
                fontWeight: smallTypography.fontWeight,
                lineHeight: smallTypography.lineHeight,
                letterSpacing: smallTypography.letterSpacing,
              }}
            >
              Linaria
            </span>
            <span
              className={styles.badge}
              style={{
                fontFamily: smallTypography.fontFamily,
                fontSize: smallTypography.fontSize,
                fontWeight: smallTypography.fontWeight,
                lineHeight: smallTypography.lineHeight,
                letterSpacing: smallTypography.letterSpacing,
              }}
            >
              Theme Support
            </span>
          </div>

          <div className={styles.heroActions}>
            <Link
              href="/tokens/colors"
              className={`${styles.button} ${styles.primaryButton}`}
              style={{
                fontFamily: mediumTypography.fontFamily,
                fontSize: mediumTypography.fontSize,
                fontWeight: mediumTypography.fontWeight,
                lineHeight: mediumTypography.lineHeight,
                letterSpacing: mediumTypography.letterSpacing,
              }}
            >
              View Documentation
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
