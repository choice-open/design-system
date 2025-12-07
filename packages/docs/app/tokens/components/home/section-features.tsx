"use client"
import { typography } from "@choice-ui/design-tokens"
import React from "react"
import { Container } from "../page"
import styles from "./section-features.module.css"

interface Feature {
  description: string
  items: string[]
  title: string
}

const featuresData: Feature[] = [
  {
    title: "Zero Runtime Overhead",
    description: "Built on Linaria's compile-time CSS generation for maximum performance.",
    items: [
      "Compile-time CSS extraction",
      "No runtime style injection",
      "Optimal bundle size",
      "Native CSS performance",
    ],
  },
  {
    title: "Complete Type Safety",
    description: "Full TypeScript integration with intelligent autocomplete and validation.",
    items: [
      "TypeScript native support",
      "Intelligent autocomplete",
      "Compile-time validation",
      "IDE integration",
    ],
  },
  {
    title: "Design Token System",
    description: "Comprehensive token system covering all design aspects.",
    items: [
      "Spacing and layout tokens",
      "Color and theme system",
      "Typography and shadows",
      "Responsive breakpoints",
    ],
  },
]

export const SectionFeatures: React.FC = () => {
  const largeTypography = typography("heading.large")
  const mediumTypography = typography("heading.medium")
  const bodyTypography = typography("body.medium")

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.content}>
          <h2
            className={styles.sectionTitle}
            style={{
              fontFamily: largeTypography.fontFamily,
              fontSize: largeTypography.fontSize,
              fontWeight: largeTypography.fontWeight,
              lineHeight: largeTypography.lineHeight,
              letterSpacing: largeTypography.letterSpacing,
            }}
          >
            Features
          </h2>

          {featuresData.map((feature, index) => (
            <div
              key={index}
              className={styles.feature}
            >
              <h3
                className={styles.featureTitle}
                style={{
                  fontFamily: mediumTypography.fontFamily,
                  fontSize: mediumTypography.fontSize,
                  fontWeight: mediumTypography.fontWeight,
                  lineHeight: mediumTypography.lineHeight,
                  letterSpacing: mediumTypography.letterSpacing,
                }}
              >
                {feature.title}
              </h3>
              <p
                className={styles.featureDesc}
                style={{
                  fontFamily: bodyTypography.fontFamily,
                  fontSize: bodyTypography.fontSize,
                  fontWeight: bodyTypography.fontWeight,
                  lineHeight: bodyTypography.lineHeight,
                  letterSpacing: bodyTypography.letterSpacing,
                }}
              >
                {feature.description}
              </p>
              <ul className={styles.featureList}>
                {feature.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className={styles.featureItem}
                  >
                    <span
                      className={styles.featureItemText}
                      style={{
                        fontFamily: bodyTypography.fontFamily,
                        fontSize: bodyTypography.fontSize,
                        fontWeight: bodyTypography.fontWeight,
                        lineHeight: bodyTypography.lineHeight,
                        letterSpacing: bodyTypography.letterSpacing,
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
