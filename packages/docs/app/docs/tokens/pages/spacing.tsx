"use client"
import React from "react"
import {
  Container,
  Hero,
  SectionContainerSpacing,
  SectionCustomizingSpacing,
  SectionDefaultSpacing,
  SectionListSpacing,
  SectionPercentageSpacing,
  SectionUsageSpacing,
} from "../components"

const SpacingPage: React.FC = () => {
  return (
    <Container>
      <Hero
        title="Spacing Scale Overview"
        description="Our spacing system is built on a 4px base unit, providing preset values from 0 to 80px. Using the spacing() function, you can set spacing with numeric multipliers (e.g., spacing(4) = 16px) or semantic aliases (e.g., spacing('sm') = 640px). The system supports arbitrary values, offering flexibility while maintaining consistency."
      />

      <SectionDefaultSpacing />

      <SectionCustomizingSpacing />

      <SectionPercentageSpacing />

      <SectionContainerSpacing />

      <SectionListSpacing />

      <SectionUsageSpacing />
    </Container>
  )
}

export default SpacingPage
