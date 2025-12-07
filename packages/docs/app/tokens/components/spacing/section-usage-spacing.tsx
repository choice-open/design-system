"use client"
import { color } from "@choice-ui/design-tokens"
import { memo } from "react"
import { CodeBlock, Section } from ".."
import styles from "./section-usage-spacing.module.css"

const usageCode = `// Recommended
const Button = styled.button\`
  padding: \${spacingList(2, 4)};
  margin: \${spacing(3)};
\`

// Not recommended
const Button = styled.button\`
  padding: \${spacing(2)} \${spacing(4)};
\`

// Dynamic spacing
const Card = styled.div<{ compact?: boolean }>\`
  padding: \${props => props.compact ? spacing(2) : spacing(4)};
\``

export const SectionUsageSpacing = memo(function SectionUsageSpacing() {
  const customHighlight = (content: string, type: string) => {
    if (type === "comment") {
      return (
        <span
          key={content + Math.random()}
          className={styles.commentHighlight}
        >
          {content}
        </span>
      )
    }

    if (["spacingList", "spacing"].includes(content)) {
      return (
        <span
          key={content + Math.random()}
          className={styles.functionHighlight}
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
            <b>Basic principles</b>
          </p>
          <ul>
            <li>Use preset values (0, 1, 2, 3, 4, 6, 8, 12, 16, 20)</li>
            <li>Use any value when needed (2.5, 7.5, 15, etc.)</li>
            <li>Use breakpoint aliases for container width (sm, md, lg, xl, 2xl)</li>
            <li>Use spacingList() function for multiple values</li>
          </ul>
        </>
      }
    >
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <CodeBlock
            code={usageCode}
            language="tsx"
            customHighlight={customHighlight}
          />
        </div>
      </div>
    </Section>
  )
})
