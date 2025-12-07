# Checkbox

A flexible checkbox component with support for labels, mixed state, and multiple visual variants. It uses a compound component pattern for maximum composability.

## Import

```tsx
import { Checkbox } from "@choice-ui/react"
```

## Features

- Three visual variants (default, accent, outline) for different UI contexts
- Support for indeterminate/mixed state
- Compound component pattern with `Checkbox.Label`
- Full keyboard navigation (Space/Enter to toggle)
- Proper ARIA attributes for accessibility
- Focus state management
- Disabled state styling
- Auto-wrapping of string children as labels
- Context-based communication between sub-components

## Usage

### Basic

```tsx
<Checkbox
  value={checked}
  onChange={setChecked}
>
  Accept terms and conditions
</Checkbox>
```

### With separate label

```tsx
<Checkbox
  value={checked}
  onChange={setChecked}
>
  <Checkbox.Label>Enable notifications</Checkbox.Label>
</Checkbox>
```

### Variants

```tsx
<Checkbox variant="default" value={checked} onChange={setChecked}>
  Default style
</Checkbox>

<Checkbox variant="accent" value={checked} onChange={setChecked}>
  Accent style
</Checkbox>

<Checkbox variant="outline" value={checked} onChange={setChecked}>
  Outline style
</Checkbox>
```

### Mixed/Indeterminate state

```tsx
<Checkbox
  value={isPartiallySelected}
  mixed={true}
  onChange={handleSelectAll}
>
  Select all
</Checkbox>
```

### Disabled state

```tsx
<Checkbox
  disabled
  value={checked}
  onChange={setChecked}
>
  This option is disabled
</Checkbox>
```

### With custom label styling

```tsx
<Checkbox
  value={checked}
  onChange={setChecked}
>
  <Checkbox.Label className="text-body-small-strong">Custom styled label</Checkbox.Label>
</Checkbox>
```

### Controlled with focus

```tsx
<Checkbox
  value={checked}
  onChange={setChecked}
  focused={isFocused}
>
  Controlled focus state
</Checkbox>
```

## Props

### Checkbox

```ts
interface CheckboxProps extends Omit<HTMLProps<HTMLInputElement>, "value" | "onChange"> {
  /** Child elements (strings auto-wrapped in Checkbox.Label) */
  children?: ReactNode

  /** Additional CSS class names */
  className?: string

  /** Whether the checkbox appears focused */
  focused?: boolean

  /** Whether to show mixed/indeterminate state */
  mixed?: boolean

  /** Callback when checked state changes */
  onChange?: (value: boolean) => void

  /** Whether the checkbox is checked */
  value?: boolean

  /** Visual style variant */
  variant?: "default" | "accent" | "outline"
}
```

### Checkbox.Label

```ts
interface CheckboxLabelProps
  extends Omit<HTMLProps<HTMLLabelElement>, "htmlFor" | "id" | "disabled"> {
  /** Label content */
  children: ReactNode
}
```

- Defaults:
  - `variant`: "default"
  - `value`: `false`
  - `mixed`: `false`
  - `focused`: `false`

- Accessibility:
  - Proper `aria-checked` attribute (including "mixed" state)
  - Automatic label association via context
  - Keyboard support for Space and Enter keys
  - Screen reader announcements

## Styling

- Uses Tailwind CSS via `tailwind-variants` with slot-based styling
- Slots available: `root`, `box`, `input`, `label`
- Each variant has distinct visual treatments
- Focus states include border color changes and shadow effects
- Disabled state applies to both checkbox and label

## Best practices

- Always provide a label for accessibility (either as children or via aria-label)
- Use the accent variant for primary actions
- Use mixed state for "select all" scenarios with partial selection
- Keep labels concise and action-oriented
- Group related checkboxes together visually
- Consider using Checkbox with forms and validation

## Examples

### Select all with mixed state

```tsx
function SelectAllExample() {
  const [items, setItems] = useState([
    { id: 1, checked: false },
    { id: 2, checked: true },
    { id: 3, checked: false },
  ])

  const checkedCount = items.filter((item) => item.checked).length
  const allChecked = checkedCount === items.length
  const someChecked = checkedCount > 0 && checkedCount < items.length

  const handleSelectAll = (checked: boolean) => {
    setItems(items.map((item) => ({ ...item, checked })))
  }

  return (
    <Checkbox
      value={allChecked}
      mixed={someChecked}
      onChange={handleSelectAll}
    >
      Select all ({checkedCount}/{items.length})
    </Checkbox>
  )
}
```

### Form with validation

```tsx
<form onSubmit={handleSubmit}>
  <Checkbox
    value={agreedToTerms}
    onChange={setAgreedToTerms}
    variant="accent"
    required
  >
    I agree to the{" "}
    <a
      href="/terms"
      className="underline"
    >
      terms and conditions
    </a>
  </Checkbox>

  <Button
    type="submit"
    disabled={!agreedToTerms}
  >
    Continue
  </Button>
</form>
```

### Settings panel

```tsx
<div className="space-y-2">
  <Checkbox
    value={emailNotifications}
    onChange={setEmailNotifications}
  >
    <Checkbox.Label>
      <div>Email notifications</div>
      <div className="text-secondary-foreground text-body-small">
        Receive updates about your account
      </div>
    </Checkbox.Label>
  </Checkbox>

  <Checkbox
    value={marketingEmails}
    onChange={setMarketingEmails}
    disabled={!emailNotifications}
  >
    Marketing emails
  </Checkbox>
</div>
```

## Notes

- The component uses a context provider for communication between Checkbox and Label
- String children are automatically wrapped in `Checkbox.Label` for convenience
- The mixed state displays an indeterminate icon instead of a checkmark
- Focus management can be controlled externally via the `focused` prop
- The component is fully controlled - you must manage the `value` state
