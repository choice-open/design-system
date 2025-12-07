"use client"
import { color, ColorPath, typography } from "@choice-ui/design-tokens"
import { memo, useState } from "react"
import tinycolor from "tinycolor2"
import {
  ColorField,
  ColorTypes,
  ColorTypesSelect,
  ColorValue,
  Panel,
  PanelHeader,
  Section,
} from ".."
import { getRealColorValue } from "../../utils"
import { semanticHuesBgGroups } from "./contents"
import styles from "./section-background-hues-colors.module.css"

export const SectionBackgroundHuesColors = memo(function SectionBackgroundHuesColors() {
  const [colorType, setColorType] = useState<ColorTypes>(ColorTypes.FUNCTION)

  return (
    <Section
      title="Brand Background Colors"
      content={
        <>
          <p>
            Brand background colors provide semantic meaning through color application. Each color
            includes base, hover, and secondary variants to support different interaction states and
            layering needs.
          </p>

          <p>
            When placing text or icons on colored backgrounds, use the corresponding
            contrast-appropriate foreground tokens to ensure proper readability and accessibility.
          </p>

          <p>
            <b>bg.accent</b>
          </p>
          <p>Primary brand color for call-to-action buttons and key interactive elements.</p>

          <p>
            <b>bg.success</b>
          </p>
          <p>
            Positive confirmation color for success states, completed actions, and approval
            messaging.
          </p>

          <p>
            <b>bg.warning</b>
          </p>
          <p>Caution color for important alerts and content requiring user attention.</p>

          <p>
            <b>bg.danger</b>
          </p>
          <p>Critical color for error states, destructive actions, and urgent notifications.</p>

          <p>
            <b>bg.assistive</b>
          </p>
          <p>Helper color for guidance, tips, and supportive interface elements.</p>

          <p>
            <b>bg.component</b>
          </p>
          <p>
            Specialized color for component backgrounds that need distinction from standard
            interface colors.
          </p>
        </>
      }
    >
      <PanelHeader>
        <ColorTypesSelect
          colorType={colorType}
          setColorType={setColorType}
        />
      </PanelHeader>

      {["light", "dark"].map((theme) => (
        <Panel
          theme={theme as "light" | "dark"}
          key={theme}
        >
          {semanticHuesBgGroups
            .filter(
              (colorData) =>
                !colorData.colorKey.includes("hover") && !colorData.colorKey.includes("secondary"),
            )
            .map((colorData, index) => {
              const colorInfo = getRealColorValue(colorData.colorKey)

              return (
                <div
                  key={colorData.name}
                  style={
                    {
                      "--color": color(colorData.colorKey as ColorPath),
                      "--color-secondary": color((colorData.colorKey + "-secondary") as ColorPath),
                      "--color-hover": color((colorData.colorKey + "-hover") as ColorPath),
                      "--color-text": tinycolor(colorInfo.hexValue).isDark() ? "white" : "black",
                    } as React.CSSProperties
                  }
                >
                  <ColorField
                    key={colorData.name}
                    colorValue={`var(--color)`}
                    colorString={
                      <ColorValue
                        selectedColor={colorData.name}
                        colorType={colorType}
                        shade={{
                          key: colorData.colorKey,
                        }}
                        theme={theme as "light" | "dark"}
                      />
                    }
                  />
                  <div className={styles.grid}>
                    <div
                      className={styles.swatch}
                      style={{
                        fontFamily: typography("heading.medium").fontFamily,
                        fontSize: typography("heading.medium").fontSize,
                        fontWeight: typography("heading.medium").fontWeight,
                        lineHeight: typography("heading.medium").lineHeight,
                        letterSpacing: typography("heading.medium").letterSpacing,
                      }}
                    >
                      Aa
                    </div>
                    <div className={styles.hoverRow}>-hover</div>
                    <div className={styles.secondaryRow}>-secondary</div>
                  </div>
                </div>
              )
            })}
        </Panel>
      ))}
    </Section>
  )
})

SectionBackgroundHuesColors.displayName = "SectionBackgroundHuesColors"
