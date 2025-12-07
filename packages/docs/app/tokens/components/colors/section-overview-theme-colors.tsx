"use client"
import { color } from "@choice-ui/design-tokens"
import { memo } from "react"
import { ColorField, Panel, Section, TokenFunctionDisplay } from ".."
import styles from "./section-overview-theme-colors.module.css"

export const SectionOverviewThemeColors = memo(function SectionOverviewThemeColors() {
  return (
    <Section
      title="Adaptive Theming"
      content={
        <>
          <p>
            Our color system supports adaptive theming, enabling seamless transitions between
            different visual modes while maintaining design consistency and accessibility standards.
          </p>
          <p>
            The design system automatically adapts all interface elements when switching between
            themes, ensuring optimal contrast and readability across all contexts. Available themes
            include:
          </p>
          <ul className={styles.assistiveText}>
            <li>Light mode - optimized for bright environments</li>
            <li>Dark mode - optimized for low-light conditions</li>
          </ul>
        </>
      }
    >
      {["light", "dark"].map((theme) => (
        <Panel
          theme={theme as "light" | "dark"}
          key={theme}
        >
          <div className={styles.grid}>
            {["accent", "component"].map((theme) => (
              <div
                key={theme}
                className={styles.buttonContainer}
              >
                <button
                  className={styles.button}
                  data-theme={theme}
                >
                  Button
                </button>
              </div>
            ))}
            <ColorField
              key={theme}
              className={styles.gridColumn}
              colorString={
                <TokenFunctionDisplay
                  functionName="color"
                  value="background.accent"
                />
              }
              colorValue={color("background.accent")}
            />
          </div>
        </Panel>
      ))}
    </Section>
  )
})

SectionOverviewThemeColors.displayName = "SectionOverviewThemeColors"
