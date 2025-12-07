"use client"
import { listBreakpoints } from "@choice-ui/design-tokens";
import { CSSProperties, Fragment, memo } from "react";
import { Section } from "..";
import {
  SpacingBar,
  SpacingDivider,
  SpacingGrid,
  SpacingLabel,
  SpacingValue,
} from "../page/share";

export const SectionContainerSpacing = memo(function SectionContainerSpacing() {
  const breakpointData = listBreakpoints();
  return (
    <Section
      orientation="vertical"
      title="Container Spacing"
      content={
        <>
          <p>
            The spacing() function also supports container values. This is
            useful when you need to set spacing relative to the container
            element&apos;s width or height.
          </p>
          <ul>
            <li>
              <code>container-xs</code> - 475px
            </li>
            <li>
              <code>container-sm</code> - 640px
            </li>
            <li>
              <code>container-md</code> - 768px
            </li>
            <li>
              <code>container-lg</code> - 1024px
            </li>
            <li>
              <code>container-xl</code> - 1280px
            </li>
            <li>
              <code>container-2xl</code> - 1536px
            </li>
          </ul>
        </>
      }
    >
      <SpacingGrid>
        {breakpointData.breakpoints.map((key, index) => (
          <Fragment key={key.name}>
            <SpacingValue>{key.name}</SpacingValue>
            <SpacingValue>{key.value}px</SpacingValue>
            <SpacingValue>{key.css}</SpacingValue>
            <SpacingValue>
              $spacing(
              <SpacingLabel>{`"${key.name}"`}</SpacingLabel>)
            </SpacingValue>
            <SpacingBar
              style={
                {
                  "--width": `var(--cdt-breakpoints-${key.name.replace(".", "-")})`,
                } as CSSProperties
              }
            />
            {index !== breakpointData.breakpoints.length - 1 && (
              <SpacingDivider />
            )}
          </Fragment>
        ))}
      </SpacingGrid>
    </Section>
  );
});

SectionContainerSpacing.displayName = "SectionContainerSpacing";
