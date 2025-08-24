# Select

A high-performance dropdown selection component with macOS-style positioning that displays the selected item near the trigger for enhanced user experience. Built with floating UI and comprehensive accessibility support.

## Import

```tsx
import { Select } from "@choiceform/design-system"
```

## Features

- **macOS-Style Positioning**: Uses inner middleware to show selected item near trigger
- **Enhanced Performance**: Optimized rendering with proper ref management and memoization
- **Keyboard Navigation**: Full arrow key navigation and typeahead search
- **Accessibility**: Complete ARIA support with proper roles and attributes
- **Flexible Content**: Support for icons, labels, dividers, and complex layouts
- **Size Variants**: Default and large size options
- **Disabled States**: Global and individual item disable support
- **Custom Actions**: Support for custom click handlers on menu items
- **Placement Control**: Multiple placement options with automatic fallback
- **Match Trigger Width**: Optional width matching for consistent layouts
- **Compound Pattern**: Clean composition using sub-components

## Usage

### Basic Select

```tsx
function BasicExample() {
  const [value, setValue] = useState("option-2")

  return (
    <Select
      value={value}
      onChange={setValue}
    >
      <Select.Trigger>
        <Select.Value>{value || "Select an option..."}</Select.Value>
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="option-1">
          <Select.Value>Option 1</Select.Value>
        </Select.Item>
        <Select.Item value="option-2">
          <Select.Value>Option 2</Select.Value>
        </Select.Item>
        <Select.Item value="option-3">
          <Select.Value>Option 3</Select.Value>
        </Select.Item>
      </Select.Content>
    </Select>
  )
}
```

### Disabled Select

```tsx
<Select
  disabled
  value={value}
  onChange={setValue}
>
  <Select.Trigger>
    <Select.Value>{value || "Select an option..."}</Select.Value>
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="option-1">
      <Select.Value>Option 1</Select.Value>
    </Select.Item>
  </Select.Content>
</Select>
```

### Disabled Options

```tsx
<Select
  value={value}
  onChange={setValue}
>
  <Select.Trigger>
    <Select.Value>{value || "Select an option..."}</Select.Value>
  </Select.Trigger>
  <Select.Content>
    <Select.Item
      value="option-1"
      disabled
    >
      <Select.Value>Option 1 (Disabled)</Select.Value>
    </Select.Item>
    <Select.Item value="option-2">
      <Select.Value>Option 2</Select.Value>
    </Select.Item>
  </Select.Content>
</Select>
```

### With Dividers and Labels

```tsx
<Select
  value={value}
  onChange={setValue}
>
  <Select.Trigger>
    <Select.Value>{value || "Select a plan..."}</Select.Value>
  </Select.Trigger>
  <Select.Content>
    <Select.Label>Basic Plans</Select.Label>
    <Select.Item value="basic-1">
      <Select.Value>Basic - Starter</Select.Value>
    </Select.Item>
    <Select.Item value="basic-2">
      <Select.Value>Basic - Professional</Select.Value>
    </Select.Item>

    <Select.Divider />

    <Select.Label>Premium Plans</Select.Label>
    <Select.Item value="premium-1">
      <Select.Value>Premium - Business</Select.Value>
    </Select.Item>
    <Select.Item value="premium-2">
      <Select.Value>Premium - Enterprise</Select.Value>
    </Select.Item>
  </Select.Content>
</Select>
```

### With Icons

```tsx
<Select
  value={value}
  onChange={setValue}
>
  <Select.Trigger>
    <Select.Value>{value || "Select field type..."}</Select.Value>
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="attachment">
      <FieldTypeAttachment />
      <Select.Value>Attachment Field</Select.Value>
    </Select.Item>
    <Select.Item value="checkbox">
      <FieldTypeCheckbox />
      <Select.Value>Checkbox Field</Select.Value>
    </Select.Item>
    <Select.Item value="count">
      <FieldTypeCount />
      <Select.Value>Count Field</Select.Value>
    </Select.Item>
  </Select.Content>
</Select>
```

### Large Size

```tsx
<Select
  size="large"
  value={value}
  onChange={setValue}
>
  <Select.Trigger
    prefixElement={<Settings />}
    className="w-48"
  >
    <Select.Value>{value ? "Selected Option" : "Select..."}</Select.Value>
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="option-1">
      <Select.Value>Option 1</Select.Value>
    </Select.Item>
  </Select.Content>
</Select>
```

### Match Trigger Width

```tsx
<Select
  value={value}
  onChange={setValue}
  matchTriggerWidth
>
  <Select.Trigger className="w-80">
    <Select.Value>{value ? "Selected" : "Select..."}</Select.Value>
  </Select.Trigger>
  <Select.Content>
    <Select.Label>Options</Select.Label>
    {options.map((option) => (
      <Select.Item
        key={option.value}
        value={option.value}
      >
        <Select.Value>{option.label}</Select.Value>
      </Select.Item>
    ))}
  </Select.Content>
</Select>
```

