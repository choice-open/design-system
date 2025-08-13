# Combobox

A searchable dropdown component that combines a text input with a list of selectable options. It supports keyboard navigation, customizable triggers, and both controlled and uncontrolled states. Can be used in input mode (default) or coordinate mode for context menus.

## Import

```tsx
import { Combobox } from "@choiceform/design-system"
import { useState, useMemo } from "react"
```

## Features

- Text input with dropdown list for searching and selecting options
- Two trigger modes: input (default) and coordinate (for positioning at specific coordinates)
- Keyboard navigation with arrow keys and Enter to select
- Controlled and uncontrolled state management
- Auto-selection of first item (configurable)
- Clear button support
- Customizable trigger with prefix/suffix elements
- Virtual scrolling for performance with large lists
- Floating UI integration for smart positioning
- Accessible with proper ARIA attributes
- Support for disabled state and read-only mode

## Usage

### Basic

```tsx
const [value, setValue] = useState("")
const [triggerType, setTriggerType] = useState<"click" | "focus" | "input">("input")

const itemsToShow = useMemo(() => {
  if (triggerType === "click") {
    // Click trigger shows all items
    return fruits
  }
  if (!value.trim()) {
    return []
  }
  // Input or focus shows filtered items
  return fruits.filter(fruit => 
    fruit.toLowerCase().startsWith(value.toLowerCase())
  )
}, [value, triggerType])

const handleOpenChange = (open: boolean, trigger: "click" | "focus" | "input" = "input") => {
  if (open) {
    setTriggerType(trigger)
  }
}

<Combobox 
  value={value} 
  onChange={setValue}
  onOpenChange={handleOpenChange}
>
  <Combobox.Trigger placeholder="Search fruits..." />
  {itemsToShow.length > 0 && (
    <Combobox.Content>
      <Combobox.Label>Fruits</Combobox.Label>
      {itemsToShow.map(fruit => (
        <Combobox.Item key={fruit} onClick={() => setValue(fruit)}>
          <Combobox.Value>{fruit}</Combobox.Value>
        </Combobox.Item>
      ))}
    </Combobox.Content>
  )}
</Combobox>
```

### With Clear Button

```tsx
const [value, setValue] = useState("")

const filteredFruits = useMemo(() => {
  if (!value.trim()) return []
  return fruits.filter(fruit => 
    fruit.toLowerCase().startsWith(value.toLowerCase())
  )
}, [value])

<Combobox value={value} onChange={setValue}>
  <Combobox.Trigger
    placeholder="Search fruits..."
    showClear
  />
  {filteredFruits.length > 0 && (
    <Combobox.Content>
      <Combobox.Label>Fruits</Combobox.Label>
      {filteredFruits.map(fruit => (
        <Combobox.Item key={fruit} onClick={() => setValue(fruit)}>
          <Combobox.Value>{fruit}</Combobox.Value>
        </Combobox.Item>
      ))}
    </Combobox.Content>
  )}
</Combobox>
```

### Large Size

```tsx
<Combobox value={value} onChange={setValue}>
  <Combobox.Trigger
    placeholder="Search fruits..."
    size="large"
  />
  <Combobox.Content>
    <Combobox.Label>Fruits</Combobox.Label>
    {filteredFruits.map(fruit => (
      <Combobox.Item
        key={fruit}
        size="large"
        onClick={() => setValue(fruit)}
      >
        <Combobox.Value>{fruit}</Combobox.Value>
      </Combobox.Item>
    ))}
  </Combobox.Content>
</Combobox>
```

### Custom Width

```tsx
<Combobox
  value={value}
  onChange={setValue}
  matchTriggerWidth={false}
>
  <Combobox.Trigger placeholder="Fruit..." />
  <Combobox.Content className="w-80">
    <Combobox.Label>Available Fruits (Custom Width)</Combobox.Label>
    {filteredFruits.map(fruit => (
      <Combobox.Item key={fruit} onClick={() => setValue(fruit)}>
        <Combobox.Value>{fruit}</Combobox.Value>
      </Combobox.Item>
    ))}
  </Combobox.Content>
</Combobox>
```

