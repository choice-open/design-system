# IconButton

A specialized button component designed specifically for displaying icons with proper accessibility, interaction states, and visual variants. It provides a compact interface for actions where an icon clearly communicates the purpose.

## Import

```tsx
import { IconButton } from "@choiceform/design-system"
```

## Features

- Multiple visual variants for different contexts (default, secondary, solid, highlight, ghost, dark)
- Two sizes for different UI densities (default, large)
- Support for all button states (active, focused, loading, disabled)
- Built-in tooltip support for better accessibility
- Can render as other elements via `asChild`
- Group capability via `IconButtonGroup` for related actions
- Loading state with spinner animation
- Keyboard and screen reader friendly with proper ARIA attributes

## Usage

### Basic

```tsx
import { FieldTypeButton } from "@choiceform/icons-react"

<IconButton>
  <FieldTypeButton />
</IconButton>
```

### Variants

```tsx
import { FieldTypeRating } from "@choiceform/icons-react"

<IconButton variant="default">
  <FieldTypeRating />
</IconButton>
<IconButton variant="secondary">
  <FieldTypeRating />
</IconButton>
<IconButton variant="solid">
  <FieldTypeRating />
</IconButton>
<IconButton variant="highlight">
  <FieldTypeRating />
</IconButton>
<IconButton variant="ghost">
  <FieldTypeRating />
</IconButton>
<IconButton variant="dark">
  <FieldTypeRating />
</IconButton>
```

### Sizes

```tsx
import { FieldTypeRating } from "@choiceform/icons-react"

<IconButton size="default">
  <FieldTypeRating />
</IconButton>
<IconButton size="large">
  <FieldTypeRating />
</IconButton>
```

### States

```tsx
import { FieldTypeRating } from "@choiceform/icons-react"

<IconButton active>
  <FieldTypeRating />
</IconButton>
<IconButton focused>
  <FieldTypeRating />
</IconButton>
<IconButton disabled>
  <FieldTypeRating />
</IconButton>
<IconButton loading>
  <FieldTypeRating />
</IconButton>
```

### With tooltip

```tsx
import { FieldTypeDate } from "@choiceform/icons-react"

<IconButton tooltip={{ content: "Select date" }}>
  <FieldTypeDate />
</IconButton>
```

### Group related actions

```tsx
import { IconButtonGroup } from "@choiceform/design-system"
import { FieldTypeButton, FieldTypeCount, FieldTypeCheckbox } from "@choiceform/icons-react"

<IconButtonGroup variant="solid">
  <IconButton>
    <FieldTypeButton />
  </IconButton>
  <IconButton>
    <FieldTypeCount />
  </IconButton>
  <IconButton>
    <FieldTypeCheckbox />
  </IconButton>
</IconButtonGroup>
```

### Render as another element

```tsx
import { FieldTypeAttachment } from "@choiceform/icons-react"

<IconButton asChild>
  <a href="/download">
    <FieldTypeAttachment />
  </a>
</IconButton>
```

## Props

```ts
interface IconButtonProps extends Omit<HTMLProps<HTMLButtonElement>, "size"> {
  /** Whether the button is in an active/pressed state */
  active?: boolean

  /** Render as a custom element instead of button */
  asChild?: boolean

  /** Icon content to display */
  children?: React.ReactNode

  /** Additional CSS class names */
  className?: string

  /** Whether the button is disabled */
  disabled?: boolean

  /** Whether the button appears focused (for keyboard navigation) */
  focused?: boolean

  /** Whether the button is in loading state with spinner */
  loading?: boolean

  /** Button size variant */
  size?: "default" | "large"

  /** Tooltip configuration for the button */
  tooltip?: TooltipProps

  /** Visual style variant of the button */
  variant?: "default" | "secondary" | "solid" | "highlight" | "ghost" | "dark"
}
```

- Defaults:
  - `type`: "button" (overridable via prop)
  - `size`: "default"
  - `variant`: "default"
  - `active`, `focused`, `loading`: `false`
  - `disabled`: `false` (inherited from native prop)

- Accessibility:
  - `disabled` and `loading` set appropriate ARIA states
  - Supports keyboard navigation and focus management
  - Tooltip provides additional context for screen readers

## Styling

- This component uses Tailwind CSS via `tailwind-variants` in `tv.ts` to create variants and slots.
- Customize using the `className` prop; classes are merged with the component's internal classes.
- Slots available in `tv.ts`: `button`.

## Best practices

- Use for actions where an icon clearly communicates the purpose
- Always provide tooltip text for clarity, especially for less common icons
- Group related actions using `IconButtonGroup`
- Choose variants that fit your visual hierarchy
- Use appropriate sizes for touch targets and visual emphasis
- Ensure sufficient color contrast and clear focus indicators

## Examples

### Property inspector toolbar

```tsx
import { IconButtonGroup } from "@choiceform/design-system"
import { Copy, Paste, Delete } from "@choiceform/icons-react"

<IconButtonGroup variant="secondary">
  <IconButton tooltip={{ content: "Copy" }}>
    <Copy />
  </IconButton>
  <IconButton tooltip={{ content: "Paste" }}>
    <Paste />
  </IconButton>
  <IconButton tooltip={{ content: "Delete" }}>
    <Delete />
  </IconButton>
</IconButtonGroup>
```

### Loading action

```tsx
import { Save } from "@choiceform/icons-react"

<IconButton loading tooltip={{ content: "Saving..." }}>
  <Save />
</IconButton>
```

### Dark background usage

```tsx
import { Settings } from "@choiceform/icons-react"

<div className="bg-gray-800 p-4">
  <IconButton variant="dark" tooltip={{ content: "Settings" }}>
    <Settings />
  </IconButton>
</div>
```

## Notes

- When `loading` is true, the button shows a centered spinner and replaces the icon content
- When `disabled` or `loading` is true, the button becomes non-interactive
- Use `asChild` for integration with routing/link components while keeping accessibility and styling
- Icons should be imported from `@choiceform/icons-react` or similar icon libraries