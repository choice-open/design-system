"use client"
import React from "react"
import {
  Container,
  Hero,
  SectionDetailShadow,
  SectionOverviewShadow,
  SectionTypography,
} from "../components"

const TypographyPage: React.FC = () => {
  return (
    <Container>
      <Hero
        title="Typography Tokens"
        description="Our typography system provides consistent font tokens for headings and body text, organized by size variants (lg, md, sm) and weight options. These tokens ensure uniform text styling across components while maintaining proper visual hierarchy and readability."
      />

      <SectionTypography />
    </Container>
  )
}

export default TypographyPage
