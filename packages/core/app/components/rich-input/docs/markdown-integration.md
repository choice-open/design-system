# RichInput Markdown Integration

The RichInput component now includes built-in utilities for converting between Slate.js format and Markdown.

## Features

- **Export to Markdown**: Convert RichInput content to standard Markdown format
- **Import from Markdown**: Parse Markdown text and convert it to Slate.js format
- **Comprehensive format support**: Headers, bold, italic, links, lists, code blocks, and more

## Usage

### Export to Markdown

```typescript
import { RichInput, slateToMarkdown } from "@choiceform/design-system"

// Get the current value from RichInput
const handleExport = (value: Descendant[]) => {
  const markdown = slateToMarkdown(value)
  console.log(markdown)

  // Copy to clipboard
  navigator.clipboard.writeText(markdown)
}
```

### Import from Markdown

```typescript
import { RichInput, markdownToSlate } from "@choiceform/design-system"

// Convert markdown to Slate format
const handleImport = (markdownText: string) => {
  const slateValue = markdownToSlate(markdownText)
  // Set the value in your RichInput
  setValue(slateValue)
}
```

## Supported Markdown Syntax

### Text Formatting

- **Bold**: `**text**`
- **Italic**: `*text*`
- **Bold + Italic**: `***text***`
- **Strikethrough**: `~~text~~`
- **Inline Code**: `` `code` ``
- **Underline**: `<u>text</u>` (HTML tag)
- **Links**: `[text](url)`

### Block Elements

- **Headers**: `# H1` through `###### H6`
- **Blockquotes**: `> quote`
- **Code Blocks**: ` ``` code ``` `
- **Unordered Lists**: `- item` or `* item` or `+ item`
- **Ordered Lists**: `1. item`
- **Task Lists**: `- [ ] unchecked` or `- [x] checked`

## Example Component

See the complete example in `/examples/markdown-integration.tsx`:

```tsx
import { useState } from "react"
import { RichInput, slateToMarkdown, markdownToSlate } from "@choiceform/design-system"

export function MarkdownEditor() {
  const [value, setValue] = useState(initialValue)

  const exportMarkdown = () => {
    const md = slateToMarkdown(value)
    navigator.clipboard.writeText(md)
  }

  const importMarkdown = (md: string) => {
    setValue(markdownToSlate(md))
  }

  return (
    <div>
      <RichInput
        value={value}
        onChange={setValue}
      />
      <button onClick={exportMarkdown}>Export</button>
    </div>
  )
}
```

## Notes

- The Markdown parser handles common edge cases and escapes special characters appropriately
- The export function preserves formatting and structure as much as possible
- Some Slate-specific features may not have direct Markdown equivalents
