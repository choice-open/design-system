# Command

A sophisticated, enterprise-grade command palette component that provides fast search, keyboard navigation, and flexible content organization. Built with performance, accessibility, and extensibility at its core.

## Import

```tsx
import { Command } from "@choiceform/design-system"
```

## Features

- **Advanced Fuzzy Search** - Multi-factor scoring with prefix, word boundary, and substring matching
- **Complete Keyboard Navigation** - Arrow keys, vim bindings, group navigation, and meta shortcuts
- **Compound Architecture** - 10+ sub-components for maximum flexibility
- **Dialog Integration** - Built-in modal mode with focus management
- **Tab Filtering** - Category-based filtering with search preservation
- **Async Support** - Loading states, error handling, and progressive enhancement
- **Virtual Scrolling** - High-performance rendering of large datasets
- **Custom Filtering** - Pluggable filter functions with scoring interface
- **Accessibility First** - ARIA compliance, screen reader support, and keyboard-only navigation
- **Performance Optimized** - Memoization, selective re-renders, and efficient DOM manipulation

## Architecture

### Core Components

- `Command` - Root container with state management
- `Command.Input` - Search input with autocomplete
- `Command.List` - Virtualized scrollable container
- `Command.Item` - Individual selectable items
- `Command.Group` - Categorization with headings
- `Command.Empty` - No results state
- `Command.Loading` - Async loading indicator
- `Command.Divider` - Visual separators
- `Command.Footer` - Action bar/status area
- `Command.Tabs` - Integrated filtering tabs
- `Command.Value` - Display component for values

## Usage

### Basic Structure

```tsx
<Command>
  <Command.Input placeholder="Type a command..." />
  <Command.List>
    <Command.Empty>No results found.</Command.Empty>
    <Command.Group heading="Actions">
      <Command.Item>New File</Command.Item>
      <Command.Item>Open File</Command.Item>
    </Command.Group>
  </Command.List>
</Command>
```

### With Rich Content

```tsx
<Command>
  <Command.Input placeholder="Search..." />
  <Command.List>
    <Command.Group heading="Files">
      <Command.Item
        value="new-file"
        prefixElement={<FileIcon />}
        suffixElement={<Badge>New</Badge>}
        shortcut={{ keys: "N", modifier: "command" }}
      >
        <Command.Value>New File</Command.Value>
      </Command.Item>
    </Command.Group>
  </Command.List>
</Command>
```

### Dialog Mode

```tsx
const [open, setOpen] = useState(false)

<Dialog open={open} onOpenChange={setOpen}>
  <Dialog.Content>
    <Command loop size="large">
      <Command.Input placeholder="Search commands..." />
      <Command.List>
        <Command.Item onSelect={() => setOpen(false)}>
          Action 1
        </Command.Item>
      </Command.List>
    </Command>
  </Dialog.Content>
</Dialog>
```

### With Tabs

```tsx
<Command>
  <Command.Input />
  <Command.Tabs value={activeTab} onChange={setActiveTab}>
    <Command.TabItem value="all">All</Command.TabItem>
    <Command.TabItem value="files">Files</Command.TabItem>
    <Command.TabItem value="actions">Actions</Command.TabItem>
  </Command.Tabs>
  <Command.List>
    {/* Items filtered by active tab */}
  </Command.List>
</Command>
```

### Controlled State

```tsx
const [value, setValue] = useState("")
const [search, setSearch] = useState("")

<Command value={value} onChange={setValue}>
  <Command.Input 
    value={search} 
    onChange={setSearch} 
  />
  <Command.List>
    <Command.Item value="item1">Item 1</Command.Item>
  </Command.List>
</Command>
```

### Async Loading

```tsx
<Command>
  <Command.Input />
  <Command.List>
    {loading && (
      <Command.Loading>
        Fetching results...
      </Command.Loading>
    )}
    
    {error && (
      <Command.Empty>
        Error: {error.message}
      </Command.Empty>
    )}
    
    {data?.map(item => (
      <Command.Item key={item.id} value={item.id}>
        {item.name}
      </Command.Item>
    ))}
  </Command.List>
</Command>
```

### Custom Filtering

