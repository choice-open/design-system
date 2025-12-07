"use client"
import { color, ColorPath } from "@choice-ui/design-tokens"
import ToolbarComponent from "@choiceform/icons-react/ToolbarComponent"
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
import { iconGroups } from "./contents"
import styles from "./section-icon-colors.module.css"

export const SectionIconColors = memo(function SectionIconColors() {
  const [colorType, setColorType] = useState<ColorTypes>(ColorTypes.FUNCTION)

  return (
    <Section
      title="Icon Color System"
      content={
        <>
          <p>
            <b>ic.default</b>
          </p>
          <p>Standard icon color for primary interface elements and active states</p>

          <p>
            <b>ic.secondary</b>
          </p>
          <p>
            Reduced emphasis icon color for supporting elements and secondary actions that need
            visual de-emphasis for proper hierarchy.
          </p>

          <p>
            <b>ic.tertiary</b>
          </p>
          <p>Minimal icon color for decorative elements, indicators, and subtle visual cues</p>

          <p>
            <b>ic.disabled</b>
          </p>
          <p>
            Non-interactive icon color for disabled states and elements that cannot be engaged with
            by users.
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
          {iconGroups.map((colorData) => {
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
                <h3 className={styles.iconContainer}>
                  <ToolbarComponent color="var(--color)" />
                </h3>
              </div>
            )
          })}
        </Panel>
      ))}
    </Section>
  )
})

SectionIconColors.displayName = "SectionIconColors"
