"use client"
import { typography } from "@choice-ui/design-tokens"
import React from "react"
import { CodeBlock } from "../ui"
import { Container } from "../page"
import styles from "./section-vite-configuration.module.css"

export const SectionViteConfiguration: React.FC = () => {
  const customHighlight = (content: string, type: string) => {
    const tokens = [
      "@linaria/core",
      "@linaria/react",
      "@wyw-in-js/vite",
      "wyw",
      "react",
      "defineConfig",
      "@vitejs/plugin-react",
      "@babel/preset-typescript",
      "@babel/preset-react",
    ]
    if (type === "comment") {
      return (
        <span
          key={content + Math.random()}
          className={styles.highlightSecondary}
        >
          {content}
        </span>
      )
    }
    if (tokens.includes(content)) {
      return (
        <span
          key={content + Math.random()}
          className={styles.highlight}
        >
          {content}
        </span>
      )
    }
    return undefined
  }

  const headingLargeTypography = typography("heading.large")
  const headingMediumTypography = typography("heading.medium")
  const bodyMediumTypography = typography("body.medium")

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.content}>
          <h2
            className={styles.sectionTitle}
            style={{
              fontFamily: headingLargeTypography.fontFamily,
              fontSize: headingLargeTypography.fontSize,
              fontWeight: headingLargeTypography.fontWeight,
              lineHeight: headingLargeTypography.lineHeight,
              letterSpacing: headingLargeTypography.letterSpacing,
            }}
          >
            Vite Setup
          </h2>

          <div className={styles.step}>
            <h3
              className={styles.stepTitle}
              style={{
                fontFamily: headingMediumTypography.fontFamily,
                fontSize: headingMediumTypography.fontSize,
                fontWeight: headingMediumTypography.fontWeight,
                lineHeight: headingMediumTypography.lineHeight,
                letterSpacing: headingMediumTypography.letterSpacing,
              }}
            >
              Install Dependencies
            </h3>
            <p
              className={styles.stepDesc}
              style={{
                fontFamily: bodyMediumTypography.fontFamily,
                fontSize: bodyMediumTypography.fontSize,
                fontWeight: bodyMediumTypography.fontWeight,
                lineHeight: bodyMediumTypography.lineHeight,
                letterSpacing: bodyMediumTypography.letterSpacing,
              }}
            >
              Install Linaria dependencies for Vite integration:
            </p>
            <CodeBlock
              code={`npm install -D @linaria/core @linaria/react @wyw-in-js/vite`}
              language="bash"
              customHighlight={customHighlight}
              className={styles.codeBlockWrapper}
            />
          </div>

          <div className={styles.step}>
            <h3
              className={styles.stepTitle}
              style={{
                fontFamily: headingMediumTypography.fontFamily,
                fontSize: headingMediumTypography.fontSize,
                fontWeight: headingMediumTypography.fontWeight,
                lineHeight: headingMediumTypography.lineHeight,
                letterSpacing: headingMediumTypography.letterSpacing,
              }}
            >
              Configure Vite
            </h3>
            <p
              className={styles.stepDesc}
              style={{
                fontFamily: bodyMediumTypography.fontFamily,
                fontSize: bodyMediumTypography.fontSize,
                fontWeight: bodyMediumTypography.fontWeight,
                lineHeight: bodyMediumTypography.lineHeight,
                letterSpacing: bodyMediumTypography.letterSpacing,
              }}
            >
              Add Linaria plugin to your vite.config.ts:
            </p>
            <CodeBlock
              code={`// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { wyw } from '@wyw-in-js/vite'

export default defineConfig({
  plugins: [
    react(),
    wyw({
      include: ['**/*.{ts,tsx}'],
      babelOptions: {
        presets: ['@babel/preset-typescript', '@babel/preset-react']
      },
      classNameSlug: (hash, name) => \`\${name}-\${hash}\`,
    })
  ]
})`}
              language="typescript"
              customHighlight={customHighlight}
              className={styles.codeBlockWrapper}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
