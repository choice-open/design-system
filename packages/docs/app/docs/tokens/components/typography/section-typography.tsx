"use client"
import {
  typography,
  listTypographyPresets,
  typographyInfo,
  TypographyKey,
} from "@choice-ui/design-tokens"
import { memo } from "react"
import { Section } from "../page"
import { TokenFunctionDisplay } from "../ui"
import styles from "./section-typography.module.css"

type TypographyPreset = {
  fontFamily: string
  fontSize: string
  fontWeight: string
  lineHeight: string
  letterSpacing: string
}

const InfoGrid = memo(function InfoGrid({
  value,
  presetKey,
}: {
  presetKey: string
  value: TypographyPreset
}) {
  return (
    <div className={styles.infoGrid}>
      <div className={styles.infoGridItem}>
        <TokenFunctionDisplay
          functionName="typographyStyles"
          value={presetKey}
        />
        <p>
          The typographyStyles function returns a complete style object containing all typography
          properties: fontFamily, fontSize, fontWeight, lineHeight, and letterSpacing.
        </p>
      </div>
      <div className={styles.infoGridItem}>
        <TokenFunctionDisplay
          functionName="fontFamily"
          value={value.fontFamily}
        />
        <TokenFunctionDisplay
          functionName="fontSize"
          value={value.fontSize}
        />
        <TokenFunctionDisplay
          functionName="fontWeight"
          value={value.fontWeight}
        />
        <TokenFunctionDisplay
          functionName="lineHeight"
          value={value.lineHeight}
        />
        <TokenFunctionDisplay
          functionName="letterSpacing"
          value={value.letterSpacing}
        />
      </div>
    </div>
  )
})

export const SectionTypography = memo(function SectionTypography() {
  return (
    <>
      {listTypographyPresets().map((key) => {
        const value = typographyInfo(key)
        // 使用typography函数获取完整的样式对象
        const typographyStyles = typography(key as TypographyKey)

        // 准备CSS变量值
        const cssVarStyle = {
          "--dynamic-font-family": typographyStyles.fontFamily,
          "--dynamic-font-size": typographyStyles.fontSize,
          "--dynamic-font-weight": typographyStyles.fontWeight,
          "--dynamic-line-height": typographyStyles.lineHeight,
          "--dynamic-letter-spacing": typographyStyles.letterSpacing,
        } as React.CSSProperties

        const backgroundVarStyle = {
          "--dynamic-lineHeight": `${typographyStyles.lineHeight} ${typographyStyles.lineHeight}`,
        } as React.CSSProperties

        return (
          <Section
            key={key}
            title={key.replace(/\./g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
            content={
              <>
                <p>
                  Typography preset with {value.value.fontFamily} font family,{" "}
                  {value.value.fontSize} size,
                  {value.value.fontWeight} weight, {value.value.lineHeight} line height, and{" "}
                  {value.value.letterSpacing} letter spacing.
                </p>
                <p>
                  This preset is designed for optimal readability with precise letter spacing and
                  carefully balanced proportions, ensuring consistent typography across the design
                  system.
                </p>
              </>
            }
          >
            <div className={styles.container}>
              <InfoGrid
                key={key}
                value={value.value}
                presetKey={key}
              />

              <div
                className={styles.examples}
                style={backgroundVarStyle}
              >
                <div
                  className={`${styles.dynamicTypography} ${styles.primaryText}`}
                  style={cssVarStyle}
                >
                  The quick brown fox jumps over the lazy dog
                </div>

                {key !== "heading.display" && (
                  <div
                    className={`${styles.dynamicTypography} ${styles.secondaryText}`}
                    style={cssVarStyle}
                  >
                    Typography is the art and technique of arranging type to make written language
                    legible, readable and appealing when displayed. This typography system provides
                    consistent font tokens with precise letter spacing, optimized line heights, and
                    carefully selected font weights for maximum readability and visual harmony.
                  </div>
                )}

                <div
                  className={`${styles.dynamicTypography} ${styles.tertiaryText}`}
                  style={cssVarStyle}
                >
                  0123456789 !@#$%^&*()_+-=[]&#123;&#125;|;&apos;:&quot;,./?
                </div>
              </div>
            </div>
          </Section>
        )
      })}
    </>
  )
})

SectionTypography.displayName = "SectionTypography"