### With Custom Icons and Rich Items

```tsx
import { SearchSmall, ChevronDownSmall } from "@choiceform/icons-react"

const [value, setValue] = useState("")
const users = [
  { id: "1", name: "John Doe", role: "Developer", avatar: "..." },
  { id: "2", name: "Jane Smith", role: "Designer", avatar: "..." },
]

const filteredUsers = useMemo(() => {
  if (!value.trim()) return []
  return users.filter(user => 
    user.name.toLowerCase().includes(value.toLowerCase())
  )
}, [value])

<Combobox value={value} onChange={setValue}>
  <Combobox.Trigger
    placeholder="Search users..."
    prefixElement={<SearchSmall />}
    suffixElement={<ChevronDownSmall />}
  />
  {filteredUsers.length > 0 && (
    <Combobox.Content>
      <Combobox.Label>Users</Combobox.Label>
      {filteredUsers.map(user => (
        <Combobox.Item 
          key={user.id} 
          onClick={() => setValue(user.name)}
          prefixElement={<img src={user.avatar} className="size-4 rounded-full" />}
          suffixElement={<span className="text-sm text-white/60">{user.role}</span>}
        >
          <Combobox.Value>{user.name}</Combobox.Value>
        </Combobox.Item>
      ))}
    </Combobox.Content>
  )}
</Combobox>
```

### Coordinate Mode (for mentions/autocomplete)

```tsx
<Combobox
  trigger="coordinate"
  position={position}
  value={query}
  onChange={setQuery}
  open={isOpen}
  onOpenChange={setIsOpen}
  placement="bottom-start"
  autoSelection={true}
>
  <Combobox.Content>
    <Combobox.Label>Select User</Combobox.Label>
    {filteredUsers.map(user => (
      <Combobox.Item
        key={user.id}
        onClick={() => selectUser(user)}
      >
        <img src={user.avatar} className="size-4 rounded-full" />
        <Combobox.Value>{user.name}</Combobox.Value>
      </Combobox.Item>
    ))}
  </Combobox.Content>
</Combobox>
```

## Props

### Combobox

```ts
interface ComboboxProps {
  /** Whether to automatically select the first item when filtering */
  autoSelection?: boolean

  /** Child components (Trigger and Content) */
  children?: React.ReactNode

  /** Whether the combobox is disabled */
  disabled?: boolean

  /** Props passed to the FloatingFocusManager */
  focusManagerProps?: FloatingFocusManagerProps

  /** Whether dropdown should match trigger width */
  matchTriggerWidth?: boolean

  /** Callback when input loses focus */
  onBlur?: (value: string) => void

  /** Callback when input value changes */
  onChange?: (value: string) => void

  /** Callback when open state changes */
  onOpenChange?: (open: boolean, trigger?: "click" | "focus" | "input") => void

  /** Controlled open state */
  open?: boolean

  /** Dropdown placement relative to trigger */
  placement?: Placement

  /** ID of the portal root element */
  portalId?: string

  /** Position for coordinate mode */
  position?: { x: number; y: number } | null

  /** Trigger mode: "input" (default) or "coordinate" */
  trigger?: "input" | "coordinate"

  /** Current input value */
  value?: string
}
```

### ComboboxTrigger

