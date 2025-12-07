"use client"

import { typography } from "@choice-ui/design-tokens"
import { useState } from "react"
import { Container } from "../page"
import styles from "./section-css-in-js-demos.module.css"

// ============================================================================
// CSS-in-JS Library Demos
// ============================================================================

interface LibraryDemo {
  name: string
  description: string
  installation: string
  usage: string
  features: string[]
}

const libraryDemos: LibraryDemo[] = [
  {
    name: "Styled Components",
    description: "The most popular CSS-in-JS library with great DX",
    installation: "npm install styled-components",
    usage: `import styled from 'styled-components';
import { color, spacing, typographyStyles } from '@choice-ui/design-tokens';

 const Button = styled.button\`
   background: \${() => color("background.accent")};
   color: \${() => color("text.on-accent")};
   padding: \${() => spacing(3)} \${() => spacing(6)};
   border-radius: \${() => radius("md")};
   \${() => typographyStyles("body.medium")};
   
   &:hover {
     background: \${() => color("background.accent-hover")};
   }
   
   \${() => up("md")} {
     padding: \${() => spacing(4)} \${() => spacing(8)};
   }
 \`;`,
    features: ["Runtime styling", "Theme provider", "SSR support", "TypeScript ready"],
  },
  {
    name: "Emotion",
    description: "Performant and flexible CSS-in-JS library",
    installation: "npm install @emotion/react @emotion/styled",
    usage: `import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { color, spacing, typographyStyles } from '@choice-ui/design-tokens';

 const Button = styled.button\`
   background: \${color("background.accent")};
   color: \${color("text.on-accent")};
   padding: \${spacing(3)} \${spacing(6)};
   border-radius: \${radius("md")};
   \${typographyStyles("body.medium")};
   
   &:hover {
     background: \${color("background.accent-hover")};
   }
   
   \${up("md")} {
     padding: \${spacing(4)} \${spacing(8)};
   }
 \`;

 // Or with css prop
 const buttonStyles = css\`
   background: \${color("background.accent")};
   color: \${color("text.on-accent")};
 \`;`,
    features: ["Great performance", "CSS prop support", "Source maps", "Framework agnostic"],
  },
  {
    name: "Stitches",
    description: "CSS-in-JS with near-zero runtime",
    installation: "npm install @stitches/react",
    usage: `import { styled } from '@stitches/react';
import { color, spacing, typographyStyles } from '@choice-ui/design-tokens';

 const Button = styled('button', {
   background: color("background.accent"),
   color: color("text.on-accent"),
   padding: \`\${spacing(3)} \${spacing(6)}\`,
   borderRadius: radius("md"),
   ...typographyStyles("body.medium"),
   
   '&:hover': {
     background: color("background.accent-hover"),
   },
   
   [\`@media \${up("md")}\`]: {
     padding: \`\${spacing(4)} \${spacing(8)}\`,
   },
 });`,
    features: ["Near-zero runtime", "Variants API", "TypeScript first", "Atomic CSS"],
  },
  {
    name: "Vanilla Extract",
    description: "Zero-runtime Stylesheets-in-TypeScript",
    installation: "npm install @vanilla-extract/css",
    usage: `import { style } from '@vanilla-extract/css';
import { color, spacing, typographyStyles, up } from '@choice-ui/design-tokens';

 export const button = style({
   background: color("background.accent"),
   color: color("text.on-accent"),
   padding: \`\${spacing(3)} \${spacing(6)}\`,
   borderRadius: radius("md"),
   ...typographyStyles("body.medium"),
   
   ':hover': {
     background: color("background.accent-hover"),
   },
   
   [\`@media \${up("md")}\`]: {
     padding: \`\${spacing(4)} \${spacing(8)}\`,
   },
 });`,
    features: ["Zero runtime", "Type safety", "CSS Modules", "Build-time extraction"],
  },
  {
    name: "Linaria",
    description: "Zero-runtime CSS in JS library",
    installation: "npm install @linaria/core @linaria/react",
    usage: `import { css } from '@linaria/core';
import { color, spacing, typographyStyles, up } from '@choice-ui/design-tokens';

 const button = css\`
   background: \${color("background.accent")};
   color: \${color("text.on-accent")};
   padding: \${spacing(3)} \${spacing(6)};
   border-radius: \${radius("md")};
   \${typographyStyles("body.medium")};
   
   &:hover {
     background: \${color("background.accent-hover")};
   }
   
   \${up("md")} {
     padding: \${spacing(4)} \${spacing(8)};
   }
 \`;`,
    features: ["Zero runtime", "Atomic CSS", "Build-time extraction", "Framework agnostic"],
  },
  {
    name: "Compiled",
    description: "Build time CSS-in-JS by Atlassian",
    installation: "npm install @compiled/react",
    usage: `import { styled } from '@compiled/react';
import { color, spacing, typographyStyles, up } from '@choice-ui/design-tokens';

 const Button = styled.button\`
   background: \${color("background.accent")};
   color: \${color("text.on-accent")};
   padding: \${spacing(3)} \${spacing(6)};
   border-radius: \${radius("md")};
   \${typographyStyles("body.medium")};
   
   &:hover {
     background: \${color("background.accent-hover")};
   }
   
   \${up("md")} {
     padding: \${spacing(4)} \${spacing(8)};
   }
 \`;`,
    features: ["Build-time optimization", "Atomic CSS", "Small bundle size", "TypeScript support"],
  },
]

