# Chip

A compact, interactive element used to display tags, filters, selections, or attributes. Supports optional prefix/suffix elements and removable functionality.

## Import

```tsx
import { Chip } from "@choiceform/design-system"
```

## Features

- Multiple visual variants (default, accent, success) for different contexts
- Two sizes for different density needs
- Optional prefix and suffix elements for icons or badges
- Removable chips with built-in close button
- Selected state for toggle/filter scenarios
- Disabled state styling
- Customizable component type via `as` prop
- Slot-based styling with granular customization
- Built-in accessibility with proper ARIA labels

## Usage

### Basic

```tsx
<Chip>JavaScript</Chip>
```

### Sizes

```tsx
<Chip size="default">Default size</Chip>
<Chip size="medium">Medium size</Chip>
```

### Variants

```tsx
<Chip variant="default">Default</Chip>
<Chip variant="accent">Accent</Chip>
<Chip variant="success">Success</Chip>
```

### With remove button

```tsx
<Chip onRemove={() => console.log("Removed")}>Removable</Chip>
```

### With prefix icon

```tsx
import { Star } from "@choiceform/icons-react"
;<Chip prefixElement={<Star />}>Featured</Chip>
```

### With suffix element

```tsx
<Chip suffixElement={<span className="text-xs">12</span>}>Messages</Chip>
```

### Selected state

```tsx
<Chip
  selected
  onClick={() => setSelected(!selected)}
>
  Filter Active
</Chip>
```

### Disabled state

```tsx
<Chip disabled>Unavailable</Chip>
```

### Custom element

```tsx
<Chip
  as="button"
  onClick={handleClick}
>
  Clickable Chip
</Chip>
```

## Props

```ts
interface ChipProps extends Omit<HTMLProps<HTMLDivElement>, "size" | "as"> {
  /** Element type to render as */
  as?: ElementType

  /** Object of class names for each slot */
  classNames?: {
    closeButton?: string
    prefix?: string
    root?: string
    suffix?: string
    text?: string
  }

  /** Whether the chip is disabled */
  disabled?: boolean

  /** Internationalization strings */
  i18n?: {
    chip: string
    remove: string
  }

  /** Click handler for the chip */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void

  /** Handler when remove button is clicked */
  onRemove?: (e: React.MouseEvent<HTMLButtonElement>) => void

  /** Element to display before the text */
  prefixElement?: ReactNode

  /** Whether the chip is selected */
  selected?: boolean

  /** Size variant */
  size?: "default" | "medium"

  /** Element to display after the text */
  suffixElement?: ReactNode

  /** Visual style variant */
  variant?: "default" | "accent" | "success" | "rest"
}
```

- Defaults:
  - `size`: "default"
  - `variant`: "default"
  - `selected`: `false`
  - `disabled`: `false`
  - `as`: "div"
  - `i18n`: `{ chip: "Chip", remove: "Remove chip:" }`

- Accessibility:
  - Remove button includes descriptive aria-label
  - Proper event propagation handling
  - Keyboard-friendly when rendered as button

## Styling

- Uses Tailwind CSS via `tailwind-variants` with multiple slots
- Slots available: `root`, `text`, `prefix`, `suffix`, `closeButton`
- Hover states for interactive feedback
- Selected state changes border and text colors
- Disabled state applies muted styling

## Best practices

- Use chips for removable filters or tags
- Keep text concise and descriptive
- Use the accent variant for active/selected filters
- Group related chips together
- Provide clear feedback when chips are interactive
- Use prefix icons to enhance visual recognition
- Consider using suffix elements for counts or status indicators

## Examples

### Filter chips

```tsx
function FilterExample() {
  const [filters, setFilters] = useState([
    { id: 1, label: "In Progress", active: true },
    { id: 2, label: "High Priority", active: false },
    { id: 3, label: "Assigned to Me", active: true },
  ])

  const toggleFilter = (id: number) => {
    setFilters(filters.map((f) => (f.id === id ? { ...f, active: !f.active } : f)))
  }

  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <Chip
          key={filter.id}
          selected={filter.active}
          variant={filter.active ? "accent" : "default"}
          onClick={() => toggleFilter(filter.id)}
          onRemove={() => setFilters(filters.filter((f) => f.id !== filter.id))}
        >
          {filter.label}
        </Chip>
      ))}
    </div>
  )
}
```

### Tag input

```tsx
function TagInput() {
  const [tags, setTags] = useState(["React", "TypeScript", "Design System"])

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <Chip
          key={index}
          size="medium"
          onRemove={() => removeTag(index)}
        >
          {tag}
        </Chip>
      ))}
    </div>
  )
}
```

### Status chips

```tsx
import { CheckCircle, AlertCircle, Clock } from "@choiceform/icons-react"
;<div className="flex gap-2">
  <Chip
    variant="success"
    prefixElement={<CheckCircle />}
  >
    Completed
  </Chip>

  <Chip
    variant="accent"
    prefixElement={<Clock />}
  >
    In Progress
  </Chip>

  <Chip
    variant="default"
    prefixElement={<AlertCircle />}
  >
    Pending Review
  </Chip>
</div>
```

### Interactive chip as button

```tsx
<Chip
  as="button"
  variant="accent"
  onClick={() => console.log("Chip clicked")}
  className="transition-shadow hover:shadow-sm"
>
  Click Me
</Chip>
```

## Notes

- The component stops event propagation on click to prevent unintended parent handlers
- Remove button prevents mousedown propagation for better UX in forms
- When using `as` prop, ensure the element type matches your event handlers
- The chip truncates long text by default to maintain consistent sizing
- Combine with ChipsInput component for advanced tag input functionality