### Different Placements

```tsx
<Select placement="bottom-start" value={value} onChange={setValue}>
  <Select.Trigger>
    <Select.Value>Bottom Start</Select.Value>
  </Select.Trigger>
  <Select.Content>
    {/* Options */}
  </Select.Content>
</Select>

<Select placement="bottom-end" value={value} onChange={setValue}>
  <Select.Trigger>
    <Select.Value>Bottom End</Select.Value>
  </Select.Trigger>
  <Select.Content>
    {/* Options */}
  </Select.Content>
</Select>
```

### Custom Actions

```tsx
<Select
  value={value}
  onChange={setValue}
>
  <Select.Trigger>
    <Select.Value>{value || "Select..."}</Select.Value>
  </Select.Trigger>
  <Select.Content>
    <Select.Label>Options</Select.Label>
    <Select.Item value="option-1">
      <Select.Value>Option 1</Select.Value>
    </Select.Item>

    <Select.Divider />

    <Select.Label>Actions</Select.Label>
    <Select.Item onClick={() => console.log("Custom action!")}>
      <Settings />
      <Select.Value>Open Settings</Select.Value>
    </Select.Item>
  </Select.Content>
</Select>
```

## Props

### Select Props

```ts
interface SelectProps {
  /** Child components (Select.Trigger and Select.Content required) */
  children?: React.ReactNode

  /** Additional CSS class names */
  className?: string

  /** Whether the select is disabled */
  disabled?: boolean

  /** Floating focus manager configuration */
  focusManagerProps?: Partial<FloatingFocusManagerProps>

  /** Whether dropdown should match trigger width */
  matchTriggerWidth?: boolean

  /** Callback fired when selection changes */
  onChange?: (value: string) => void

  /** Callback fired when open state changes */
  onOpenChange?: (open: boolean) => void

  /** Controlled open state */
  open?: boolean

  /** Dropdown placement relative to trigger */
  placement?: "bottom-start" | "bottom-end"

  /** Portal container ID for rendering dropdown */
  portalId?: string

  /** Size variant affecting trigger and items */
  size?: "default" | "large"

  /** Currently selected value */
  value?: string | null
}
```

- Defaults:
  - `disabled`: false
  - `matchTriggerWidth`: false
  - `placement`: "bottom-start"
  - `portalId`: "floating-menu-root"
  - `size`: "default"
  - `focusManagerProps`: `{ returnFocus: false, modal: true }`

## Sub-components

- **Select.Trigger**: Clickable trigger element that opens the dropdown
- **Select.Content**: Container for dropdown content with built-in scrolling
- **Select.Item**: Individual selectable option with support for custom actions
- **Select.Value**: Text content for options and trigger display
- **Select.Label**: Non-selectable label for grouping options
- **Select.Divider**: Visual separator between option groups

## Advanced Usage

### Long Lists with Performance

```tsx
function LongListExample() {
  const [value, setValue] = useState("item-25")

  const options = useMemo(
    () =>
      Array.from({ length: 100 }, (_, i) => ({
        value: `item-${i + 1}`,
        label: `City ${i + 1}`,
      })),
    [],
  )

  return (
    <Select
      value={value}
      onChange={setValue}
    >
      <Select.Trigger>
        <Select.Value>
          {value ? options.find((opt) => opt.value === value)?.label : "Select a city..."}
        </Select.Value>
      </Select.Trigger>
      <Select.Content>
        <Select.Label>Cities ({options.length} total)</Select.Label>
        {options.map((option) => (
          <Select.Item
            key={option.value}
            value={option.value}
          >
            <Select.Value>{option.label}</Select.Value>
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  )
}
```

### Complex Data with Multiple Actions

