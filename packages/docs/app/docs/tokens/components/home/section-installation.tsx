"use client"
import { typography } from "@choice-ui/design-tokens"
import React from "react"
import { Container } from "../page"
import { CodeBlock } from "../ui"
import styles from "./section-installation.module.css"

export const SectionInstallation: React.FC = () => {
  const customHighlight = (content: string, type: string) => {
    const cleanContent = content.replace(/['"]/g, "")

    const tokens = [
      "@choice-ui/design-tokens",
      "initTokens",
      "spacing",
      "spacingList",
      "color",
      "bg-accent",
      "fg-on-accent",
      "React",
      "ReactDOM",
      "App",
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

    if (tokens.includes(cleanContent) || tokens.includes(content)) {
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
            Installation
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
              Install Package
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
              Add the design token library to your project using your preferred package manager:
            </p>
            <CodeBlock
              code="npm install @choice-ui/design-tokens"
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
              Initialize Tokens
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
              Import the library to automatically initialize CSS variables.
              <strong>
                {" "}
                Important: Must be imported before any components render, such as above the App
                import.
              </strong>
            </p>
            <CodeBlock
              code={`// Import to initialize CSS variables
import "@choice-ui/design-tokens";
import "@choice-ui/design-tokens/tokens.css";
import "@choice-ui/design-tokens/preflight.css";

// Or initialize manually
import { initTokens } from '@choice-ui/design-tokens'
initTokens()`}
              language="tsx"
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
              Basic Usage
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
              Import design token functions and start building. Here&apos;s the correct import order
              in your main.tsx:
            </p>
            <CodeBlock
              code={`// main.tsx - Correct import order
import "" // Must be first
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)`}
              language="tsx"
              customHighlight={customHighlight}
              className={styles.codeBlockWrapperWithMargin}
            />
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
              Then use design tokens in your components:
            </p>
            <CodeBlock
              code={`import { spacingList, color } from '@choice-ui/design-tokens'
import { styled } from '@linaria/react'

const Button = styled.button\`
  padding: \${spacingList(4, 8)};
  background-color: \${color('bg-accent')};
  color: \${color('fg-on-accent')};
\``}
              language="tsx"
              customHighlight={customHighlight}
              className={styles.codeBlockWrapper}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
