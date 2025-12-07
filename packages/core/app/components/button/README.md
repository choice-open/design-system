# Button

A versatile, accessible button component that supports multiple visual variants, sizes, and states. It renders as a native `button` by default, and can render as a custom element via `asChild`.

## Import

```tsx
import { Button } from "@choice-ui/react"
```

## Features

- Multiple visual variants for different semantics (primary, secondary, destructive, link, ghost, dark, etc.)
- Two sizes for different density needs
- Loading state with an inline spinner
- Active, focused, disabled visual states
- Optional tooltip support
- Can render as another element via `asChild` while preserving behavior and a11y
- Keyboard and screen-reader friendly with proper ARIA attributes

## Usage

### Basic

```tsx
<Button>Button</Button>
```

### Sizes

```tsx
<Button size="default">Default</Button>
<Button size="large">Large</Button>
```

### Variants

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="solid">Solid</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="secondary-destruct">Secondary Destruct</Button>
<Button variant="inverse">Inverse</Button>
<Button variant="success">Success</Button>
<Button variant="link">Link</Button>
<Button variant="link-danger">Link Danger</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="dark">Dark</Button>
<Button variant="reset">Reset</Button>
```

### States

```tsx
<Button active>Active</Button>
<Button focused>Focused</Button>
<Button disabled>Disabled</Button>
<Button loading>Loading…</Button>
```

### With icon

```tsx
import { SearchSmall } from "@choiceform/icons-react"
;<Button>
  <SearchSmall />
  Search
</Button>
```

### With tooltip

```tsx
<Button tooltip={{ content: "Save your changes", placement: "top" }}>Save</Button>
```

### Render as another element

Use `asChild` to render as an anchor, link component, or any custom element while retaining styles and behaviors.

```tsx
<Button asChild>
  <a href="/profile">Profile</a>
</Button>
```

## Props

```ts
interface ButtonProps extends Omit<HTMLProps<HTMLButtonElement>, "size"> {
  /** Whether the button is in an active/pressed state */
  active?: boolean

  /** Render as a custom element instead of button */
  asChild?: boolean

  /** Additional CSS class names */
  className?: string

  /** Whether the button appears focused (for keyboard navigation) */
  focused?: boolean

  /** Whether the button is in loading state with spinner */
  loading?: boolean

  /** Button size variant */
  size?: "default" | "large"

  /** Tooltip configuration for the button */
  tooltip?: TooltipProps

  /** Visual style variant of the button */
  variant?:
    | "primary"
    | "secondary"
    | "solid"
    | "destructive"
    | "secondary-destruct"
    | "inverse"
    | "success"
    | "link"
    | "link-danger"
    | "ghost"
    | "dark"
    | "reset"
}
```

- Defaults:
  - `type`: "button" (overridable via prop)
  - `size`: "default"
  - `variant`: "primary"
  - `active`, `focused`, `loading`: `false`
  - `disabled`: `false` (inherited from native prop)

- Accessibility:
  - `disabled` and `loading` set `aria-disabled` and `aria-busy` accordingly
  - If children is a plain string, it is used as `aria-label` by default; otherwise provide an explicit `aria-label`

## Styling

- This component uses Tailwind CSS via `tailwind-variants` in `tv.ts` to create variants and slots.
- Customize using the `className` prop; classes are merged with the component’s internal classes.
- Slots available in `tv.ts`: `button`, `spinner`, `content`.

## Best practices

- Choose variants that match semantic meaning (e.g., destructive for dangerous actions)
- Keep labels action-oriented and concise
- Don’t overload a single view with too many button styles
- Ensure sufficient color contrast and clear focus indicators

## Examples

### Submit button

```tsx
<form>
  <Button type="submit">Submit</Button>
</form>
```

### Busy action

```tsx
<Button
  loading
  aria-label="Saving"
>
  Save
</Button>
```

### Disabled destructive action

```tsx
<Button
  variant="destructive"
  disabled
>
  Delete
</Button>
```

## Notes

- When `loading` is true, the button shows a centered spinner and keeps the content invisible to prevent layout shift while announcing busy state via `aria-busy`.
- When `disabled` or `loading` is true, the button becomes non-interactive.
- Use `asChild` for integration with routing/link components while keeping accessibility and styling.
