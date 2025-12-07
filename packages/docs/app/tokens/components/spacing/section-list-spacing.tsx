"use client"
import { spacingList } from "@choice-ui/design-tokens"
import { memo } from "react"
import { Section, SpacingLabel } from ".."
import styles from "./section-list-spacing.module.css"

export const SectionListSpacing = memo(function SectionListSpacing() {
  return (
    <>
      <Section
        title="Spacing List"
        content={
          <>
            <p>
              The spacing() function can generate multiple spacing values at once, which is
              particularly useful for padding and margin shorthand properties.
            </p>
          </>
        }
      >
        <div className={styles.blockWrapper}>
          <div
            className={styles.block}
            style={{ padding: spacingList([4, 8]) }}
          >
            <div className={styles.blockInner}>
              $spacingList(<SpacingLabel>4</SpacingLabel>, <SpacingLabel>8</SpacingLabel>)
            </div>
          </div>
        </div>
        <div className={styles.blockWrapper}>
          <div
            className={styles.block}
            style={{ padding: spacingList([4, 8, 16]) }}
          >
            <div className={styles.blockInner}>
              $spacingList(<SpacingLabel>4</SpacingLabel>, <SpacingLabel>8</SpacingLabel>,
              <SpacingLabel>16</SpacingLabel>)
            </div>
          </div>
        </div>
      </Section>
    </>
  )
})

SectionListSpacing.displayName = "SectionListSpacing"
