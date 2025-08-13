# ChipsInput

An advanced input component that allows users to enter multiple values as chips (tags). Perfect for tag inputs, email addresses, keywords, or any scenario requiring multiple discrete values.

## Import

```tsx
import { ChipsInput } from "@choiceform/design-system"
```

## Features

- Enter multiple values as removable chips
- Keyboard navigation and shortcuts (Enter to add, Backspace to remove)
- Duplicate prevention option
- Custom chip rendering support
- Controlled and uncontrolled modes
- Auto-convert input to chip on blur
- Click-to-select chip functionality
- Composition event support for IME
- Two size variants
- Disabled state support
- Fully accessible with proper ARIA attributes

## Usage

### Basic

```tsx
const [tags, setTags] = useState<string[]>([])

<ChipsInput
  value={tags}
  onChange={setTags}
  placeholder="Add tags..."
/>
```

### With initial values

```tsx
<ChipsInput
  value={["React", "TypeScript", "Design System"]}
  onChange={setTags}
  placeholder="Add more tags..."
/>
```

### Prevent duplicates

```tsx
<ChipsInput
  value={tags}
  onChange={setTags}
  allowDuplicates={false}
  placeholder="Enter unique tags..."
/>
```

### With callbacks

```tsx
<ChipsInput
  value={tags}
  onChange={setTags}
  onAdd={(tag) => console.log("Added:", tag)}
  onRemove={(tag) => console.log("Removed:", tag)}
/>
```

### Large size

```tsx
<ChipsInput
  size="large"
  value={tags}
  onChange={setTags}
  placeholder="Large input..."
/>
```

### Disabled state

```tsx
<ChipsInput
  disabled
  value={["Can't", "Edit", "These"]}
  placeholder="Disabled input"
/>
```

### Custom chip rendering

```tsx
<ChipsInput
  value={emails}
  onChange={setEmails}
  renderChip={({ chip, isSelected, handleChipClick, handleChipRemoveClick, index }) => (
    <Chip
      key={index}
      selected={isSelected}
      onClick={() => handleChipClick(index)}
      onRemove={() => handleChipRemoveClick(index)}
      prefixElement={<EmailIcon />}
    >
      {chip}
    </Chip>
  )}
/>
```

### With nested content

```tsx
<ChipsInput
  value={tags}
  onChange={setTags}
>
  <Button
    size="small"
    variant="ghost"
  >
    Clear All
  </Button>
</ChipsInput>
```

## Props

```ts
interface ChipsInputProps
  extends Omit<HTMLProps<HTMLDivElement>, "value" | "onChange" | "defaultValue" | "size"> {
  /** Whether to allow duplicate values */
  allowDuplicates?: boolean

  /** Additional content to render after the input */
  children?: React.ReactNode

  /** Whether the input is disabled */
  disabled?: boolean

  /** Input element ID */
  id?: string

  /** Called when a chip is added */
  onAdd?: (value: string) => void

  /** Called when chips array changes */
  onChange?: (value: string[]) => void

  /** Called when a chip is removed */
  onRemove?: (value: string) => void

  /** Placeholder text when no chips */
  placeholder?: string

  /** Custom chip renderer */
  renderChip?: (props: RenderChipProps) => ReactNode

  /** Size variant */
  size?: "default" | "large"

  /** Current chips array */
  value?: string[]
}

interface RenderChipProps {
  /** The chip value */
  chip: string

  /** Whether the input is disabled */
  disabled?: boolean

  /** Handler for chip click */
  handleChipClick: (index: number) => void

  /** Handler for chip removal */
  handleChipRemoveClick: (index: number) => void

  /** Chip index */
  index: number

  /** Whether this chip is selected */
  isSelected: boolean
}
```

- Defaults:
  - `allowDuplicates`: `false`
  - `size`: "default"
  - `value`: `[]` (when uncontrolled)

- Behavior:
  - Enter key adds current input as chip
  - Backspace removes last chip when input is empty
  - Click on chip to select it
  - Delete/Backspace removes selected chip
  - Input automatically resizes based on content
  - Blur event converts input to chip

## Styling

- Uses Tailwind CSS via `tailwind-variants`
- Slots available: `root`, `input`, `chip`, `nesting`
- Focus state shows border highlight
- Hover state on container
- Selected chips have visual distinction

## Best practices

- Use clear placeholders to indicate expected input
- Consider preventing duplicates for most use cases
- Provide visual feedback with onAdd/onRemove callbacks
- Keep chip text concise
- Group related functionality with nested content
- Use custom rendering for complex chip designs
- Validate input before adding (in custom implementation)

## Examples

### Email input with validation

```tsx
function EmailInput() {
  const [emails, setEmails] = useState<string[]>([])

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleAdd = (email: string) => {
    if (validateEmail(email)) {
      console.log("Valid email added:", email)
    } else {
      console.error("Invalid email:", email)
      // Could show error notification
    }
  }

  return (
    <ChipsInput
      value={emails}
      onChange={setEmails}
      onAdd={handleAdd}
      placeholder="Enter email addresses..."
      allowDuplicates={false}
    />
  )
}
```

### Filter tags with categories

```tsx
function FilterTags() {
  const [filters, setFilters] = useState<string[]>([])

  return (
    <ChipsInput
      value={filters}
      onChange={setFilters}
      placeholder="Add filters..."
      renderChip={({ chip, ...props }) => {
        const [category, value] = chip.split(":")
        return (
          <Chip
            {...props}
            prefixElement={<span className="text-sm opacity-60">{category}</span>}
          >
            {value}
          </Chip>
        )
      }}
    />
  )
}
```

### Skill input with suggestions

```tsx
function SkillInput() {
  const [skills, setSkills] = useState(["JavaScript", "React"])
  const suggestedSkills = ["TypeScript", "Node.js", "CSS", "HTML"]

  return (
    <div className="space-y-2">
      <ChipsInput
        value={skills}
        onChange={setSkills}
        placeholder="Enter your skills..."
        allowDuplicates={false}
      />

      <div className="flex gap-2">
        <span className="text-secondary-foreground text-sm">Suggestions:</span>
        {suggestedSkills
          .filter((skill) => !skills.includes(skill))
          .map((skill) => (
            <Button
              key={skill}
              size="small"
              variant="ghost"
              onClick={() => setSkills([...skills, skill])}
            >
              + {skill}
            </Button>
          ))}
      </div>
    </div>
  )
}
```

### Controlled with max limit

```tsx
function LimitedTags() {
  const [tags, setTags] = useState<string[]>([])
  const maxTags = 5

  const handleChange = (newTags: string[]) => {
    if (newTags.length <= maxTags) {
      setTags(newTags)
    } else {
      // Show notification about limit
      console.warn(`Maximum ${maxTags} tags allowed`)
    }
  }

  return (
    <>
      <ChipsInput
        value={tags}
        onChange={handleChange}
        placeholder={`Add up to ${maxTags} tags...`}
      />
      <p className="text-secondary-foreground mt-2 text-sm">
        {tags.length}/{maxTags} tags
      </p>
    </>
  )
}
```

## Notes

- The component uses `useControllableValue` for flexible state management
- Dynamic input width calculation prevents layout shifts
- Click outside handling deselects any selected chip
- Composition events are properly handled for IME support
- The input element is always present for continuous typing
- Chips are rendered with the Chip component by default but can be customized
