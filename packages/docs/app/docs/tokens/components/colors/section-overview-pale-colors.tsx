"use client"
import { memo } from "react"
import { Panel, Section } from ".."
import { ColorSwatchField } from "../ui"
import { overviewPaleGroup } from "./contents"

export const SectionOverviewPaleColors = memo(function SectionOverviewPaleColors() {
  return (
    <Section
      title="Subdued Color Variants"
      content={
        <>
          <p>
            Subdued color variants provide gentler alternatives to our main color scales, designed
            for contexts where full saturation might feel too intense. These variations maintain the
            essential character of each hue while offering improved balance in complex interfaces.
          </p>

          <p>
            These variants are particularly effective for large background areas, subtle accents,
            and interfaces that require extended viewing periods. They help reduce visual fatigue
            while preserving color meaning and brand consistency.
          </p>
        </>
      }
    >
      {["light", "dark"].map((theme) => (
        <Panel
          theme={theme as "light" | "dark"}
          key={theme}
        >
          {overviewPaleGroup.map((colorData) => {
            return (
              <ColorSwatchField
                key={colorData.name}
                colorData={colorData}
                theme={theme as "light" | "dark"}
              />
            )
          })}
        </Panel>
      ))}
    </Section>
  )
})

SectionOverviewPaleColors.displayName = "SectionOverviewPaleColors"
