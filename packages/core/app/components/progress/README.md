# Progress

A versatile progress indication component that provides both linear (ProgressBar) and circular (ProgressCircle) variants for visualizing completion ratios and ongoing processes.

## Import

```tsx
import { ProgressBar, ProgressCircle } from "@choiceform/design-system"
```

## Features

- **Dual Components**: Linear progress bar and circular progress indicator
- **Multiple Variants**: Theme-aware color variants (accent, default)
- **Dynamic Color System**: Smooth color blending based on progress value
- **Size Options**: Multiple size configurations for different contexts
- **State Support**: Indeterminate state for unknown duration processes
- **Striped Animation**: Moving texture for ongoing processes (ProgressBar only)
- **Value Display**: Optional percentage/value text display
- **Compound Pattern**: Flexible composition using sub-components
- **Accessibility**: Full ARIA support with proper progress indicators

## ProgressBar Usage

### Basic Progress Bar

```tsx
<ProgressBar value={45} showValue>
  <ProgressBar.Track>
    <ProgressBar.Connects />
  </ProgressBar.Track>
</ProgressBar>
```

### With Label

```tsx
<ProgressBar value={60} showValue>
  <ProgressBar.Label>Processing</ProgressBar.Label>
  <ProgressBar.Track>
    <ProgressBar.Connects />
  </ProgressBar.Track>
</ProgressBar>
```

### Sizes

```tsx
<ProgressBar size="small" value={60} showValue>
  <ProgressBar.Label>Small</ProgressBar.Label>
  <ProgressBar.Track>
    <ProgressBar.Connects />
  </ProgressBar.Track>
</ProgressBar>

<ProgressBar size="default" value={60} showValue>
  <ProgressBar.Label>Default</ProgressBar.Label>
  <ProgressBar.Track>
    <ProgressBar.Connects />
  </ProgressBar.Track>
</ProgressBar>

<ProgressBar size="large" value={60} showValue>
  <ProgressBar.Label>Large</ProgressBar.Label>
  <ProgressBar.Track>
    <ProgressBar.Connects />
  </ProgressBar.Track>
</ProgressBar>
```

### Variants

```tsx
<ProgressBar variant="accent" value={72} showValue>
  <ProgressBar.Label>Accent Theme</ProgressBar.Label>
  <ProgressBar.Track>
    <ProgressBar.Connects />
  </ProgressBar.Track>
</ProgressBar>

<ProgressBar variant="default" value={72} showValue>
  <ProgressBar.Label>Default Theme</ProgressBar.Label>
  <ProgressBar.Track>
    <ProgressBar.Connects />
  </ProgressBar.Track>
</ProgressBar>
```

### Striped and Indeterminate

```tsx
{/* Striped progress */}
<ProgressBar value={65} striped>
  <ProgressBar.Label>Transferring</ProgressBar.Label>
  <ProgressBar.Track>
    <ProgressBar.Connects />
  </ProgressBar.Track>
</ProgressBar>

{/* Indeterminate state */}
<ProgressBar indeterminate>
  <ProgressBar.Label>Loading</ProgressBar.Label>
  <ProgressBar.Track>
    <ProgressBar.Connects />
  </ProgressBar.Track>
</ProgressBar>
```

### Dynamic Color Based on Value

```tsx
{/* Evenly spaced colors */}
<ProgressBar
  value={value}
  variant="based-on-value"
  dynamicColors={["#ef4444", "#f59e0b", "#22c55e"]}
>
  <ProgressBar.Label showValue>Score</ProgressBar.Label>
  <ProgressBar.Track>
    <ProgressBar.Connects />
  </ProgressBar.Track>
</ProgressBar>

{/* Custom color stops */}
<ProgressBar
  value={value}
  variant="based-on-value"
  dynamicColors={[
    { at: 0, color: "#ef4444" },
    { at: 0.5, color: "#f59e0b" },
    { at: 1, color: "#22c55e" },
  ]}
>
  <ProgressBar.Label showValue>Health</ProgressBar.Label>
  <ProgressBar.Track>
    <ProgressBar.Connects />
  </ProgressBar.Track>
</ProgressBar>
```

## ProgressCircle Usage

### Basic Circular Progress

```tsx
<ProgressCircle value={72}>
  <ProgressCircle.Value />
</ProgressCircle>
```

### Different Sizes

```tsx
<ProgressCircle size={48} strokeWidth={4} value={64}>
  <ProgressCircle.Value />
</ProgressCircle>

<ProgressCircle size={64} value={64}>
  <ProgressCircle.Value />
</ProgressCircle>

<ProgressCircle size={96} strokeWidth={8} value={64}>
  <ProgressCircle.Value />
</ProgressCircle>
```

### Variants

```tsx
<ProgressCircle variant="accent" value={70}>
  <ProgressCircle.Value />
</ProgressCircle>

<ProgressCircle variant="default" value={70}>
  <ProgressCircle.Value />
</ProgressCircle>
```

