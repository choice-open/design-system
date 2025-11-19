# MD-Input Component

A production-ready markdown editor with GitHub Flavored Markdown (GFM) support.

## Features

- ✅ Full GFM support (headings, lists, tables, code blocks, etc.)
- ✅ Syntax highlighting with Shiki
- ✅ Write/Preview tabs
- ✅ Keyboard shortcuts (Cmd+B, Cmd+I, etc.)
- ✅ Dark/Light theme support
- ✅ Math equations (KaTeX)
- ✅ XSS protection (harden-react-markdown)
- ✅ Task lists with checkboxes
- ✅ Optimized performance with caching

## Components

### MdInput

Full markdown editor with toolbar and preview.

```tsx
import { MdInput } from "@choiceform/design-system"

function MyEditor() {
  const [value, setValue] = useState("")
  
  return (
    <MdInput
      value={value}
      onChange={setValue}
      placeholder="Enter markdown..."
      theme="light"
    />
  )
}
```

### MarkdownRenderer

Standalone markdown renderer for displaying markdown content.

```tsx
import { MarkdownRenderer } from "@choiceform/design-system"

function MyMarkdownDisplay() {
  return (
    <MarkdownRenderer
      content="# Hello\n\nThis is **markdown**"
      theme="light"
    />
  )
}
```

## Usage Examples

### Basic Editor

```tsx
<MdInput
  value={content}
  onChange={setContent}
  placeholder="Write something..."
/>
```

### Without Preview

```tsx
<MdInput
  value={content}
  onChange={setContent}
  showPreview={false}
/>
```

### Read-Only Display

```tsx
<MarkdownRenderer
  content={markdownContent}
  theme="dark"
  className="p-4"
/>
```

### With Dark Theme

```tsx
<MdInput
  value={content}
  onChange={setContent}
  theme="dark"
/>
```

### Custom Configuration

```tsx
<MdInput
  value={content}
  onChange={setContent}
  minRows={10}
  maxRows={30}
  showToolbar={true}
  showPreview={true}
  i18n={{
    write: "Edit",
    preview: "Preview"
  }}
/>
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+B` | Bold |
| `Cmd+I` | Italic |
| `Cmd+K` | Insert link |
| `Cmd+\`` | Inline code |
| `Cmd+Shift+\`` | Code block |
| `Cmd+Shift+.` | Blockquote |
| `Cmd+1-6` | Heading level |

## API

### MdInput Props

```typescript
interface MdInputProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  showToolbar?: boolean
  showPreview?: boolean
  theme?: "light" | "dark"
  minRows?: number
  maxRows?: number
  i18n?: {
    write: string
    preview: string
  }
}
```

### MarkdownRenderer Props

```typescript
interface MarkdownRendererProps {
  content: string
  theme?: "light" | "dark"
  className?: string
}
```

## Toolbar Actions

```tsx
import { TOOLBAR_ACTIONS } from "@choiceform/design-system"

// Available actions:
// - heading
// - bold
// - italic
// - quote
// - code
// - link
// - unordered-list
// - ordered-list
// - task-list
// - code-block
```

## Advanced Usage

### Custom Markdown Components

```tsx
import { createMarkdownComponents, MarkdownBlock } from "@choiceform/design-system"

const customComponents = createMarkdownComponents(tv)
// Customize renderers as needed

<MarkdownBlock
  content={markdown}
  components={customComponents}
/>
```

### Theme Context

```tsx
import { MarkdownThemeProvider, useMarkdownTheme } from "@choiceform/design-system"

function App() {
  return (
    <MarkdownThemeProvider theme="dark">
      <YourComponent />
    </MarkdownThemeProvider>
  )
}

function YourComponent() {
  const theme = useMarkdownTheme() // "dark"
  return <div>Current theme: {theme}</div>
}
```

## Performance

- Code highlighting is cached (up to 100 entries)
- Toolbar icons are created once at module level
- Preview components are memoized
- Optimized re-renders with React.memo

## Security

- XSS protection via `harden-react-markdown`
- Allowed link prefixes: `https://`, `http://`, `#`, `mailto:`
- Allowed image prefixes: `https://`, `http://`, `data:image/`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- `react-markdown` - Markdown parsing and rendering
- `remark-gfm` - GitHub Flavored Markdown
- `remark-math` / `rehype-katex` - Math equations
- `shiki` - Syntax highlighting
- `harden-react-markdown` - Security hardening

## License

MIT

