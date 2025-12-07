"use client"
import { ShadowKey, shadow, tokens } from "@choice-ui/design-tokens"
import { CSSProperties, Fragment, memo } from "react"
import { Panel, Section, ShadowField, TokenFunctionDisplay } from ".."
import styles from "./section-hard-shadow.module.css"

export const SectionHardShadow = memo(function SectionHardShadow() {
  const getAllShadowKeys = () => {
    return Object.keys(tokens).filter((key) => key.startsWith("shadows."))
  }

  return (
    <>
      {getAllShadowKeys()
        .slice(6, 10)
        .map((shadowName) => {
          return (
            <Section
              key={shadowName}
              title={`${shadowName.charAt(0).toUpperCase() + shadowName.slice(1)} Hard Shadow`}
              content={
                <>
                  <p>
                    Strong shadow effects for prominent elements that need significant visual
                    separation.
                  </p>
                </>
              }
            >
              {["light", "dark"].map((theme) => {
                const shadowValue = shadow(
                  shadowName.replace("shadows.", "") as ShadowKey,
                  theme as "light" | "dark",
                )

                return (
                  <Panel
                    theme={theme as "light" | "dark"}
                    key={theme}
                  >
                    <div className={styles.container}>
                      <Fragment key={shadowName}>
                        <div className={styles.shadowBoxWrapper}>
                          <div
                            className={styles.shadowBox}
                            style={
                              {
                                "--shadow": `var(--cdt-${shadowName.replace(".", "-")})`,
                              } as CSSProperties
                            }
                          />
                        </div>
                        <div className={styles.shadowInfo}>
                          <TokenFunctionDisplay
                            functionName="shadow"
                            value={shadowName.replace("shadows.", "")}
                          />
                          <ShadowField shadowString={shadowValue} />
                        </div>
                      </Fragment>
                    </div>
                  </Panel>
                )
              })}
            </Section>
          )
        })}
    </>
  )
})

SectionHardShadow.displayName = "SectionHardShadow"
