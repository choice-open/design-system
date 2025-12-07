"use client"
// import { scale } from "@choice-ui/design-tokens";
import { CSSProperties, Fragment, memo } from "react";
import { Section } from "..";
import {
  SpacingBar,
  SpacingDivider,
  SpacingGrid,
  SpacingLabel,
  SpacingValue,
} from "../page/share";

export const SectionCustomizingSpacing = memo(
  function SectionCustomizingSpacing() {
    return (
      <>
        <Section
          title="Customizing Spacing"
          content={
            <>
              <p>
                You can customize the spacing scale by adding or removing
                values. The spacing() function will automatically adjust to the
                new scale.
              </p>
            </>
          }
        >
          <SpacingGrid>
            {[
              { key: "2.5", value: 2.5 },
              { key: "5", value: 5 },
              { key: "7.5", value: 7.5 },
              { key: "10", value: 10 },
              { key: "12.5", value: 12.5 },
              { key: "15", value: 15 },
              { key: "17.5", value: 17.5 },
              { key: "20", value: 20 },
              { key: "22.5", value: 22.5 },
              { key: "32.5", value: 32.5 },
              { key: "37.5", value: 37.5 },
            ].map(({ key, value }, index) => (
              <Fragment key={key}>
                <SpacingValue>{key}</SpacingValue>
                <SpacingValue>
                  {key === "px" ? "-" : `${Number(key) / 4}rem`}
                </SpacingValue>
                <SpacingValue>{(value / 4) * 16}px</SpacingValue>
                <SpacingValue>
                  $spacing(
                  <SpacingLabel>{key}</SpacingLabel>)
                </SpacingValue>
                <SpacingBar
                  style={
                    {
                      "--width": `${key === "px" ? "1px" : `${Number(key) / 4}rem`}`,
                    } as CSSProperties
                  }
                />
                {index !== 10 && <SpacingDivider />}
              </Fragment>
            ))}
          </SpacingGrid>
        </Section>
      </>
    );
  }
);

SectionCustomizingSpacing.displayName = "SectionCustomizingSpacing";