```ts
interface ComboboxTriggerProps extends Omit<HTMLProps<HTMLInputElement>, "size" | "onChange"> {
  /** Whether the dropdown is open */
  active?: boolean

  /** Whether the trigger is disabled */
  disabled?: boolean

  /** Internationalization strings */
  i18n?: {
    clear: string
    placeholder: string
  }

  /** Whether there's no matching option */
  noMatch?: boolean

  /** Callback when value changes */
  onChange?: (value: string) => void

  /** Callback when trigger is clicked */
  onClick?: () => void

  /** Input placeholder text */
  placeholder?: string

  /** Element to show before input */
  prefixElement?: ReactNode

  /** Whether to show clear button when value exists */
  showClear?: boolean

  /** Trigger size variant */
  size?: "default" | "large"

  /** Element to show after input */
  suffixElement?: ReactNode

  /** Current input value */
  value?: string

  /** Visual style variant */
  variant?: "default" | "dark" | "reset"
}

interface ComboboxItemProps {
  /** Item content */
  children?: React.ReactNode
  
  /** Whether the item is disabled */
  disabled?: boolean
  
  /** Click handler */
  onClick?: () => void
  
  /** Element to show before content */
  prefixElement?: React.ReactNode
  
  /** Item size variant */
  size?: "default" | "large"
  
  /** Element to show after content */
  suffixElement?: React.ReactNode
  
  /** Value for the item */
  value?: string
}
```

## Styling

- Uses Tailwind CSS via `tailwind-variants` for the trigger component
- The dropdown content uses the shared Menu component styles
- Customize using the `className` prop on individual components
- Trigger variants available: `default`, `dark`, `reset`
- Trigger sizes available: `default`, `large`

## Best practices

- Use descriptive placeholders to guide users
- Implement filtering logic to show relevant options based on input
- Consider using `autoSelection` for better keyboard navigation
- Provide clear button for easy value clearing
- Use sections and labels to organize long option lists
- Handle empty states when no options match the search
- Consider debouncing for async data fetching

## Accessibility

- Proper ARIA attributes for combobox pattern
- Keyboard navigation with arrow keys, Enter, and Escape
- Screen reader announcements for option selection
- Focus management when opening/closing dropdown
- Supports standard form keyboard shortcuts

## Examples

### Async Search

```tsx
const [value, setValue] = useState("")
const [options, setOptions] = useState([])
const [loading, setLoading] = useState(false)

const handleSearch = async (query: string) => {
  setValue(query)
  if (!query.trim()) {
    setOptions([])
    return
  }
  
  setLoading(true)
  try {
    const results = await searchAPI(query)
    setOptions(results)
  } finally {
    setLoading(false)
  }
}

<Combobox value={value} onChange={handleSearch}>
  <Combobox.Trigger placeholder="Search users..." />
  <Combobox.Content>
    {loading ? (
      <div className="p-4 text-center text-white/50">Loading...</div>
    ) : options.length > 0 ? (
      <>
        <Combobox.Label>Search Results</Combobox.Label>
        {options.map(user => (
          <Combobox.Item 
            key={user.id} 
            onClick={() => setValue(user.name)}
          >
            <Combobox.Value>{user.name}</Combobox.Value>
          </Combobox.Item>
        ))}
      </>
    ) : value.trim() ? (
      <div className="p-4 text-center text-white/50">
        No results found for "{value}"
      </div>
    ) : null}
  </Combobox.Content>
</Combobox>
```

### With form integration

```tsx
<form onSubmit={handleSubmit}>
  <Combobox
    value={formData.category}
    onChange={(value) => setFormData({ ...formData, category: value })}
  >
    <Combobox.Trigger
      placeholder="Select category..."
      required
      name="category"
    />
    <Combobox.Content>
      {categories.map((cat) => (
        <Combobox.Item
          key={cat.id}
          value={cat.id}
        >
          {cat.name}
        </Combobox.Item>
      ))}
    </Combobox.Content>
  </Combobox>
</form>
```

## Notes

- The component uses Floating UI for positioning and auto-updates
- In coordinate mode, the trigger is not rendered and positioning is manual
- Virtual scrolling is enabled for performance with large lists
- The dropdown portal renders outside the DOM hierarchy by default
- Focus is managed automatically when opening/closing
