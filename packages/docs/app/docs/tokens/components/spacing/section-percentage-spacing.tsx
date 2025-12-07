"use client"
import { CSSProperties, Fragment, memo } from "react"
import { Section } from ".."
import { SpacingLabel } from "../page/share"
import styles from "./section-percentage-spacing.module.css"

export const SectionPercentageSpacing = memo(function SectionPercentageSpacing() {
  const percentageData = [
    { key: "50%", value: "1/2" },
    { key: "50%", value: "1/2" },

    { key: "40%", value: "2/5" },
    { key: "60%", value: "3/5" },

    { key: "33.33%", value: "1/3" },
    { key: "66.67%", value: "2/3" },

    { key: "25%", value: "1/4" },
    { key: "75%", value: "3/4" },

    { key: "20%", value: "1/5" },
    { key: "80%", value: "4/5" },

    { key: "16.67%", value: "1/6" },
    { key: "83.33%", value: "5/6" },
  ]

  return (
    <>
      <Section
        title="Percentage Spacing"
        content={
          <>
            <p>
              The spacing() function also supports percentage values. This is useful when you need
              to set spacing relative to the parent element&apos;s width or height.
            </p>
          </>
        }
      >
        <div className={styles.percentageSpacingGrid}>
          {percentageData.map(({ key, value }, index) => (
            <Fragment key={`${key}-${value}-${index}`}>
              <div
                className={styles.spacingBarWrapper}
                style={
                  {
                    "--width": key,
                  } as CSSProperties
                }
              >
                <div className={styles.spacingBar}>{key}</div>

                <span className={styles.spacingValueBar}>
                  <span className={styles.spacingValue}>
                    $spacing(
                    <SpacingLabel>{value}</SpacingLabel>)
                  </span>
                </span>
              </div>
            </Fragment>
          ))}
        </div>
      </Section>
    </>
  )
})

SectionPercentageSpacing.displayName = "SectionPercentageSpacing"
