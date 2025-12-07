"use client"
import { memo } from "react"
import { CodeBlock, Section } from ".."
import styles from "./section-usage-breakpoint.module.css"

const mediaQueryFunctionsCode = `import { up, down, between, only, media } from '@choiceform/design-js-tokens'

// "@media screen and (min-width: 768px)"
up("md")

// "@media screen and (max-width: 1023.98px)"
down("lg")

// "@media screen and (min-width: 640px) and (max-width: 1023.98px)"
between("sm", "lg")

// "@media screen and (min-width: 768px) and (max-width: 1023.98px)"
only("md") 

// "@media screen and (min-width: 768px) and (max-width: 1023.98px) and (orientation: landscape)"
media({ 
  minWidth: "md", 
  maxWidth: "lg", 
  orientation: "landscape" 
}) 
`

const devicePresetFunctionsCode = `import { mobile, tablet, desktop } from '@choiceform/design-js-tokens'

// "@media screen and (min-width: 475px)"
mobile()

// "@media screen and (min-width: 768px) and (max-width: 1023.98px)"
tablet()

// "@media screen and (min-width: 1024px)"
desktop()
`

export const SectionUsageBreakpoint = memo(function SectionUsageBreakpoint() {
  const customHighlight = (content: string, type: string) => {
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
    if (/^"?(xs|sm|md|lg|xl|2xl|landscape)"?$/.test(content)) {
      return (
        <span
          key={content + Math.random()}
          className={styles.highlight}
        >
          {content}
        </span>
      )
    }
    if (["mobile", "tablet", "desktop"].includes(content)) {
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

  return (
    <Section
      title="Breakpoint Usage"
      content={
        <>
          <p>
            The breakpoint system provides two types of functions: media query functions and device
            preset functions.
          </p>
          <p>
            Media query functions are used to create media queries based on breakpoints, while
            device preset functions are used to create media queries based on device types.
          </p>
        </>
      }
    >
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <CodeBlock
            code={mediaQueryFunctionsCode}
            language="tsx"
            customHighlight={customHighlight}
          />
        </div>
        <div className={styles.wrapper}>
          <CodeBlock
            code={devicePresetFunctionsCode}
            language="tsx"
            customHighlight={customHighlight}
          />
        </div>
      </div>
    </Section>
  )
})
