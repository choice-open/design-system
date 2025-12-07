"use client"
import React from "react"
import {
  Container,
  Hero,
  SectionDetailShadow,
  SectionOverviewShadow,
  SectionHardShadow,
} from "../components"

const ShadowsPage: React.FC = () => {
  return (
    <Container>
      <Hero
        title="Shadow Overview"
        description="In order to create a consistent appearance for shadows, we’ve created a range of preset elevations that shift automatically based on user theme and screen resolution."
      />

      <SectionOverviewShadow />
      <SectionDetailShadow />
      <Hero
        title="Hard Shadows"
        description="No blurring shadows, used in some cases instead of borders, especially when you don't want the border to affect the size."
      />

      <SectionHardShadow />
    </Container>
  )
}

export default ShadowsPage
