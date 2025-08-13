# Range

A customizable slider component that allows users to select numeric values within a specified range, with support for step intervals, default value indicators, and responsive sizing.

## Import

```tsx
import { Range } from "@choiceform/design-system"
```

## Features

- Customizable minimum and maximum values
- Optional step intervals with visual tick marks
- Default value indicator with snap effect
- Configurable track and thumb sizes
- Support for negative value ranges
- Disabled state support
- Controlled and uncontrolled usage patterns
- Automatic and fixed width sizing options
- Smooth drag interaction with pointer capture
- Keyboard navigation support (arrow keys, Shift+arrow for 10x steps)
- Proper accessibility with ARIA attributes

## Usage

### Basic

```tsx
import { useState } from "react"

const [value, setValue] = useState(0)

<Range
  value={value}
  onChange={setValue}
/>
```

### With negative range

```tsx
const [value, setValue] = useState(0)

<Range
  value={value}
  onChange={setValue}
  min={-100}
  max={100}
  defaultValue={0}
/>
```

### With step marks

```tsx
const [value, setValue] = useState(0)

<Range
  value={value}
  onChange={setValue}
  min={0}
  max={100}
  step={10}
/>
```

### With default value indicator

```tsx
const [value, setValue] = useState(10)

<Range
  value={value}
  onChange={setValue}
  min={0}
  max={100}
  defaultValue={50}
/>
```

### Combined step marks and default value

```tsx
const [value, setValue] = useState(10)

<Range
  value={value}
  onChange={setValue}
  min={0}
  max={100}
  defaultValue={50}
  step={10}
/>
```

### Disabled

```tsx
const [value, setValue] = useState(50)

<Range
  value={value}
  onChange={setValue}
  min={0}
  max={100}
  disabled
/>
```

### Custom sizing

```tsx
const [value, setValue] = useState(50)

<Range
  value={value}
  onChange={setValue}
  min={0}
  max={100}
  trackSize={{
    width: 200,
    height: 10,
  }}
  thumbSize={10}
/>
```

### Auto width

```tsx
const [value, setValue] = useState(0)

<div className="w-40">
  <Range
    value={value}
    onChange={setValue}
    min={0}
    max={100}
    trackSize={{
      width: "auto",
      height: 6,
    }}
    thumbSize={10}
  />
</div>
```

### In a popover

```tsx
import { Popover, Button } from "@choiceform/design-system"

const [value, setValue] = useState(0)

<Popover draggable>
  <Popover.Trigger>
    <Button>Settings</Button>
  </Popover.Trigger>
  <Popover.Header title="Adjust Value" />
  <Popover.Content className="grid w-64 grid-cols-[180px_auto] gap-2 p-3">
    <Range
      className="flex-1"
      value={value}
      onChange={setValue}
      min={0}
      max={100}
      defaultValue={50}
      trackSize={{
        width: 180,
        height: 16,
      }}
    />
    <div className="w-10 flex-1 text-right">{value}%</div>
  </Popover.Content>
</Popover>
```

### With numeric input

```tsx
import { NumericInput } from "@choiceform/design-system"

const [value, setValue] = useState(0)

<div className="grid w-40 grid-cols-[1fr_2.5rem] gap-px">
  <div className="bg-secondary-background flex items-center rounded-l-md px-2">
    <Range
      className="bg-default-boundary flex-1"
      value={value}
      onChange={setValue}
      min={0}
      max={100}
      trackSize={{
        width: "auto",
        height: 6,
      }}
      thumbSize={10}
    />
  </div>
  <NumericInput
    className="before:rounded-l-none"
    expression="{value}%"
    value={value}
    onChange={(value) => setValue(value as number)}
    min={0}
    max={100}
  >
    <NumericInput.Prefix className="w-2 rounded-l-none" />
  </NumericInput>
</div>
```

## Props

