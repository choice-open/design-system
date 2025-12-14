# OTP Input

A one-time password input component for verification codes. Built on top of `input-otp` library with custom styling and compound component pattern.

## Import

```tsx
import { OtpInput } from "@choice-ui/react"
```

## Features

- Compound component pattern for flexible layout
- Multiple visual variants (default, light, dark)
- Disabled and invalid states
- Customizable separators
- Input pattern validation (numbers, alphanumeric)
- Animated caret indicator
- Keyboard and screen-reader friendly

## Usage

### Basic

```tsx
<OtpInput maxLength={6}>
  <OtpInput.Group>
    <OtpInput.Slot index={0} />
    <OtpInput.Slot index={1} />
    <OtpInput.Slot index={2} />
  </OtpInput.Group>
  <OtpInput.Separator />
  <OtpInput.Group>
    <OtpInput.Slot index={3} />
    <OtpInput.Slot index={4} />
    <OtpInput.Slot index={5} />
  </OtpInput.Group>
</OtpInput>
```

### Controlled

```tsx
const [value, setValue] = useState("")

<OtpInput
  maxLength={6}
  value={value}
  onChange={setValue}
  onComplete={(code) => console.log("Complete:", code)}
>
  <OtpInput.Group>
    <OtpInput.Slot index={0} />
    <OtpInput.Slot index={1} />
    <OtpInput.Slot index={2} />
    <OtpInput.Slot index={3} />
    <OtpInput.Slot index={4} />
    <OtpInput.Slot index={5} />
  </OtpInput.Group>
</OtpInput>
```

### Variants

```tsx
<OtpInput variant="default" maxLength={4}>...</OtpInput>
<OtpInput variant="light" maxLength={4}>...</OtpInput>
<OtpInput variant="dark" maxLength={4}>...</OtpInput>
```

### States

```tsx
<OtpInput disabled maxLength={4}>...</OtpInput>
<OtpInput isInvalid maxLength={4}>...</OtpInput>
```

### Input patterns

```tsx
// Numbers only (default)
<OtpInput maxLength={6} inputMode="numeric" pattern={REGEXP_ONLY_DIGITS}>
  ...
</OtpInput>

// Alphanumeric
<OtpInput maxLength={6} inputMode="text" pattern={REGEXP_ONLY_CHARS}>
  ...
</OtpInput>
```

### Custom separator

```tsx
<OtpInput maxLength={6}>
  <OtpInput.Group>
    <OtpInput.Slot index={0} />
    <OtpInput.Slot index={1} />
    <OtpInput.Slot index={2} />
  </OtpInput.Group>
  <OtpInput.Separator>
    <span>•</span>
  </OtpInput.Separator>
  <OtpInput.Group>
    <OtpInput.Slot index={3} />
    <OtpInput.Slot index={4} />
    <OtpInput.Slot index={5} />
  </OtpInput.Group>
</OtpInput>
```

## Props

### OtpInput (Root)

```ts
interface OTPInputRootProps {
  /** Maximum number of characters */
  maxLength: number

  /** Current value */
  value?: string

  /** Callback when value changes */
  onChange?: (value: string) => void

  /** Callback when all slots are filled */
  onComplete?: (value: string) => void

  /** Visual style variant */
  variant?: "default" | "light" | "dark"

  /** Whether the input is disabled */
  disabled?: boolean

  /** Whether the input is in invalid state */
  isInvalid?: boolean

  /** Additional class for the container */
  className?: string

  /** Additional class for the hidden input */
  inputClassName?: string

  /** Input pattern for validation */
  pattern?: string

  /** Input mode for keyboard */
  inputMode?: "numeric" | "text"

  /** Children (groups, slots, separators) */
  children: ReactNode
}
```

### OtpInput.Group

```ts
interface OTPInputGroupProps extends ComponentProps<"div"> {}
```

### OtpInput.Slot

```ts
interface OTPInputSlotProps extends ComponentProps<"div"> {
  /** Index of this slot (0-based) */
  index: number
}
```

### OtpInput.Separator

```ts
interface OTPInputSeparatorProps extends ComponentProps<"div"> {
  /** Custom separator content (default: "-") */
  children?: ReactNode
}
```

## Styling

- Uses Tailwind CSS via `tailwind-variants` in `tv.ts`
- Customize using the `className` prop on each sub-component
- Caret animation is bundled via CSS Module

## Accessibility

- Built on `input-otp` library with accessibility features
- Proper keyboard navigation between slots
- Screen reader compatible
- Supports paste from clipboard

## Best practices

- Use appropriate `inputMode` for the expected input type
- Provide visual feedback for invalid states
- Use `onComplete` callback to trigger verification
- Consider showing remaining attempts for verification codes
