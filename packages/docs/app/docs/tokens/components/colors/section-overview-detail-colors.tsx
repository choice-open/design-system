"use client"
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
import { overviewRampsGroups } from "./contents"
import styles from "./section-overview-detail-colors.module.css"

export const SectionOverviewDetailColor = memo(function SectionOverviewDetailColor() {
  const [selectedColor, setSelectedColor] = useState<string | null>("blue")

  const [colorType, setColorType] = useState<ColorTypes>(ColorTypes.FUNCTION)

  return (
    <Section
      title="Adaptive Color Precision"
      content={
        <>
          <p>
            Our color scales include theme-specific optimizations that ensure colors maintain their
            intended visual impact across different background contexts and lighting conditions.
          </p>

          <p>
            Each color is carefully calibrated for its context, with subtle adjustments between
            light and dark themes to compensate for how human color perception changes against
            different backgrounds.
          </p>
          <p>
            When using semantic color tokens, these contextual adaptations happen automatically,
            ensuring consistent visual hierarchy and accessibility across all interface states.
          </p>
        </>
      }
    >
      <PanelHeader>
        {overviewRampsGroups.slice(2, -1).map((colorData) => (
          <button
            key={colorData.name}
            className={styles.colorRadioButton}
            onClick={() => setSelectedColor(colorData.name)}
            data-selected={selectedColor === colorData.name}
            style={
              {
                "--color": `var(--cdt-color-${colorData.shades[4].key.replace(".", "-")})`,
              } as React.CSSProperties
            }
          >
            <span>{colorData.shades[3].key.replace(".400", "")}</span>
          </button>
        ))}

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
          {overviewRampsGroups
            .filter((colorData) => colorData.name === selectedColor)
            .map((shadeGroup) =>
              shadeGroup.shades.map((shade) => (
                <ColorField
                  key={shade.key}
                  colorValue={`rgba(var(--cdt-color-${shade.key.replace(".", "-")}), 1)`}
                  colorString={
                    <ColorValue
                      selectedColor={shade.key}
                      colorType={colorType}
                      shade={shade}
                      theme={theme as "light" | "dark"}
                    />
                  }
                />
              )),
            )}
        </Panel>
      ))}
    </Section>
  )
})

SectionOverviewDetailColor.displayName = "SectionOverviewDetailColor"
