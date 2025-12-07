"use client"
import { typography } from "@choice-ui/design-tokens"
import { memo, useEffect, useState } from "react"
import { CodeBlock, Section } from ".."
import styles from "./section-demo-breakpoint.module.css"

const demoCode = `const ResponsiveDemo = styled.div\`
  \${up("sm")} {
    ...
  }

  \${up("md")} {
    ...
  }

  \${up("lg")} {
    ...
  }
\``

export const SectionDemoBreakpoint = memo(function SectionDemoBreakpoint() {
  const [viewportWidth, setViewportWidth] = useState(0)
  const [currentBreakpoint, setCurrentBreakpoint] = useState("")

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth
      setViewportWidth(width)

      if (width >= 1536) setCurrentBreakpoint("2xl")
      else if (width >= 1280) setCurrentBreakpoint("xl")
      else if (width >= 1024) setCurrentBreakpoint("lg")
      else if (width >= 768) setCurrentBreakpoint("md")
      else if (width >= 640) setCurrentBreakpoint("sm")
      else if (width >= 475) setCurrentBreakpoint("xs")
      else setCurrentBreakpoint("< xs")
    }

    updateViewport()
    window.addEventListener("resize", updateViewport)
    return () => window.removeEventListener("resize", updateViewport)
  }, [])

  const customHighlight = (content: string, _type: string) => {
    if (/^"(xs|sm|md|lg|xl|2xl)"$/.test(content)) {
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

  return (
    <Section
      orientation="vertical"
      title="Breakpoint Demo"
      content={
        <>
          <p>Adjust the browser window size to observe responsive changes:</p>
          <p>The container will change styles based on different breakpoints:</p>
          <ul>
            <li>xs: base style, light gray background</li>
            <li>sm+: increased padding, light blue background </li>
            <li>md+: more padding, deeper blue background</li>
            <li>lg+: grid layout, deep blue background</li>
          </ul>
        </>
      }
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <h3
            style={{
              fontFamily: largeStrongTypography.fontFamily,
              fontSize: largeStrongTypography.fontSize,
              fontWeight: largeStrongTypography.fontWeight,
              lineHeight: largeStrongTypography.lineHeight,
              letterSpacing: largeStrongTypography.letterSpacing,
            }}
          >
            Breakpoint Information
          </h3>
          <p>
            Current viewport width: <span className={styles.highlight}>{viewportWidth}px</span>
          </p>
          <p>
            Current breakpoint: <span className={styles.highlight}>{currentBreakpoint}</span>
          </p>
          <p>This area will display as a two-column layout above the lg breakpoint.</p>
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
