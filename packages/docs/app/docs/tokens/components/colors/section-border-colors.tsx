"use client"
import { color, ColorPath } from "@choice-ui/design-tokens"
import { ToolbarFrame } from "@choiceform/icons-react"
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
import { defaultBorderGroups, menuBorderStrongGroups, selectionBorderGroups } from "./contents"
import styles from "./section-border-colors.module.css"

export const SectionBorderColors = memo(function SectionBorderColors() {
  const [colorType, setColorType] = useState<ColorTypes>(ColorTypes.FUNCTION)

  return (
    <>
      <Section
        title="Standard Border Colors"
        content={
          <>
            <p>Border colors provide visual separation and structure throughout the interface.</p>

            <p>
              <b>bd.default</b>
            </p>
            <p>
              Primary border color for separating content areas, form inputs, and component
              boundaries.
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
            {defaultBorderGroups.map((colorData) => {
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
                  <div className={styles.borderContainer}>
                    <div className={styles.borderLine} />
                  </div>
                </div>
              )
            })}
          </Panel>
        ))}
      </Section>

      <Section
        title="Focus & Selection Borders"
        content={
          <div className={styles.contentFlex}>
            <p>
              <b>bd.selected</b>
            </p>
            <p>
              Primary selection color for focused inputs, active controls, and interactive states.
            </p>

            <p>
              <b>bd.selected-strong</b>
            </p>
            <p>
              Enhanced selection color for high-contrast situations where standard selection borders
              need stronger visual emphasis.
            </p>
          </div>
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
            {selectionBorderGroups.map((colorData) => {
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
                  <div className={styles.borderContainerPadding}>
                    <div
                      data-strong={colorData.name === "border.selected-strong"}
                      className={styles.borderBox}
                    >
                      <ToolbarFrame />
                    </div>
                  </div>
                </div>
              )
            })}
          </Panel>
        ))}
      </Section>

      <Section
        title="Specialized Interface Borders"
        content={
          <div className={styles.contentFlex}>
            <p>
              Specialized border colors for specific interface contexts like toolbars and menus that
              require unique visual treatment.
            </p>

            <p>
              <b>bd.menu</b>
            </p>
            <p>Border color optimized for menu and dropdown contexts.</p>

            <p>
              <b>bd.toolbar</b>
            </p>
            <p>Border color designed for toolbar interfaces and control panels.</p>
          </div>
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
            {menuBorderStrongGroups.map((colorData) => {
              return (
                <div
                  key={colorData.name}
                  style={
                    {
                      "--color": color(colorData.colorKey as ColorPath),
                    } as React.CSSProperties
                  }
                >
                  <ColorField
                    colorValue={color(colorData.colorKey as ColorPath)}
                    colorString={
                      <ColorValue
                        selectedColor={colorData.colorKey}
                        colorType={colorType}
                        shade={{
                          key: colorData.colorKey,
                        }}
                        theme={theme as "light" | "dark"}
                      />
                    }
                  />
                  <div
                    data-type={colorData.colorKey}
                    className={styles.specialBorderContainer}
                  >
                    <div className={styles.specialBorderLine} />
                  </div>
                </div>
              )
            })}
          </Panel>
        ))}
      </Section>
    </>
  )
})

SectionBorderColors.displayName = "SectionBorderColors"
