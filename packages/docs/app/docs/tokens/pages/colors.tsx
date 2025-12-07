"use client"
import React from "react"
import {
  Hero,
  SectionOverviewDetailColor,
  SectionOverviewRampsColor,
  SectionOverviewThemeColors,
  SectionOverviewSemanticColors,
  SectionTextTintedColors,
  SectionTextBasicColors,
  SectionTextAgainstColors,
  SectionIconColors,
  SectionBackgroundHuesColors,
  SectionOverviewPaleColors,
  SectionBorderColors,
  SectionBackgroundHierarchyColors,
  SectionBackgroundInteractionColors,
  Container,
} from "../components"

const ColorsPage: React.FC = () => {
  return (
    <Container>
      <Hero
        title="Color System Overview"
        description="Here’s an overview of everything you should know about our color system."
      />
      <SectionOverviewThemeColors />

      <SectionOverviewRampsColor />

      <SectionOverviewPaleColors />

      <SectionOverviewDetailColor />

      <SectionOverviewSemanticColors />

      <Hero
        title="Background Colors"
        description="These are common background colors you might be looking for."
      />

      <SectionBackgroundHierarchyColors />

      <SectionBackgroundInteractionColors />

      <SectionBackgroundHuesColors />

      <Hero
        title="Text Colors"
        description="Here’s more in depth about how to apply color styles to text, with common cases."
      />

      <SectionTextBasicColors />

      <SectionTextTintedColors />

      <SectionTextAgainstColors />

      <Hero
        title="Icon Colors"
        description="Here’s how we apply color to most of our icons."
      />

      <SectionIconColors />

      <Hero
        title="Border Colors"
        description="These are the most common border colors we frequently use."
      />

      <SectionBorderColors />
    </Container>
  )
}

export default ColorsPage
