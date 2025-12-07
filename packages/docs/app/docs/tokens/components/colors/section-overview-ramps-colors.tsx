"use client"
import { memo } from "react"
import { Panel, Section } from ".."
import { ColorSwatchField } from "../ui"
import { overviewRampsGroups } from "./contents"

export const SectionOverviewRampsColor = memo(function SectionOverviewRampsColor() {
  return (
    <Section
      title="Color Scales"
      content={
        <>
          <p>
            Our color foundation consists of carefully crafted color scales that form the building
            blocks for all semantic colors. Each scale contains 10 shades ranging from 100
            (lightest) to 950 (darkest), providing comprehensive coverage for various design needs.
          </p>
          <p>
            <b>Prefer semantic tokens when possible</b>
          </p>
          <p>
            These foundational colors can be used directly, but we recommend utilizing semantic
            color tokens (like fg-default) instead of specific scale values (like blue-500) to
            maintain consistency and enable easier theme switching.
          </p>
          <p>
            <b>Neutral Foundation</b>
          </p>
          <ul>
            <li>White - Pure white with various opacity levels</li>
            <li>Black - Pure black with various opacity levels</li>
            <li>Grey - Complete neutral scale for backgrounds and text</li>
          </ul>
          <p>
            <b>Brand Colors</b>
          </p>
          <ul>
            <li>Blue - Primary actions and information</li>
            <li>Violet - Premium features and highlights</li>
            <li>Purple - Secondary branding and special states</li>
            <li>Pink - Accent and promotional content</li>
            <li>Teal - Fresh accents and callouts</li>
            <li>Red - Errors, warnings, and destructive actions</li>
            <li>Orange - Alerts and important notifications</li>
            <li>Yellow - Cautions and highlighted content</li>
            <li>Green - Success states and positive feedback</li>
          </ul>
        </>
      }
    >
      {["light", "dark"].map((theme) => (
        <Panel
          theme={theme as "light" | "dark"}
          key={theme}
        >
          {overviewRampsGroups.map((colorData) => (
            <ColorSwatchField
              key={colorData.name}
              colorData={colorData}
              theme={theme as "light" | "dark"}
            />
          ))}
        </Panel>
      ))}
    </Section>
  )
})

SectionOverviewRampsColor.displayName = "SectionOverviewRampsColor"