```ts
interface RangeProps {
  /** Additional CSS class names */
  className?: string

  /** Custom styling for positive and negative value connections */
  connectsClassName?: {
    negative?: string
    positive?: string
  }

  /** Default value indicator position (not initial value) */
  defaultValue?: number

  /** Whether the range is disabled */
  disabled?: boolean

  /** Maximum value */
  max?: number

  /** Minimum value */
  min?: number

  /** Callback fired when value changes during drag */
  onChange?: (value: number) => void

  /** Callback fired when drag ends */
  onChangeEnd?: () => void

  /** Callback fired when drag starts */
  onChangeStart?: () => void

  /** Step interval for discrete values */
  step?: number

  /** Size of the thumb/handle */
  thumbSize?: number

  /** Track dimensions */
  trackSize?: {
    height?: number
    width?: number | "auto"
  }

  /** Current value */
  value?: number
}
```

- Defaults:
  - `min`: 0
  - `max`: 100
  - `step`: 1
  - `disabled`: false
  - `connectsClassName`: `{ positive: "bg-accent-background", negative: "bg-accent-background" }`
  - `trackSize`: `{ width: 256, height: 16 }`
  - `thumbSize`: 14

- Accessibility:
  - Keyboard navigation with arrow keys
  - Shift+arrow for 10x step movement
  - Focus management and visible focus states
  - Proper ARIA attributes for screen readers
  - Touch-friendly interaction

## Styling

- This component uses Tailwind CSS via `tailwind-variants` in `tv.ts` to create variants and slots.
- Customize using the `className` prop and `connectsClassName` for the fill area.
- Slots available in `tv.ts`: `container`, `connect`, `thumb`, `dotContainer`, `dot`, `input`.

## Best practices

- Use for selecting values from a continuous or stepped range
- Provide appropriate min, max, and step values for your use case
- Consider using step marks for discrete values or important intervals
- Display the current value for better usability (often alongside the slider)
- Use `defaultValue` to indicate recommended or factory settings
- Specify explicit width for consistent appearance, or use "auto" for responsive layouts
- Provide `onChangeStart` and `onChangeEnd` for expensive operations
- Consider snap behavior with `defaultValue` for important reference points

## Examples

### Volume control

```tsx
const [volume, setVolume] = useState(50)

<div className="flex items-center gap-3">
  <span>🔉</span>
  <Range
    value={volume}
    onChange={setVolume}
    min={0}
    max={100}
    trackSize={{ width: 120, height: 6 }}
    thumbSize={12}
  />
  <span className="w-8 text-right text-sm">{volume}</span>
</div>
```

### Color opacity

```tsx
const [opacity, setOpacity] = useState(100)

<div className="space-y-2">
  <label>Opacity: {opacity}%</label>
  <Range
    value={opacity}
    onChange={setOpacity}
    min={0}
    max={100}
    step={5}
    defaultValue={100}
  />
</div>
```

### Temperature range

```tsx
const [temp, setTemp] = useState(20)

<div className="space-y-2">
  <label>Temperature: {temp}°C</label>
  <Range
    value={temp}
    onChange={setTemp}
    min={-10}
    max={40}
    defaultValue={20}
    connectsClassName={{
      negative: "bg-blue-400",
      positive: "bg-red-400"
    }}
  />
</div>
```

### Zoom level with steps

```tsx
const [zoom, setZoom] = useState(100)

<div className="space-y-2">
  <label>Zoom: {zoom}%</label>
  <Range
    value={zoom}
    onChange={setZoom}
    min={25}
    max={400}
    step={25}
    defaultValue={100}
  />
</div>
```

### Responsive width

```tsx
const [value, setValue] = useState(75)

<div className="w-full max-w-md">
  <div className="mb-2 flex justify-between">
    <span>Progress</span>
    <span>{value}%</span>
  </div>
  <Range
    value={value}
    onChange={setValue}
    trackSize={{ width: "auto", height: 8 }}
    thumbSize={16}
  />
</div>
```

## Notes

- When `defaultValue` is provided without steps, it shows as a visual indicator and provides snap behavior
- With steps, `defaultValue` is rounded to the nearest step value
- The component uses pointer capture for smooth dragging across the entire screen
- Auto-width calculation uses ResizeObserver for responsive behavior
- Negative ranges show different visual styling for values below zero
- Loading states and validation can be handled in the `onChange` callback
- The component is optimized for performance with proper memoization of expensive calculations