export const SectionCssInJsDemos: React.FC = () => {
  const [expandedDemo, setExpandedDemo] = useState<string | null>(null)

  const toggleDemo = (demoName: string) => {
    setExpandedDemo(expandedDemo === demoName ? null : demoName)
  }

  const displayTypography = typography("heading.display")
  const bodyLargeTypography = typography("body.large")
  const headingMediumTypography = typography("heading.medium")
  const bodyMediumTypography = typography("body.medium")
  const bodySmallTypography = typography("body.small")

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.header}>
          <h2
            className={styles.title}
            style={{
              fontFamily: displayTypography.fontFamily,
              fontSize: displayTypography.fontSize,
              fontWeight: displayTypography.fontWeight,
              lineHeight: displayTypography.lineHeight,
              letterSpacing: displayTypography.letterSpacing,
            }}
          >
            Universal CSS-in-JS Support
          </h2>
          <p
            className={styles.subtitle}
            style={{
              fontFamily: bodyLargeTypography.fontFamily,
              fontSize: bodyLargeTypography.fontSize,
              fontWeight: bodyLargeTypography.fontWeight,
              lineHeight: bodyLargeTypography.lineHeight,
              letterSpacing: bodyLargeTypography.letterSpacing,
            }}
          >
            Our design tokens work seamlessly with every major CSS-in-JS library. Use the same token
            API across different projects and teams. No lock-in, maximum flexibility.
          </p>
        </div>

        <div className={styles.demosList}>
          {libraryDemos.map((demo) => (
            <div
              key={demo.name}
              className={styles.demoCard}
            >
              <div className={styles.demoHeader}>
                <h3
                  className={styles.demoName}
                  style={{
                    fontFamily: headingMediumTypography.fontFamily,
                    fontSize: headingMediumTypography.fontSize,
                    fontWeight: headingMediumTypography.fontWeight,
                    lineHeight: headingMediumTypography.lineHeight,
                    letterSpacing: headingMediumTypography.letterSpacing,
                  }}
                >
                  {demo.name}
                </h3>
                <p
                  className={styles.demoDesc}
                  style={{
                    fontFamily: bodyMediumTypography.fontFamily,
                    fontSize: bodyMediumTypography.fontSize,
                    fontWeight: bodyMediumTypography.fontWeight,
                    lineHeight: bodyMediumTypography.lineHeight,
                    letterSpacing: bodyMediumTypography.letterSpacing,
                  }}
                >
                  {demo.description}
                </p>

                <div className={styles.installCommand}>{demo.installation}</div>

                <button
                  className={styles.toggleButton}
                  onClick={() => toggleDemo(demo.name)}
                  style={{
                    fontFamily: bodySmallTypography.fontFamily,
                    fontSize: bodySmallTypography.fontSize,
                    fontWeight: bodySmallTypography.fontWeight,
                    lineHeight: bodySmallTypography.lineHeight,
                    letterSpacing: bodySmallTypography.letterSpacing,
                  }}
                >
                  {expandedDemo === demo.name ? "Hide Code" : "Show Code Example"}
                </button>
              </div>

              {expandedDemo === demo.name && (
                <div className={styles.codeBlock}>
                  <pre>{demo.usage}</pre>
                </div>
              )}

              <ul className={styles.featuresList}>
                {demo.features.map((feature, index) => (
                  <li
                    key={index}
                    className={styles.featureItem}
                  >
                    <span
                      className={styles.featureText}
                      style={{
                        fontFamily: bodySmallTypography.fontFamily,
                        fontSize: bodySmallTypography.fontSize,
                        fontWeight: bodySmallTypography.fontWeight,
                        lineHeight: bodySmallTypography.lineHeight,
                        letterSpacing: bodySmallTypography.letterSpacing,
                      }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
