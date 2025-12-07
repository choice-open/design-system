"use client"
import React from "react"
import { Container, Hero } from "../components"
import {
  SectionDefinitionsBreakpoint,
  SectionDemoBreakpoint,
  SectionQueryBreakpoint,
  SectionUsageBreakpoint,
} from "../components/breakpoint"

const BreakpointsPage: React.FC = () => {
  return (
    <Container>
      <Hero
        title="Breakpoints Overview"
        description="Responsive design is the core of our breakpoints system. Our breakpoints system provides complete media query tools and responsive layout support, maintaining consistency with Tailwind CSS's breakpoint system while offering more powerful functionality and better TypeScript support."
      />

      <SectionDefinitionsBreakpoint />

      <SectionDemoBreakpoint />

      <SectionQueryBreakpoint />

      <SectionUsageBreakpoint />
    </Container>
  )
}

export default BreakpointsPage
