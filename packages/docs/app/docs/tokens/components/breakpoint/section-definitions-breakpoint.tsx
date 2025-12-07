"use client"
import { listBreakpoints, spacingList, typography } from "@choice-ui/design-tokens"
import { memo } from "react"
import { Section } from ".."
import styles from "./section-definitions-breakpoint.module.css"

export const SectionDefinitionsBreakpoint = memo(function SectionDefinitionsBreakpoint() {
  const breakpointData = listBreakpoints()
  const thTypography = typography("body.medium-strong")

  return (
    <Section
      orientation="vertical"
      title="Breakpoint Definitions"
      content={
        <>
          <p>
            Our breakpoints system provides complete media query tools and responsive layout
            support, maintaining consistency with Tailwind CSS&apos;s breakpoint system while
            offering more powerful functionality and better TypeScript support.
          </p>
        </>
      }
    >
      <table className={styles.breakpointTable}>
        <thead>
          <tr>
            <th
              style={{
                fontFamily: thTypography.fontFamily,
                fontSize: thTypography.fontSize,
                fontWeight: thTypography.fontWeight,
                lineHeight: thTypography.lineHeight,
                letterSpacing: thTypography.letterSpacing,
              }}
            >
              Breakpoint Name
            </th>
            <th
              style={{
                fontFamily: thTypography.fontFamily,
                fontSize: thTypography.fontSize,
                fontWeight: thTypography.fontWeight,
                lineHeight: thTypography.lineHeight,
                letterSpacing: thTypography.letterSpacing,
              }}
            >
              Minimum Width
            </th>
            <th
              style={{
                fontFamily: thTypography.fontFamily,
                fontSize: thTypography.fontSize,
                fontWeight: thTypography.fontWeight,
                lineHeight: thTypography.lineHeight,
                letterSpacing: thTypography.letterSpacing,
              }}
            >
              CSS Variable
            </th>
            <th
              style={{
                fontFamily: thTypography.fontFamily,
                fontSize: thTypography.fontSize,
                fontWeight: thTypography.fontWeight,
                lineHeight: thTypography.lineHeight,
                letterSpacing: thTypography.letterSpacing,
              }}
            >
              Media Query
            </th>
          </tr>
        </thead>
        <tbody>
          {breakpointData.breakpoints.map((info) => {
            const remValue = (info.value / 16).toFixed(4)
            return (
              <tr key={info.name}>
                <td>{info.name}</td>
                <td>{remValue}rem</td>
                <td>{info.css}</td>
                <td>@media screen and (min-width: {remValue}rem)</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Section>
  )
})
