"use client"
import { spacing, type SpacingValue } from "@choice-ui/design-tokens";
import { CSSProperties, Fragment, memo } from "react";
import { Section } from "..";
import {
  SpacingBar,
  SpacingDivider,
  SpacingGrid,
  SpacingLabel,
  SpacingValue as SpacingValueComponent,
} from "../page/share";

// 现在使用固定的间距值列表
const spacingScale = {
  px: 1,
  "0": 0,
  "1": 4,
  "2": 8,
  "3": 12,
  "4": 16,
  "5": 20,
  "6": 24,
  "8": 32,
  "10": 40,
  "12": 48,
  "16": 64,
  "20": 80,
  "24": 96,
  "32": 128,
  "40": 160,
  "48": 192,
  "56": 224,
  "64": 256,
  "72": 288,
  "80": 320,
  "96": 384,
} as const;

export const SectionDefaultSpacing = memo(function SectionDefaultSpacing() {
  return (
    <>
      <Section
        title="Default Spacing"
        content={
          <>
            <p>
              Our spacing system is built on a 4px base unit, providing preset
              values from 0 to 80px. Using the spacing() function, you can set
              spacing with numeric multipliers (e.g., spacing(4) = 16px) or
              semantic aliases (e.g., spacing(&apos;sm&apos;) = 640px). The
              system supports arbitrary values, offering flexibility while
              maintaining consistency.
            </p>
          </>
        }
      >
        <SpacingGrid>
          {Object.entries(spacingScale)
            .sort((a, b) => {
              const numA = Number(a[0]);
              const numB = Number(b[0]);

              // 特殊处理：0 排在最前面
              if (a[0] === "0") return -1;
              if (b[0] === "0") return 1;

              // px 排在其他数字前面（但在0后面）
              if (isNaN(numA) && isNaN(numB)) return a[0].localeCompare(b[0]);
              if (isNaN(numA)) return -1;
              if (isNaN(numB)) return 1;

              return numA - numB;
            })
            .map(([key, value], index) => (
              <Fragment key={key}>
                <SpacingValueComponent>{key}</SpacingValueComponent>
                <SpacingValueComponent>
                  {key === "px" ? "-" : `${Number(key) / 4}rem`}
                </SpacingValueComponent>
                <SpacingValueComponent>
                  {spacing(key as SpacingValue)}
                </SpacingValueComponent>
                <SpacingValueComponent>
                  $spacing(
                  <SpacingLabel>{key}</SpacingLabel>)
                </SpacingValueComponent>
                <SpacingBar
                  style={
                    {
                      "--width": `${key === "px" ? "1px" : `${Number(key) / 4}rem`}`,
                    } as CSSProperties
                  }
                />
                {index !== Object.entries(spacingScale).length - 1 && (
                  <SpacingDivider />
                )}
              </Fragment>
            ))}
        </SpacingGrid>
      </Section>
    </>
  );
});

SectionDefaultSpacing.displayName = "SectionDefaultSpacing";