```tsx
const customFilter = (value: string, search: string) => {
  if (!search) return 1
  // Custom scoring logic
  return value.toLowerCase().includes(search.toLowerCase()) ? 0.8 : 0
}

<Command filter={customFilter}>
  <Command.Input />
  <Command.List>
    <Command.Item>Custom filtered item</Command.Item>
  </Command.List>
</Command>
```

### With Keywords

```tsx
<Command.Item 
  value="javascript-file"
  keywords={["js", "script", "code", "typescript"]}
>
  app.js
</Command.Item>
```

## Props

### Command (Root)

```ts
interface CommandProps {
  /** Controlled selected value */
  value?: string
  
  /** Default selected value (uncontrolled) */
  defaultValue?: string
  
  /** Selection change handler */
  onChange?: (value: string) => void
  
  /** Custom filter function */
  filter?: (value: string, search: string, keywords?: string[]) => number
  
  /** Enable/disable automatic filtering */
  shouldFilter?: boolean
  
  /** Enable wraparound navigation at boundaries */
  loop?: boolean
  
  /** Disable mouse selection (keyboard only) */
  disablePointerSelection?: boolean
  
  /** Enable vim-style navigation (Ctrl+N/J/P/K) */
  vimBindings?: boolean
  
  /** Size variant */
  size?: "default" | "large"
  
  /** Theme variant */
  variant?: "default" | "dark"
  
  /** Screen reader label */
  label?: string
  
  /** Key handler for global shortcuts */
  onKeyDown?: (event: React.KeyboardEvent) => void
}
```

### Command.Item

```ts
interface CommandItemProps {
  /** Value for selection and filtering */
  value?: string
  
  /** Additional search keywords */
  keywords?: string[]
  
  /** Leading icon or element */
  prefixElement?: ReactNode
  
  /** Trailing element */
  suffixElement?: ReactNode
  
  /** Keyboard shortcut display */
  shortcut?: {
    keys?: ReactNode
    modifier?: KbdKey | KbdKey[]
  }
  
  /** Disable item selection */
  disabled?: boolean
  
  /** Always render (skip filtering) */
  forceMount?: boolean
  
  /** Selection callback */
  onSelect?: (value: string) => void
}
```

### Command.Group

```ts
interface CommandGroupProps {
  /** Group heading */
  heading?: ReactNode
  
  /** Group identifier */
  value?: string
  
  /** Always render (skip filtering) */
  forceMount?: boolean
}
```

### Command.Input

```ts
interface CommandInputProps extends InputProps {
  /** Controlled search value */
  value?: string
  
  /** Search change handler */
  onChange?: (search: string) => void
  
  /** Leading element */
  prefixElement?: ReactNode
  
  /** Trailing element */
  suffixElement?: ReactNode
}
```

### Command.Tabs

```ts
interface CommandTabsProps {
  /** Active tab value */
  value?: string
  
  /** Tab change handler */
  onChange?: (value: string) => void
}
```

## Keyboard Navigation

### Basic Navigation
- `↑` `↓` - Navigate between items
- `Enter` - Select current item
- `Home` - Jump to first item
- `End` - Jump to last item

### Vim Bindings (optional)
- `Ctrl+J` - Next item (same as ↓)
- `Ctrl+K` - Previous item (same as ↑)
- `Ctrl+N` - Next item
- `Ctrl+P` - Previous item

### Advanced Navigation
- `Alt+↑` `Alt+↓` - Navigate between groups
- `Cmd+↑` `Cmd+↓` - Jump to first/last item (Mac)
- `←` `→` - Switch tabs (when tabs are present)

### IME Support
- Full support for Chinese, Japanese, Korean input methods
- Composition events handled correctly
- No interference with typing flow

## Search Algorithm

The component uses a sophisticated fuzzy search algorithm that scores matches based on:

1. **Exact Match** (1.0) - Perfect string match
2. **Prefix Match** (0.9) - Search term at start of value
3. **Word Boundary** (0.8) - Search term at start of any word
4. **Keyword Match** (0.7) - Match in associated keywords
5. **Substring Match** (0.6) - Search term anywhere in value
6. **Fuzzy Match** (0.1-0.5) - Character sequence matching

### Scoring Factors
- Case sensitivity bonus
- Distance between matched characters
- Match position weighting
- Keyword alias support

