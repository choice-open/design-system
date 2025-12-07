# MD-Input Component

A production-ready markdown editor with GitHub Flavored Markdown (GFM) support, built with compound component pattern for maximum flexibility.

## Features

- ✅ Full GFM support (headings, lists, tables, code blocks, etc.)
- ✅ Syntax highlighting with Shiki
- ✅ Write/Preview tabs
- ✅ Keyboard shortcuts (Cmd+B, Cmd+I, etc.)
- ✅ Dark/Light theme support
- ✅ Math equations (KaTeX)
- ✅ XSS protection (harden-react-markdown)
- ✅ Task lists with checkboxes
- ✅ @Mention support with autocomplete
- ✅ Optimized performance with caching
- ✅ Compound component pattern for flexible composition

## Component Architecture

The `MdInput` component uses a compound component pattern, allowing you to compose the editor layout as needed:

- `MdInput.Header` - Header container for tabs and toolbar
- `MdInput.Tabs` - Write/Preview tab switcher
- `MdInput.Toolbar` - Formatting toolbar
- `MdInput.Container` - Main content container (handles mentions popup)
- `MdInput.Editor` - Textarea editor component
- `MdInput.Render` - Markdown preview renderer
- `MdInput.Footer` - Footer container

## Basic Usage

### Full Editor with Tabs and Toolbar

```tsx
import { MdInput } from "@choice-ui/react"

function MyEditor() {
  const [value, setValue] = useState("")

  return (
    <MdInput
      value={value}
      onChange={setValue}
    >
      <MdInput.Header>
        <MdInput.Tabs />
        <MdInput.Toolbar />
      </MdInput.Header>
      <MdInput.Container>
        <MdInput.Editor placeholder="Enter markdown..." />
        <MdInput.Render />
      </MdInput.Container>
    </MdInput>
  )
}
```

### Without Preview Tab

```tsx
<MdInput
  value={value}
  onChange={setValue}
>
  <MdInput.Header>
    <MdInput.Toolbar />
  </MdInput.Header>
  <MdInput.Container>
    <MdInput.Editor />
  </MdInput.Container>
</MdInput>
```

### Only Preview (Read-Only Display)

```tsx
<MdInput value={markdownContent}>
  <MdInput.Render />
</MdInput>
```

### Without Toolbar

```tsx
<MdInput
  value={value}
  onChange={setValue}
>
  <MdInput.Header>
    <MdInput.Tabs />
  </MdInput.Header>
  <MdInput.Container>
    <MdInput.Editor />
    <MdInput.Render />
  </MdInput.Container>
</MdInput>
```

## Mentions Feature

The component supports @mention functionality with autocomplete and filtering.

### Basic Mentions

```tsx
const mentionItems = [
  { id: "1", label: "John Doe" },
  { id: "2", label: "Jane Smith" },
  { id: "3", label: "Bob Johnson" },
]

<MdInput
  value={value}
  onChange={setValue}
  mentionItems={mentionItems}
>
  <MdInput.Header>
    <MdInput.Tabs />
    <MdInput.Toolbar />
  </MdInput.Header>
  <MdInput.Container>
    <MdInput.Editor placeholder="Type @ to mention someone..." />
    <MdInput.Render />
  </MdInput.Container>
</MdInput>
```

### Custom Mention Format

```tsx
const handleMentionSelect = (item: MentionItemProps, query: string) => {
  return `[@${item.label}](mailto:${item.email || ""}) `
}

;<MdInput
  value={value}
  onChange={setValue}
  mentionItems={mentionItems}
  mentionOnSelect={handleMentionSelect}
>
  {/* ... */}
</MdInput>
```

### Custom Mention Rendering

```tsx
const CustomMention = ({ mention }: MentionRenderProps) => {
  const user = mentionItems.find((item) => item.label === mention)
  return (
    <span className="bg-accent text-accent-foreground inline-flex items-center rounded px-1.5 py-0.5">
      @{mention}
    </span>
  )
}

;<MdInput
  value={value}
  onChange={setValue}
  mentionItems={mentionItems}
  mentionRenderComponent={CustomMention}
>
  {/* ... */}
</MdInput>
```

## Keyboard Shortcuts

| Shortcut       | Action                         |
| -------------- | ------------------------------ |
| `Cmd+B`        | Bold                           |
| `Cmd+I`        | Italic                         |
| `Cmd+K`        | Insert link                    |
| `Cmd+\``       | Inline code                    |
| `Cmd+Shift+\`` | Code block                     |
| `Cmd+Shift+.`  | Blockquote                     |
| `Cmd+1-6`      | Heading level                  |
| `Escape`       | Close mention menu (when open) |

## API

### MdInput Props

