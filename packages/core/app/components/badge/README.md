# Badge

A compact label component for displaying status, categories, or counts. Supports multiple visual variants with strong and subtle styling options.

## Import

```tsx
import { Badge } from "@choiceform/design-system"
```

## Features

- Multiple semantic variants (default, brand, inverted, component, success, warning, error)
- Strong and subtle styling modes
- Automatic padding adjustment for icons
- Inline display for text flow integration
- Consistent height and rounded corners
- Support for icons and multiple child elements

## Usage

### Basic

```tsx
<Badge>Default</Badge>
<Badge variant="brand">Brand</Badge>
<Badge variant="success">Success</Badge>
```

### Strong vs Subtle

```tsx
// Subtle (default)
<Badge variant="warning">Warning</Badge>

// Strong
<Badge variant="warning" strong>Warning</Badge>
```

### Variants

```tsx
<Badge variant="default">Default</Badge>
<Badge variant="brand">Brand</Badge>
<Badge variant="inverted">Inverted</Badge>
<Badge variant="component">Component</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
```

### With Icons

```tsx
import { CheckSmall } from "@choiceform/icons-react"
;<Badge variant="success">
  <CheckSmall className="mr-0.5" />
  Completed
</Badge>
```

## Props

```ts
interface BadgeProps extends Omit<HTMLProps<HTMLDivElement>, "size"> {
  /** Visual variant of the badge */
  variant?: "default" | "brand" | "inverted" | "component" | "success" | "warning" | "error"

  /** Use strong styling (filled background) instead of subtle */
  strong?: boolean
}
```

- Defaults:
  - `variant`: "default"
  - `strong`: false

## Styling

- Fixed height of 16px (h-4)
- Rounded corners (rounded-md)
- Inline-flex display for proper text alignment
- Automatic padding adjustment:
  - Single element: horizontal padding (px-1)
  - Multiple elements: right padding only (pr-1) to accommodate icons

## Variants Guide

- **default**: Neutral gray styling for general information
- **brand**: Uses accent color for brand-related content
- **inverted**: High contrast for emphasis
- **component**: Purple styling for UI component references
- **success**: Green for positive states or completion
- **warning**: Yellow/amber for cautions or warnings
- **error**: Red for errors or critical information

## Best Practices

- Use semantic variants to convey meaning
- Keep badge text short and concise
- Use strong mode sparingly for important states
- Combine with icons for better visual recognition
- Group related badges with consistent styling

## Examples

### Status Indicators

```tsx
<div className="flex gap-2">
  <Badge
    variant="success"
    strong
  >
    Active
  </Badge>
  <Badge variant="warning">Pending</Badge>
  <Badge variant="error">Failed</Badge>
  <Badge>Draft</Badge>
</div>
```

### With Icons

```tsx
<div className="flex gap-2">
  <Badge variant="success">
    <CheckSmall className="mr-0.5" />
    Verified
  </Badge>
  <Badge variant="warning">
    <AlertSmall className="mr-0.5" />
    Review Required
  </Badge>
</div>
```

### Categories

```tsx
<div className="flex flex-wrap gap-1">
  <Badge variant="component">Button</Badge>
  <Badge variant="component">Input</Badge>
  <Badge variant="component">Modal</Badge>
</div>
```

### Inline Usage

```tsx
<p>
  This feature is{" "}
  <Badge
    variant="brand"
    strong
  >
    New
  </Badge>{" "}
  and requires <Badge variant="warning">Beta Access</Badge> to use.
</p>
```

## Notes

- Badges are inline-flex elements that flow with text
- The component automatically detects multiple children for proper spacing
- All native div props are supported except `size`
- Background and text colors adjust based on variant and strong mode