## Advanced Usage

### Conditional Items

```tsx
const ConditionalItem = ({ children, ...props }) => {
  const search = useCommandState(state => state.search)
  if (!search) return null
  return <Command.Item {...props}>{children}</Command.Item>
}
```

### Nested Navigation

```tsx
const [pages, setPages] = useState([])
const page = pages[pages.length - 1]

<Command onKeyDown={e => {
  if (e.key === 'Escape') {
    setPages(pages => pages.slice(0, -1))
  }
}}>
  {!page && (
    <Command.Item onSelect={() => setPages([...pages, 'projects'])}>
      Browse projects...
    </Command.Item>
  )}
  
  {page === 'projects' && (
    <Command.Group heading="Projects">
      <Command.Item>Project A</Command.Item>
    </Command.Group>
  )}
</Command>
```

### Performance with Large Datasets

```tsx
// For 1000+ items
<Command>
  <Command.Input />
  <Command.List className="max-h-64"> {/* Fixed height enables virtualization */}
    {largeDataset.map(item => (
      <Command.Item key={item.id} value={`${item.name} ${item.description}`}>
        {item.name}
      </Command.Item>
    ))}
  </Command.List>
</Command>
```

## State Management

### Internal State Structure

```ts
interface CommandState {
  search: string           // Current search query
  value: string           // Selected item value
  selectedItemId: string  // DOM id of selected item
  filtered: {
    count: number         // Number of visible items
    items: Map<string, number>  // Item scores
    groups: Set<string>   // Visible groups
  }
}
```

### Custom Hooks

```tsx
import { useCommandState } from "./hooks"

function MyComponent() {
  const search = useCommandState(state => state.search)
  const selectedValue = useCommandState(state => state.value)
  
  // Component logic
}
```

## Best Practices

### Performance
- Use fixed heights on Command.List for virtual scrolling
- Implement custom filter functions for complex logic
- Memoize expensive item content
- Use `forceMount` sparingly

### Accessibility
- Provide meaningful `value` props for all items
- Use semantic group headings
- Include keyboard shortcuts in UI
- Test with screen readers

### UX Guidelines
- Keep search responsive (< 100ms)
- Show loading states for async operations
- Provide empty states with helpful messages
- Use consistent iconography and spacing

### Search Optimization
- Include relevant keywords for better matching
- Use descriptive values that users would expect
- Consider abbreviations and acronyms
- Test search with real user queries

## Styling

The component uses Tailwind Variants with comprehensive slots:

- `root` - Main container
- `input` - Search input styling
- `list` - Scrollable list container
- `item` - Individual items
- `group` - Group containers
- `heading` - Group headings
- `empty` - Empty state
- `loading` - Loading state

Customize with className overrides or modify the theme configuration.

## Examples

### Command Palette

```tsx
function AppCommandPalette() {
  const [open, setOpen] = useState(false)
  
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Content>
        <Command loop vimBindings>
          <Command.Input placeholder="Type a command..." />
          <Command.List>
            <Command.Group heading="File">
              <Command.Item onSelect={() => newFile()}>
                New File
                <Kbd keys="command">N</Kbd>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </Dialog.Content>
    </Dialog>
  )
}
```

### File Browser

```tsx
function FileBrowser({ files }) {
  const [search, setSearch] = useState("")
  
  return (
    <Command shouldFilter={false}>
      <Command.Input 
        value={search}
        onChange={setSearch}
        placeholder="Search files..."
      />
      <Command.List>
        <Command.Group heading="Recent Files">
          {files
            .filter(file => file.name.includes(search))
            .map(file => (
              <Command.Item key={file.id} value={file.id}>
                <FileIcon type={file.type} />
                <div>
                  <div>{file.name}</div>
                  <div className="text-sm text-gray-500">
                    {file.size} • {file.modified}
                  </div>
                </div>
              </Command.Item>
            ))}
        </Command.Group>
      </Command.List>
    </Command>
  )
}
```

## Technical Notes

- Built on React 18+ with concurrent features
- Uses `useSyncExternalStore` for optimal performance
- Implements proper focus management and restoration
- ResizeObserver integration for responsive behavior
- Supports server-side rendering with hydration safety
- Extensive TypeScript coverage with strict types