```typescript
interface MdInputProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "children"> {
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  readOnly?: boolean
  theme?: "light" | "dark"
  mentionItems?: MentionItemProps[]
  mentionOnSelect?: (item: MentionItemProps, query: string) => string
  mentionRenderComponent?: React.ComponentType<MentionRenderProps>
  allowedPrefixes?: string[]
  children: React.ReactNode // Required - must use compound components
}
```

### MdInput.Header Props

```typescript
interface MdInputHeaderProps {
  children?: React.ReactNode
  className?: string
}
```

### MdInput.Tabs Props

```typescript
interface MdInputTabsProps {
  className?: string
  i18n?: {
    preview: string
    write: string
  }
}
```

### MdInput.Toolbar Props

```typescript
interface ToolbarProps {
  groups?: ToolbarAction[][]
  visibleActions?: string[]
  visible?: boolean
  disabled?: boolean
  onAction?: (action: string) => void
  beforeElement?: React.ReactNode
  afterElement?: React.ReactNode
  children?: React.ReactNode
  className?: string
  i18n?: {
    heading: string
    bold: string
    italic: string
    quote: string
    code: string
    "code-block": string
    "unordered-list": string
    "ordered-list": string
    "task-list": string
  }
}
```

### MdInput.Container Props

```typescript
interface MdInputContainerProps {
  children?: React.ReactNode
  className?: string
}
```

### MdInput.Editor Props

```typescript
interface MdInputEditorProps extends Omit<TextareaProps, "value" | "onChange"> {
  className?: string
  minRows?: number
  maxRows?: number
  placeholder?: string
}
```

### MdInput.Render Props

```typescript
interface MdInputRenderProps {
  className?: string
  withScrollArea?: boolean
}
```

### MdInput.Footer Props

```typescript
interface MdInputFooterProps {
  children?: React.ReactNode
  className?: string
}
```

### Types

```typescript
interface MentionItemProps {
  id: string
  label: string
  [key: string]: unknown // Additional properties allowed
}

interface MentionRenderProps {
  mention: string
  mentionItems?: MentionItemProps[]
}
```

## Advanced Usage

### Custom Toolbar Actions

```tsx
import type { ToolbarAction } from "@choice-ui/react"

const customGroups: ToolbarAction[][] = [
  [
    { id: "heading", label: "Heading", icon: <ParagraphHeading /> },
    { id: "bold", label: "Bold", icon: <FontBoldSmall /> },
  ],
]

<MdInput value={value} onChange={setValue}>
  <MdInput.Header>
    <MdInput.Tabs />
    <MdInput.Toolbar groups={customGroups} />
  </MdInput.Header>
  {/* ... */}
</MdInput>
```

### Filtered Toolbar Actions

```tsx
<MdInput.Toolbar visibleActions={["bold", "italic", "code"]} />
```

### Custom Layout

```tsx
<MdInput
  value={value}
  onChange={setValue}
>
  <MdInput.Header>
    <MdInput.Toolbar />
    <MdInput.Tabs />
  </MdInput.Header>
  <MdInput.Container>
    <MdInput.Editor />
    <MdInput.Render />
  </MdInput.Container>
  <MdInput.Footer>
    <div className="text-muted-foreground text-xs">Markdown supported</div>
  </MdInput.Footer>
</MdInput>
```

### Toolbar in Footer

```tsx
<MdInput
  value={value}
  onChange={setValue}
>
  <MdInput.Header>
    <MdInput.Tabs />
  </MdInput.Header>
  <MdInput.Container>
    <MdInput.Editor />
    <MdInput.Render />
  </MdInput.Container>
  <MdInput.Footer>
    <MdInput.Toolbar />
  </MdInput.Footer>
</MdInput>
```

### Using Context API

```tsx
import { useMdInputContext } from "@choice-ui/react"

function CustomComponent() {
  const { value, onChange, activeTab, setActiveTab, insertText, wrapText, insertListPrefix } =
    useMdInputContext()

  // Use context values...
}
```

## Default Toolbar Actions

The default toolbar includes these action groups:

**Group 1:**

- `heading` - Insert heading
- `bold` - Bold text
- `italic` - Italic text

**Group 2:**

- `quote` - Blockquote
- `code` - Inline code
- `code-block` - Code block

**Group 3:**

- `unordered-list` - Unordered list
- `ordered-list` - Ordered list
- `task-list` - Task list

## Performance

- Code highlighting is cached (up to 100 entries)
- Toolbar icons are created once at module level
- Preview components are memoized
- Optimized re-renders with React.memo
- Mention state updates are optimized to prevent unnecessary re-renders

## Security

- XSS protection via `harden-react-markdown`
- Allowed link prefixes: `https://`, `http://`, `#`, `mailto:` (configurable via `allowedPrefixes`)
- Allowed image prefixes: `https://`, `http://`, `data:image/` (configurable via `allowedPrefixes`)

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
