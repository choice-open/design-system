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
import { backgroundInteractionGroups } from "./contents"
import styles from "./section-background-interaction-colors.module.css"

export const SectionBackgroundInteractionColors = memo(
  function SectionBackgroundInteractionColors() {
    const [colorType, setColorType] = useState<ColorTypes>(ColorTypes.FUNCTION)

    return (
      <Section
        title="Interactive Background States"
        content={
          <>
            <p>
              <b>bg.selected</b>
            </p>
            <p>Highlighted background for active selections and current states.</p>
            <p>
              <b>bg.disabled</b>
            </p>
            <p>
              Neutral background for non-interactive elements that cannot be engaged with by users.
              Commonly paired with disabled text and icon colors for consistent inactive states.
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
            {backgroundInteractionGroups.map((colorData, index) => {
              const colorInfo = getRealColorValue(colorData.colorKey)

              return (
                <div
                  key={colorData.name}
                  style={
                    {
                      "--color": color(colorData.colorKey as ColorPath),
                      "--color-secondary": color(colorData.colorKey as ColorPath),
                      "--color-hover": color(colorData.colorKey as ColorPath),
                      "--color-text":
                        index < 6
                          ? tinycolor(colorInfo.hexValue).isDark()
                            ? "white"
                            : "black"
                          : undefined,
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
                  </div>
                </div>
              )
            })}
          </Panel>
        ))}
      </Section>
    )
  },
)

SectionBackgroundInteractionColors.displayName = "SectionBackgroundInteractionColors"