```tsx
function TaskManagement() {
  const [status, setStatus] = useState("active")
  const [priority, setPriority] = useState("medium")

  const statusOptions = [
    { value: "active", label: "Active", color: "bg-green-500" },
    { value: "pending", label: "Pending", color: "bg-yellow-500" },
    { value: "completed", label: "Completed", color: "bg-blue-500" },
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label>Status</label>
        <Select
          value={status}
          onChange={setStatus}
        >
          <Select.Trigger className="w-full">
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${statusOptions.find((opt) => opt.value === status)?.color}`}
              />
              <Select.Value>
                {statusOptions.find((opt) => opt.value === status)?.label}
              </Select.Value>
            </div>
          </Select.Trigger>
          <Select.Content>
            <Select.Label>Task Status</Select.Label>
            {statusOptions.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
              >
                <div className={`h-2 w-2 rounded-full ${option.color}`} />
                <Select.Value>{option.label}</Select.Value>
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </div>

      <div>
        <label>Priority</label>
        <Select
          value={priority}
          onChange={setPriority}
        >
          <Select.Trigger className="w-full">
            <Select.Value>
              {priority === "high" ? "🔥 High" : priority === "medium" ? "⚡ Medium" : "📋 Low"}
            </Select.Value>
          </Select.Trigger>
          <Select.Content>
            <Select.Label>Priority Level</Select.Label>
            <Select.Item value="low">
              <span>📋</span>
              <Select.Value>Low Priority</Select.Value>
            </Select.Item>
            <Select.Item value="medium">
              <span>⚡</span>
              <Select.Value>Medium Priority</Select.Value>
            </Select.Item>
            <Select.Item value="high">
              <span>🔥</span>
              <Select.Value>High Priority</Select.Value>
            </Select.Item>
          </Select.Content>
        </Select>
      </div>
    </div>
  )
}
```

## Styling

- Uses Tailwind CSS via `tailwind-variants` in `tv.ts`
- Inherits styling from MenuContext system
- Customize using `className` prop on individual components
- Supports responsive design patterns
- Built-in dark mode support

## macOS-Style Positioning

The Select component uses advanced positioning logic:

1. **Inner Positioning**: Selected item appears near the trigger
2. **Fallback System**: Automatically falls back to standard dropdown if inner positioning fails
3. **Scroll Optimization**: Maintains position during scrolling
4. **Touch Support**: Optimized behavior for touch devices

## Accessibility

- **ARIA Compliance**: Full ARIA listbox implementation
- **Keyboard Navigation**: Arrow keys, Home/End, typeahead search
- **Screen Reader Support**: Proper announcement of state changes
- **Focus Management**: Logical focus flow and restoration
- **Disabled State Handling**: Proper disabled state communication

### Keyboard Shortcuts

- **Arrow Keys**: Navigate through options
- **Home/End**: Jump to first/last option
- **Enter/Space**: Select highlighted option
- **Escape**: Close dropdown
- **Tab**: Move focus away from select
- **Type to Search**: Typeahead search through options

## Best Practices

### Content Organization

- Group related options with labels and dividers
- Keep option text concise and descriptive
- Use icons consistently across similar option types
- Provide meaningful default values or placeholders

### Performance

- Use `useMemo` for expensive option computations
- Avoid recreating option arrays on each render
- Consider virtualization for very long lists (100+ items)
- Memoize custom display value functions

### Accessibility

- Provide clear aria-labels for complex options
- Ensure sufficient color contrast for all states
- Test with keyboard navigation and screen readers
- Use semantic HTML structure within options

### Visual Design

- Match trigger width for form-like layouts
- Use appropriate sizes based on context
- Maintain consistent option heights
- Consider loading states for dynamic content

## Examples

### Form Field Select

```tsx
<div className="space-y-2">
  <label
    htmlFor="country"
    className="text-body-small-strong block"
  >
    Country
  </label>
  <Select
    value={country}
    onChange={setCountry}
  >
    <Select.Trigger className="w-full">
      <Select.Value>
        {country ? countries.find((c) => c.code === country)?.name : "Select country..."}
      </Select.Value>
    </Select.Trigger>
    <Select.Content>
      <Select.Label>Countries</Select.Label>
      {countries.map((country) => (
        <Select.Item
          key={country.code}
          value={country.code}
        >
          <img
            src={country.flag}
            alt=""
            className="h-3 w-4"
          />
          <Select.Value>{country.name}</Select.Value>
        </Select.Item>
      ))}
    </Select.Content>
  </Select>
</div>
```

### Settings Dropdown

```tsx
<Select
  value={setting}
  onChange={setSetting}
>
  <Select.Trigger>
    <Settings />
    <Select.Value>Settings</Select.Value>
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="profile">
      <User />
      <Select.Value>Profile Settings</Select.Value>
    </Select.Item>
    <Select.Item value="preferences">
      <Preferences />
      <Select.Value>Preferences</Select.Value>
    </Select.Item>

    <Select.Divider />

    <Select.Item onClick={handleLogout}>
      <LogOut />
      <Select.Value>Sign Out</Select.Value>
    </Select.Item>
  </Select.Content>
</Select>
```

## Notes

- The component uses Floating UI's inner middleware for macOS-style positioning
- Custom actions on items bypass the selection logic
- The fallback system ensures functionality even when positioning fails
- Touch devices receive optimized interaction patterns
- Multiple selects can be used simultaneously without conflicts
- The component supports both controlled and uncontrolled usage patterns
