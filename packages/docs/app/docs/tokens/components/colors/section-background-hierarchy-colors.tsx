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
import { backgroundHierarchyGroups } from "./contents"
import styles from "./section-background-hierarchy-colors.module.css"

export const SectionBackgroundHierarchyColors = memo(function SectionBackgroundHierarchyColors() {
  const [colorType, setColorType] = useState<ColorTypes>(ColorTypes.FUNCTION)

  return (
    <Section
      title="Background Hierarchy"
      content={
        <>
          <p>
            <b>bg.default</b>
          </p>
          <p>Primary background color for the main application surface</p>

          <p>
            <b>bg.secondary</b>
          </p>
          <p>Elevated background for cards, panels, and content containers</p>

          <p>
            <b>bg.tertiary</b>
          </p>
          <p>Subtle background for nested components and elements within secondary containers</p>
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
          {backgroundHierarchyGroups.map((colorData) => {
            const colorInfo = getRealColorValue(colorData.colorKey)

            return (
              <div
                key={colorData.name}
                style={
                  {
                    "--color": color(colorData.colorKey as ColorPath),
                    "--color-secondary": color(colorData.colorKey as ColorPath),
                    "--color-hover": color(colorData.colorKey as ColorPath),
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
                      fontFamily: typography("body.large").fontFamily,
                      fontSize: typography("body.large").fontSize,
                      fontWeight: typography("body.large").fontWeight,
                      lineHeight: typography("body.large").lineHeight,
                      letterSpacing: typography("body.large").letterSpacing,
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
})

SectionBackgroundHierarchyColors.displayName = "SectionBackgroundHierarchyColors"
