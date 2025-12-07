"use client"
import { color, ColorPath, typography } from "@choice-ui/design-tokens"
import { memo, useState } from "react"
import {
  ColorField,
  ColorTypes,
  ColorTypesSelect,
  ColorValue,
  Panel,
  PanelHeader,
  Section,
} from ".."
import { textBasicGroups } from "./contents"
import styles from "./section-text-basic-colors.module.css"

export const SectionTextBasicColors = memo(function SectionTextBasicColors() {
  const [colorType, setColorType] = useState<ColorTypes>(ColorTypes.FUNCTION)

  return (
    <Section
      title="Basic Text Colors"
      content={
        <>
          <p>
            <b>fg.default</b>
          </p>
          <p>
            Primary text color for body content, headings, and main interface text. This color
            provides optimal readability with high contrast against standard backgrounds.
          </p>

          <p>
            <b>fg.secondary</b>
          </p>
          <p>
            Secondary text color for supporting content, captions, and less prominent text elements
            that still need good readability but with reduced visual weight.
          </p>

          <p>
            <b>fg.tertiary</b>
          </p>
          <p>
            Subtle text color for placeholder text, timestamps, and supplementary information that
            provides context without competing for attention.
          </p>

          <p>
            <b>fg.disabled</b>
          </p>
          <p>
            Non-interactive text color for disabled form elements, inactive controls, and content
            that cannot be engaged with by users.
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
          {textBasicGroups.map((colorData) => {
            const colorKey = color(colorData.colorKey as ColorPath)

            return (
              <div
                key={colorData.name}
                style={
                  {
                    "--color": colorKey,
                  } as React.CSSProperties
                }
              >
                <ColorField
                  colorValue={colorKey}
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
                <h3
                  className={styles.heading}
                  style={{
                    fontFamily: typography("heading.medium").fontFamily,
                    fontSize: typography("heading.medium").fontSize,
                    fontWeight: typography("heading.medium").fontWeight,
                    lineHeight: typography("heading.medium").lineHeight,
                    letterSpacing: typography("heading.medium").letterSpacing,
                  }}
                >
                  The quick brown fox
                </h3>
              </div>
            )
          })}
        </Panel>
      ))}
    </Section>
  )
})

SectionTextBasicColors.displayName = "SectionTextBasicColors"
