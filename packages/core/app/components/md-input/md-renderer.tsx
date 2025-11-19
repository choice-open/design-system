import { memo } from "react"
import { tcx } from "~/utils"
import { MarkdownBlock, MarkdownThemeProvider, mdTv } from "./components"
import { createMarkdownComponents } from "./components/markdown-renderers"

interface MdRendererProps {
  className?: string
  content: string
  theme?: "light" | "dark"
}

const tv = mdTv()
const components = createMarkdownComponents(tv)

export const MdRenderer = memo(function MdRenderer({
  content,
  className,
  theme = "light",
}: MdRendererProps) {
  return (
    <MarkdownThemeProvider theme={theme}>
      <div className={tcx(tv.root(), className)}>
        <MarkdownBlock
          content={content}
          components={components}
        />
      </div>
    </MarkdownThemeProvider>
  )
})
