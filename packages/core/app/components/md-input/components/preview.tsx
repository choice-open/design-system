import { memo } from "react"
import { tcx } from "~/utils"
import { ScrollArea } from "~/components/scroll-area"
import { MarkdownBlock } from "./markdown-block"
import { createMarkdownComponents } from "./markdown-renderers"
import { mdTv } from "./tv"

interface PreviewProps {
  className?: string
  content: string
}

const tv = mdTv()
const components = createMarkdownComponents(tv)

export const Preview = memo(function Preview({ content, className }: PreviewProps) {
  return (
    <ScrollArea className="absolute inset-0">
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <div className={tcx(tv.root(), className)}>
            <MarkdownBlock
              content={content}
              components={components}
            />
          </div>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
    </ScrollArea>
  )
})
