import { memo, useEffect, useState, useMemo } from "react"
import { codeToHtml } from "shiki"
import { tcv, tcx } from "~/utils"
import { ScrollArea } from "~/components/scroll-area"
import { useMarkdownTheme } from "./markdown-theme-context"
import type { HTMLProps } from "react"

interface CodeBlockProps extends HTMLProps<HTMLDivElement> {
  code: string
  language?: string
}

const codeBlockTv = tcv({
  slots: {
    code: "overflow-hidden",
    content: "flex w-fit flex-col overflow-clip",
  },
})

const codeBlockCodeTv = tcv({
  base: "text-message-code w-fit min-w-full bg-transparent font-mono [&>pre]:!bg-transparent [&>pre]:px-4 [&>pre]:py-4",
})

const highlightCache = new Map<string, string>()

function getCacheKey(code: string, language: string, theme: "light" | "dark"): string {
  return `${theme}:${language}:${code.slice(0, 100)}`
}

export const CodeBlock = memo(function CodeBlock(props: CodeBlockProps) {
  const { code, language = "plaintext", className, ...rest } = props
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null)
  const theme = useMarkdownTheme()

  const cacheKey = useMemo(() => getCacheKey(code, language, theme), [code, language, theme])

  useEffect(() => {
    const cached = highlightCache.get(cacheKey)
    if (cached) {
      setHighlightedHtml(cached)
      return
    }

    async function highlight() {
      if (!code) {
        const html = "<pre><code></code></pre>"
        setHighlightedHtml(html)
        highlightCache.set(cacheKey, html)
        return
      }

      try {
        const html = await codeToHtml(code, {
          lang: language,
          theme: theme === "light" ? "github-light" : "github-dark",
        })
        setHighlightedHtml(html)
        highlightCache.set(cacheKey, html)

        if (highlightCache.size > 100) {
          const firstKey = highlightCache.keys().next().value
          if (firstKey) highlightCache.delete(firstKey)
        }
      } catch {
        const html = `<pre><code>${code}</code></pre>`
        setHighlightedHtml(html)
        highlightCache.set(cacheKey, html)
      }
    }
    highlight()
  }, [code, language, theme, cacheKey])

  const tv = codeBlockTv()
  const codeClassName = codeBlockCodeTv()

  return (
    <div
      className={tcx(
        "bg-default-background group relative overflow-hidden rounded-lg border",
        className,
      )}
      {...rest}
    >
      <div className={tv.code()}>
        <ScrollArea orientation="both">
          <ScrollArea.Viewport>
            <ScrollArea.Content className={tv.content()}>
              {highlightedHtml ? (
                <div
                  className={codeClassName}
                  dangerouslySetInnerHTML={{ __html: highlightedHtml }}
                />
              ) : (
                <div className={codeClassName}>
                  <pre>
                    <code>{code}</code>
                  </pre>
                </div>
              )}
            </ScrollArea.Content>
          </ScrollArea.Viewport>
        </ScrollArea>
      </div>
    </div>
  )
})
