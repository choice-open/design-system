"use client"
import { typography } from "@choice-ui/design-tokens"
import { memo } from "react"
import { CodeBlock, Section } from ".."
import styles from "./section-query-breakpoint.module.css"

const demoCode = `const ResponsiveDemo = styled.div\`
  \${mobile()} {
    ...
  }

  \${tablet()} {
    ...
  }

  \${desktop()} {
    ...
  }
\``

export const SectionQueryBreakpoint = memo(function SectionQueryBreakpoint() {
  const customHighlight = (content: string) => {
    if (["mobile", "tablet", "desktop"].includes(content)) {
      return (
        <span
          key={content}
          className={styles.highlight}
        >
          {content}
        </span>
      )
    }
    return undefined
  }

  const largeStrongTypography = typography("body.large-strong")
  const mediumStrongTypography = typography("body.medium-strong")

  return (
    <Section
      orientation="vertical"
      title="Breakpoint Query"
      content={
        <>
          <p>
            The breakpoint system provides two types of functions: media query functions and device
            preset functions. Media query functions are used to create media queries based on
            breakpoints, while device preset functions are used to create media queries based on
            device types.
          </p>
        </>
      }
    >
      <div
        className={styles.container}
        style={{
          fontFamily: largeStrongTypography.fontFamily,
          fontSize: largeStrongTypography.fontSize,
          fontWeight: largeStrongTypography.fontWeight,
          lineHeight: largeStrongTypography.lineHeight,
          letterSpacing: largeStrongTypography.letterSpacing,
        }}
      >
        <div className={styles.content}>
          <h3
            style={{
              fontFamily: mediumStrongTypography.fontFamily,
              fontSize: mediumStrongTypography.fontSize,
              fontWeight: mediumStrongTypography.fontWeight,
              lineHeight: mediumStrongTypography.lineHeight,
              letterSpacing: mediumStrongTypography.letterSpacing,
            }}
          >
            Media Query
          </h3>
          <p>This container uses responsive maximum width limits:</p>
          <ul>
            <li>sm: Max width 640px</li>
            <li>md: Max width 768px</li>
            <li>lg: Max width 1024px</li>
            <li>xl: Max width 1280px</li>
          </ul>
        </div>

        <div className={styles.code}>
          <CodeBlock
            code={demoCode}
            language="tsx"
            customHighlight={customHighlight}
          />
        </div>
      </div>
    </Section>
  )
})
