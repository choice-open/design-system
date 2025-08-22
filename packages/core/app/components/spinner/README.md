# Spinner

A collection of loading indicator components that provide visual feedback during asynchronous operations. Includes both bounce and spin animation variants with customizable styling and sizes.

## Import

```tsx
import { SpinnerBounce, SpinnerSpin } from "@choiceform/design-system"
```

## Features

- **Multiple Animation Types**: Bounce and spin animation variants
- **Size Options**: Small, medium, and large sizes for different contexts
- **Theme Variants**: Primary and default color schemes
- **Label Support**: Optional loading text display
- **Custom Styling**: Flexible styling via classNames prop
- **Shape Customization**: Individual control over shape elements (SpinnerSpin only)
- **Accessibility**: Proper ARIA attributes and screen reader support

## SpinnerBounce Usage

### Basic Spinner

```tsx
<SpinnerBounce />
```

### With Label

```tsx
<SpinnerBounce label="Loading..." />
```

### Different Sizes

```tsx
<SpinnerBounce size="small" />
<SpinnerBounce size="medium" />
<SpinnerBounce size="large" />
```

### Variants

```tsx
<SpinnerBounce variant="default" />
<SpinnerBounce variant="primary" />
```

## SpinnerSpin Usage

### Basic Spinner

```tsx
<SpinnerSpin />
```

### Different Sizes

```tsx
<SpinnerSpin size="small" />
<SpinnerSpin size="medium" />
<SpinnerSpin size="large" />
```

### Custom Opacity

```tsx
<SpinnerSpin
  classNames={{
    shape:
      "opacity-100 [&:nth-of-type(1)]:opacity-100 [&:nth-of-type(2)]:opacity-10 [&:nth-of-type(3)]:opacity-10 [&:nth-of-type(4)]:opacity-100",
  }}
/>
```

### Variants

```tsx
<SpinnerSpin variant="default" />
<SpinnerSpin variant="primary" />
```

### Custom Colors

```tsx
<SpinnerSpin
  classNames={{
    shape:
      "[&:nth-of-type(1)]:bg-warning-background [&:nth-of-type(2)]:bg-success-background [&:nth-of-type(3)]:bg-accent-background [&:nth-of-type(4)]:bg-danger-background !opacity-100",
  }}
/>
```

### With Label

```tsx
<SpinnerSpin label="Loading..." />
```

## SpinnerBounce Props

```ts
interface SpinnerBounceProps {
  /** Loading text to display below the spinner */
  label?: string

  /** Custom styling for different parts of the spinner */
  classNames?: {
    base?: string
    container?: string
    shape?: string
    label?: string
  }

  /** Additional CSS class names */
  className?: string

  /** Spinner size variant */
  size?: "small" | "medium" | "large"

  /** Visual style variant */
  variant?: "default" | "primary"
}
```

## SpinnerSpin Props

```ts
interface SpinnerSpinProps {
  /** Loading text to display below the spinner */
  label?: string

  /** Custom styling for different parts of the spinner */
  classNames?: {
    base?: string
    container?: string
    shape?: string
    label?: string
  }

  /** Additional CSS class names */
  className?: string

  /** Spinner size variant */
  size?: "small" | "medium" | "large"

  /** Visual style variant */
  variant?: "default" | "primary"
}
```

- Defaults:
  - `size`: "medium"
  - `variant`: "default" (when not specified)
  - `label`: undefined

## Styling

- Both components use Tailwind CSS via `tailwind-variants` in `tv.ts`
- Customize using the `className` prop for overall styling
- Use `classNames` object for granular control over individual parts
- Available styling slots:
  - `base`: Root container element
  - `container`: Animation container
  - `shape`: Individual animated shapes
  - `label`: Text label element

## Custom Styling Examples

### Individual Shape Control (SpinnerSpin)

The `classNames.shape` property allows you to style each of the 4 animated shapes individually using nth-child selectors:

```tsx
<SpinnerSpin
  classNames={{
    shape:
      "[&:nth-of-type(1)]:bg-red-500 [&:nth-of-type(2)]:bg-blue-500 [&:nth-of-type(3)]:bg-green-500 [&:nth-of-type(4)]:bg-yellow-500",
  }}
/>
```

### Custom Container Sizing

```tsx
<SpinnerBounce
  classNames={{
    container: "h-8 w-8",
    shape: "h-2 w-2",
  }}
/>
```

## Size Specifications

### SpinnerBounce

- **Small**: 4px shapes, 16px container
- **Medium**: 6px shapes, 24px container
- **Large**: 8px shapes, 32px container

### SpinnerSpin

- **Small**: 16px container, ~5.33px shapes
- **Medium**: 24px container, 8px shapes
- **Large**: 32px container, ~10.67px shapes

## Best Practices

- Use `SpinnerBounce` for simple loading states with minimal visual complexity
- Use `SpinnerSpin` when you need more visual interest or custom color schemes
- Choose size based on the context: small for inline elements, large for full-page loading
- Provide descriptive labels for longer loading operations
- Use consistent spinner types throughout your application
- Consider the visual weight - larger spinners draw more attention

## Usage Guidelines

### When to Use SpinnerBounce

- Simple loading states
- Minimal design requirements
- Quick operations (< 3 seconds)
- When visual simplicity is preferred

### When to Use SpinnerSpin

- More prominent loading states
- When custom colors are needed
- Longer operations that benefit from more visual interest
- Dashboard and data-heavy interfaces

### Loading Text Guidelines

- Keep labels concise and actionable
- Use present participle verbs: "Loading...", "Saving...", "Processing..."
- Avoid generic "Please wait" in favor of specific actions
- Consider internationalization for user-facing text

## Accessibility

- Both components include `role="status"` for screen readers
- Default `aria-label="Loading"` provides context
- Custom labels are automatically used as accessible text
- Spinners are announced as status updates to assistive technologies

## Examples

### Button Loading State

```tsx
<button disabled={isLoading}>{isLoading ? <SpinnerBounce size="small" /> : "Save Changes"}</button>
```

### Full Page Loading

```tsx
<div className="flex min-h-screen items-center justify-center">
  <SpinnerSpin
    size="large"
    label="Loading your dashboard..."
    variant="primary"
  />
</div>
```

### Inline Loading

```tsx
<div className="flex items-center gap-2">
  <SpinnerBounce size="small" />
  <span>Fetching latest data...</span>
</div>
```

### Custom Themed Spinner

```tsx
<SpinnerSpin
  size="medium"
  classNames={{
    container: "drop-shadow-lg",
    shape:
      "!opacity-100 [&:nth-of-type(1)]:bg-gradient-to-r [&:nth-of-type(1)]:from-purple-500 [&:nth-of-type(1)]:to-pink-500",
  }}
  label="Processing..."
/>
```

## Animation Details

### SpinnerBounce

- Two shapes that bounce up and down in alternating sequence
- Uses CSS transforms for smooth animation
- Continuous loop with easing functions

### SpinnerSpin

- Four shapes arranged in a circular pattern
- Rotates continuously around the center
- Individual shapes can have different opacities and colors
- 360-degree rotation with consistent timing

## Notes

- Both spinners use CSS variables for dynamic sizing based on props
- Animations are optimized for performance using transforms
- Colors inherit from the theme system but can be overridden
- Shape count is fixed: 2 for SpinnerBounce, 4 for SpinnerSpin
- Labels are rendered below the spinner with consistent spacing
