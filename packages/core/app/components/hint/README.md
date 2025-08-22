# Hint Component

A contextual information tooltip component that displays helpful information on hover or focus. The Hint component provides a clean, accessible way to show additional information without cluttering the interface.

## Overview

The Hint component creates a floating tooltip that appears when users hover over or focus on the trigger element. It uses Floating UI for precise positioning and supports customizable placement, content, and styling options.

## Usage

### Basic Usage

```tsx
import { Hint } from "~/components/hint"

export function Example() {
  return (
    <div className="flex items-center gap-2">
      <span className="font-medium">Reason</span>
      <Hint content="Optional reason" />
    </div>
  )
}
```

### Custom Icon

```tsx
import { CircleInfoLargeSolid } from "@choiceform/icons-react"
import { Hint } from "~/components/hint"

export function CustomIconExample() {
  return (
    <Hint
      icon={<CircleInfoLargeSolid />}
      content="Custom icon tooltip"
    />
  )
}
```

### Different Placements

```tsx
import { Hint } from "~/components/hint"

export function PlacementExample() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Hint
          content="Left-positioned tooltip"
          placement="left-start"
        />
        <span>Left placement</span>
      </div>

      <div className="flex items-center gap-2">
        <span>Right placement</span>
        <Hint
          content="Right-positioned tooltip"
          placement="right-start"
        />
      </div>
    </div>
  )
}
```

## Props

| Prop           | Type                            | Default                   | Description                                         |
| -------------- | ------------------------------- | ------------------------- | --------------------------------------------------- |
| `content`      | `ReactNode`                     | -                         | **Required.** The content to display in the tooltip |
| `placement`    | `"left-start" \| "right-start"` | `"right-start"`           | Position of the tooltip relative to the trigger     |
| `icon`         | `ReactNode`                     | `<InfoCircle />`          | The icon to display in the trigger button           |
| `disabled`     | `boolean`                       | `false`                   | Whether the tooltip is disabled                     |
| `open`         | `boolean`                       | -                         | Controlled open state of the tooltip                |
| `onOpenChange` | `(open: boolean) => void`       | -                         | Callback when the open state changes                |
| `variant`      | `"default" \| "dark"`           | `"default"`               | Visual variant of the tooltip                       |
| `className`    | `string`                        | -                         | Additional CSS classes for the trigger              |
| `children`     | `ReactNode`                     | -                         | Custom trigger content (overrides default icon)     |
| `portalId`     | `string`                        | `"floating-tooltip-root"` | ID of the portal container                          |

## Features

### Placement Options

- **left-start**: Tooltip appears to the left, aligned to the start
- **right-start**: Tooltip appears to the right, aligned to the start (default)

### Content Handling

- Supports both text and JSX content
- Automatically wraps long content for optimal readability
- Maintains consistent spacing and typography

### Accessibility

- Keyboard navigation support
- Proper ARIA attributes
- Focus management
- Screen reader compatible

### Interaction States

- **Default**: Normal interactive state with hover/focus triggers
- **Disabled**: Prevents interaction and tooltip display
- **Controlled**: Can be controlled externally via `open` prop

### Visual Variants

- **Default**: Light background with dark text
- **Dark**: Dark background with light text

## Examples

### Long Content

```tsx
<Hint
  content="This is a very long information tooltip that demonstrates automatic text wrapping and maintains appropriate width for optimal readability."
  placement="right-start"
/>
```

### Disabled State

```tsx
<Hint
  content="This tooltip is disabled"
  disabled={true}
/>
```

### Dark Variant

```tsx
<Hint
  content="Dark themed tooltip"
  variant="dark"
/>
```

### Controlled State

```tsx
import { useState } from "react"
import { Hint } from "~/components/hint"

export function ControlledExample() {
  const [open, setOpen] = useState(false)

  return (
    <Hint
      content="Controlled tooltip"
      open={open}
      onOpenChange={setOpen}
    />
  )
}
```

## Architecture

The Hint component uses a compound component pattern with the following structure:

- **Hint**: Main component that provides context and manages state
- **HintTrigger**: The clickable/hoverable element that triggers the tooltip
- **HintContent**: The floating content that appears on interaction

## Styling

The component uses Tailwind CSS for styling with support for:

- Responsive design
- Dark mode compatibility
- Custom theming through CSS variables
- Consistent spacing and typography

## Best Practices

1. **Content**: Keep tooltip content concise but informative
2. **Placement**: Choose placement based on available space and content flow
3. **Accessibility**: Ensure tooltips enhance rather than hinder user experience
4. **Performance**: Use controlled state sparingly for better performance
5. **Context**: Place hints near relevant form fields or complex interface elements
