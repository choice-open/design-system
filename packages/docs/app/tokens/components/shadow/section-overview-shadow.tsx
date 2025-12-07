"use client"
import { tokens } from "@choice-ui/design-tokens"
import { CSSProperties, memo } from "react"
import { Panel, Section, TokenFunctionDisplay } from ".."
import styles from "./section-overview-shadow.module.css"

export const SectionOverviewShadow = memo(function SectionOverviewShadow() {
  const getAllShadowKeys = () => {
    return Object.keys(tokens).filter((key) => key.startsWith("shadows."))
  }

  return (
    <>
      <Section
        orientation="vertical"
        title="Understanding Shadow Elevations"
        content={
          <>
            <p>
              Our shadow system provides a set of carefully crafted elevation levels that create
              consistent depth and hierarchy across components. Instead of defining custom shadows
              for each use case, we offer five predefined elevation levels that map to different
              visual depths. These numeric levels make it simple to adjust elevation for different
              component states - for example, increasing elevation on hover or during drag
              interactions.
            </p>

            <p>
              A key advantage of our shadow system is that each elevation level includes a subtle
              built-in border effect. This eliminates the need to add separate border styles to
              elements like modals or cards, resulting in cleaner code and more consistent visuals
              across light and dark themes.
            </p>
          </>
        }
      >
        {["light", "dark"].map((theme) => {
          return (
            <Panel
              theme={theme as "light" | "dark"}
              key={theme}
            >
              <div className={styles.container}>
                {getAllShadowKeys()
                  .slice(0, 6)
                  .map((name) => {
                    return (
                      <div
                        key={name}
                        className={styles.shadowBox}
                        style={
                          {
                            "--shadow": `var(--cdt-${name.replace(".", "-")})`,
                          } as CSSProperties
                        }
                      >
                        <TokenFunctionDisplay
                          functionName="shadow"
                          value={name.replace("shadows.", "")}
                        />
                      </div>
                    )
                  })}
              </div>
            </Panel>
          )
        })}
      </Section>
    </>
  )
})

SectionOverviewShadow.displayName = "SectionCustomizingSpacing"
