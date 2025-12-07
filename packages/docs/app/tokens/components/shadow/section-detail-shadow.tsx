"use client"
import { ShadowKey, shadow, shadowList } from "@choice-ui/design-tokens"
import { CSSProperties, Fragment, memo } from "react"
import { Panel, Section, ShadowField, TokenFunctionDisplay } from ".."
import styles from "./section-detail-shadow.module.css"

export const SectionDetailShadow = memo(function SectionDetailShadow() {
  return (
    <>
      {shadowList().map((shadowName) => {
        return (
          <Section
            key={shadowName}
            title={`${shadowName.charAt(0).toUpperCase() + shadowName.slice(1)} Shadow`}
            content={
              <>
                <p>Shadow effect for visual depth and layering in your interface.</p>
              </>
            }
          >
            {["light", "dark"].map((theme) => {
              const shadowValue = shadow(shadowName as ShadowKey, theme as "light" | "dark")

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
                              "--shadow": shadowValue,
                            } as CSSProperties
                          }
                        />
                      </div>
                      <div className={styles.shadowInfo}>
                        <TokenFunctionDisplay
                          functionName="shadow"
                          value={shadowName}
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

SectionDetailShadow.displayName = "SectionDetailShadow"
