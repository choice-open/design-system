"use client"
import { color, typography } from "@choice-ui/design-tokens"
import { Highlight, Language, PrismTheme } from "prism-react-renderer"
import { CSSProperties, memo, ReactNode } from "react"
import styles from "./code-block.module.css"

export interface CodeBlockProps {
  className?: string
  code: string
  customHighlight?: (tokenContent: string, tokenType: string) => ReactNode | undefined
  language?: Language
  styleOverrides?: CSSProperties
}

const customTheme: PrismTheme = {
  plain: {
    color: color("text.default"),
  },
  styles: [],
}

export const CodeBlock = memo(function CodeBlock(props: CodeBlockProps) {
  const { code, language = "tsx", customHighlight, styleOverrides, className } = props

  const bodyTypography = typography("body.medium")

  return (
    <div className={className}>
      <Highlight
        code={code}
        language={language}
        theme={customTheme}
      >
        {({ className: prismClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${styles.codeBlock} ${prismClassName}`}
            style={{
              ...(style as CSSProperties),
              ...styleOverrides,
              fontFamily: bodyTypography.fontFamily,
              fontSize: bodyTypography.fontSize,
              fontWeight: bodyTypography.fontWeight,
              lineHeight: bodyTypography.lineHeight,
              letterSpacing: bodyTypography.letterSpacing,
            }}
          >
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line })
              return (
                <div
                  key={i}
                  className={lineProps.className}
                  style={lineProps.style as CSSProperties}
                >
                  {line.map((token, tokenKey) => {
                    if (customHighlight) {
                      const custom = customHighlight(token.content, token.types[0])
                      if (custom) return custom
                    }
                    const tokenProps = getTokenProps({ token })
                    return (
                      <span
                        key={tokenKey}
                        className={tokenProps.className}
                        style={tokenProps.style as CSSProperties}
                      >
                        {tokenProps.children}
                      </span>
                    )
                  })}
                </div>
              )
            })}
          </pre>
        )}
      </Highlight>
    </div>
  )
})