### Dynamic Colors

```tsx
<ProgressCircle
  value={value}
  variant="based-on-value"
  dynamicColors={["#ef4444", "#f59e0b", "#22c55e"]}
>
  <ProgressCircle.Value />
</ProgressCircle>
```

## ProgressBar Props

```ts
interface ProgressBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
  /** Array of colors or color stops for dynamic color blending */
  dynamicColors?: Array<string | { at?: number; color: string }>
  
  /** Whether the progress is in indeterminate state */
  indeterminate?: boolean
  
  /** Maximum progress value */
  max?: number
  
  /** Minimum progress value */
  min?: number
  
  /** Whether to show the progress value as text */
  showValue?: boolean
  
  /** Progress bar size variant */
  size?: "small" | "large" | "default"
  
  /** Whether to show striped animation */
  striped?: boolean
  
  /** Current progress value */
  value?: number
  
  /** Visual style variant */
  variant?: "accent" | "default" | "based-on-value"
}
```

## ProgressCircle Props

```ts
interface ProgressCircleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
  /** Array of colors or color stops for dynamic color blending */
  dynamicColors?: Array<string | { at?: number; color: string }>
  
  /** Maximum progress value */
  max?: number
  
  /** Minimum progress value */
  min?: number
  
  /** Circle diameter in pixels */
  size?: number
  
  /** Stroke width in pixels (defaults to size / 16) */
  strokeWidth?: number
  
  /** Current progress value */
  value?: number
  
  /** Visual style variant */
  variant?: "accent" | "default" | "based-on-value"
}
```

- Defaults:
  - ProgressBar: `size`: "default", `variant`: "accent", `value`: 0, `min`: 0, `max`: 100
  - ProgressCircle: `size`: 64, `strokeWidth`: size / 16, `variant`: "accent", `value`: 0, `min`: 0, `max`: 100

## Sub-components

### ProgressBar Sub-components

- **ProgressBar.Label**: Displays label text with optional value display
- **ProgressBar.Track**: Container for the progress indicator
- **ProgressBar.Connects**: The filled portion of the progress bar

### ProgressCircle Sub-components

- **ProgressCircle.Value**: Displays the percentage value inside the circle

## Styling

- Both components use Tailwind CSS via `tailwind-variants` in `tv.ts`
- Customize using the `className` prop; classes are merged with internal classes
- ProgressBar slots: `root`, `label`, `labelWrapper`, `value`, `track`, `connects`
- ProgressCircle slots: `root`, `svg`, `track`, `fill`, `value`

## Best practices

- Use ProgressBar for linear processes and file uploads
- Use ProgressCircle for compact spaces and dashboard widgets
- Choose `indeterminate` when duration is unknown
- Use `striped` for ongoing processes that need visual activity
- Select appropriate sizes based on visual hierarchy and available space
- Use dynamic colors to convey semantic meaning (red=low, green=high)
- Provide meaningful labels for screen readers

## Usage Guidelines

### When to Use ProgressBar
- File uploads and downloads
- Form completion progress
- Multi-step processes
- When horizontal space is available

### When to Use ProgressCircle
- Dashboard widgets and cards
- Compact progress indicators
- Circular layouts and designs
- When space is constrained

### Dynamic Color System
- Use evenly spaced colors for simple gradients
- Use custom stops with `at` values for precise control
- Colors are smoothly interpolated using tinycolor2
- Supports both hex colors and named colors

## Accessibility

- Both components expose proper ARIA attributes: `role="progressbar"`, `aria-valuemin/max/now`
- `indeterminate` state omits value attributes as progress is unknown
- Value text is announced to screen readers
- Support for custom `aria-label` attributes

## Examples

### File Upload Progress

```tsx
<ProgressBar 
  value={uploadProgress} 
  showValue
  striped={isUploading}
>
  <ProgressBar.Label>Uploading files...</ProgressBar.Label>
  <ProgressBar.Track>
    <ProgressBar.Connects />
  </ProgressBar.Track>
</ProgressBar>
```

### Health Score Indicator

```tsx
<ProgressCircle
  value={healthScore}
  variant="based-on-value"
  dynamicColors={[
    { at: 0, color: "#dc2626" },    // Red for low
    { at: 0.5, color: "#f59e0b" },  // Orange for medium
    { at: 1, color: "#16a34a" },    // Green for high
  ]}
>
  <ProgressCircle.Value />
</ProgressCircle>
```

### Loading State

```tsx
<ProgressBar indeterminate>
  <ProgressBar.Label>Processing your request...</ProgressBar.Label>
  <ProgressBar.Track>
    <ProgressBar.Connects />
  </ProgressBar.Track>
</ProgressBar>
```

## Notes

- The `based-on-value` variant requires `dynamicColors` to be specified
- Color interpolation is performed using tinycolor2 for smooth transitions
- Both components support controlled and uncontrolled usage patterns
- Progress values are automatically clamped between `min` and `max`
- The `striped` effect is only available on ProgressBar