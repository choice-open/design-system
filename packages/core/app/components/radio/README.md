# Radio

A form control component that allows users to select exactly one option from a set, with multiple visual variants and comprehensive group functionality.

## Import

```tsx
import { Radio, RadioGroup } from "@choiceform/design-system"
```

## Features

- Multiple visual variants (default, accent, outline)
- Support for disabled and focused states
- Two label approaches: simple string children or explicit `Radio.Label` for complex content
- Controlled usage for reliable state management
- Group functionality via `RadioGroup` component with two usage patterns
- Proper keyboard navigation (arrow keys within groups)
- Screen reader accessibility with proper ARIA attributes
- Individual and group-level disabled options

## Usage

### Basic Radio

```tsx
import { useState } from "react"

const [selected, setSelected] = useState(false)

<Radio
  value={selected}
  onChange={setSelected}
>
  Option Label
</Radio>
```

### Visual Variants

```tsx
const [selections, setSelections] = useState({
  default: false,
  accent: false,
  outline: false,
})

<>
  <Radio
    value={selections.default}
    onChange={(value) => setSelections({ ...selections, default: value })}
  >
    Default
  </Radio>
  <Radio
    value={selections.accent}
    onChange={(value) => setSelections({ ...selections, accent: value })}
    variant="accent"
  >
    Accent
  </Radio>
  <Radio
    value={selections.outline}
    onChange={(value) => setSelections({ ...selections, outline: value })}
    variant="outline"
  >
    Outline
  </Radio>
</>
```

### States

```tsx
<>
  <Radio value={false} onChange={() => {}}>Rest</Radio>
  <Radio value={false} onChange={() => {}} focused>Focused</Radio>
  <Radio value={false} onChange={() => {}} disabled>Disabled</Radio>
</>
```

### Label Usage

```tsx
const [simple, setSimple] = useState(false)
const [complex, setComplex] = useState(false)

<>
  {/* Simple string label (auto-wrapped) */}
  <Radio value={simple} onChange={setSimple}>
    Simple text label
  </Radio>

  {/* Explicit Radio.Label for complex content */}
  <Radio value={complex} onChange={setComplex}>
    <Radio.Label>
      <span className="text-accent-foreground">Complex</span> label with{" "}
      <strong>formatting</strong>
    </Radio.Label>
  </Radio>
</>
```

### RadioGroup with Options

```tsx
const [selected, setSelected] = useState("option1")

const options = [
  { value: "option1", label: "First Option" },
  { value: "option2", label: "Second Option" },
  { value: "option3", label: "Third Option" },
]

<RadioGroup
  options={options}
  value={selected}
  onChange={setSelected}
/>
```

### RadioGroup with Items

```tsx
const [selected, setSelected] = useState("choice1")

<RadioGroup
  value={selected}
  onChange={setSelected}
>
  <RadioGroup.Item value="choice1">
    First Choice
  </RadioGroup.Item>
  <RadioGroup.Item value="choice2">
    Second Choice
  </RadioGroup.Item>
  <RadioGroup.Item value="choice3">
    Third Choice
  </RadioGroup.Item>
</RadioGroup>
```

### Group with Variants

```tsx
const [variant, setVariant] = useState("default")

<RadioGroup
  variant={variant as "default" | "accent" | "outline"}
  value={variant}
  onChange={setVariant}
>
  <RadioGroup.Item value="default">Default</RadioGroup.Item>
  <RadioGroup.Item value="accent">Accent</RadioGroup.Item>
  <RadioGroup.Item value="outline">Outline</RadioGroup.Item>
</RadioGroup>
```

### Group with Disabled Options

```tsx
// Using options prop
const optionsWithDisabled = [
  { value: "available1", label: "Available Option", disabled: false },
  { value: "disabled1", label: "Disabled Option", disabled: true },
  { value: "available2", label: "Another Available", disabled: false },
]

const [selected1, setSelected1] = useState("available1")

<RadioGroup
  options={optionsWithDisabled}
  value={selected1}
  onChange={setSelected1}
/>

// Using RadioGroup.Item with individual disabled control
const [selected2, setSelected2] = useState("custom1")

<RadioGroup
  value={selected2}
  onChange={setSelected2}
>
  <RadioGroup.Item value="custom1">Available Choice</RadioGroup.Item>
  <RadioGroup.Item value="custom2" disabled>Disabled Choice</RadioGroup.Item>
  <RadioGroup.Item value="custom3">Another Available</RadioGroup.Item>
</RadioGroup>
```

## Props

### Radio Props

```ts
interface RadioProps extends Omit<HTMLProps<HTMLInputElement>, "value" | "onChange"> {
  /** Radio content - string is auto-wrapped with Radio.Label */
  children?: ReactNode

  /** Additional CSS class names */
  className?: string

  /** Whether the radio appears focused (for keyboard navigation) */
  focused?: boolean

  /** Callback fired when radio value changes */
  onChange: (value: boolean) => void

  /** Current radio value */
  value: boolean

  /** Visual style variant */
  variant?: "default" | "accent" | "outline"
}
```

### RadioGroup Props

```ts
interface RadioGroupProps {
  /** Additional CSS class names */
  className?: string

  /** Radio group content (RadioGroup.Item components) */
  children?: ReactNode

  /** Array of option objects (alternative to children) */
  options?: Array<{
    value: string
    label: string
    disabled?: boolean
  }>

  /** Callback fired when selection changes */
  onChange: (value: string) => void

  /** Current selected value */
  value: string

  /** Visual variant applied to all radios in the group */
  variant?: "default" | "accent" | "outline"
}

interface RadioGroupItemProps {
  /** Radio content */
  children: ReactNode

  /** Whether this option is disabled */
  disabled?: boolean

  /** Option value */
  value: string
}
```

- Defaults:
  - `variant`: "default"
  - `focused`: `false`
  - `disabled`: `false` (inherited from native prop)

- Accessibility:
  - Uses proper `role="radio"` and `aria-checked` attributes
  - Keyboard navigation with arrow keys in RadioGroups
  - Proper focus management and visible focus states
  - Label association for screen readers
  - Group semantics with fieldset/legend pattern in RadioGroup

## Styling

- Components use Tailwind CSS via `tailwind-variants` in shared checkbox/tv.ts.
- Customize using the `className` prop; classes are merged with internal classes.
- Radio uses the checkbox TV with `type: "radio"` for rounded appearance.
- Variants affect fill color, border, and focus states.

## Best practices

- Use RadioGroup for related options that require exactly one selection
- Provide clear, concise labels for each option
- Always show all available options (unlike dropdowns)
- Use appropriate variants based on visual hierarchy and importance
- For simple labels, use string children; for complex content, use `Radio.Label`
- Consider disabled options when choices are conditionally unavailable
- Ensure at least one option remains selectable in groups
- Provide feedback about why options might be disabled

## Examples

### Settings form

```tsx
const [theme, setTheme] = useState("light")
const [notifications, setNotifications] = useState("email")

<div className="space-y-6">
  <fieldset>
    <legend className="mb-3 font-medium">Theme Preference</legend>
    <RadioGroup
      variant="accent"
      value={theme}
      onChange={setTheme}
    >
      <RadioGroup.Item value="light">Light Theme</RadioGroup.Item>
      <RadioGroup.Item value="dark">Dark Theme</RadioGroup.Item>
      <RadioGroup.Item value="auto">Auto (System)</RadioGroup.Item>
    </RadioGroup>
  </fieldset>

  <fieldset>
    <legend className="mb-3 font-medium">Notifications</legend>
    <RadioGroup
      value={notifications}
      onChange={setNotifications}
    >
      <RadioGroup.Item value="email">Email Only</RadioGroup.Item>
      <RadioGroup.Item value="push">Push Notifications</RadioGroup.Item>
      <RadioGroup.Item value="both">Email + Push</RadioGroup.Item>
      <RadioGroup.Item value="none" disabled>
        None (Requires Premium)
      </RadioGroup.Item>
    </RadioGroup>
  </fieldset>
</div>
```

### Payment method selection

```tsx
const [paymentMethod, setPaymentMethod] = useState("card")

<fieldset className="space-y-3">
  <legend className="text-lg font-semibold">Payment Method</legend>
  
  <RadioGroup
    variant="outline"
    value={paymentMethod}
    onChange={setPaymentMethod}
  >
    <RadioGroup.Item value="card">
      <Radio.Label>
        <div className="flex items-center gap-2">
          <span>💳</span>
          <div>
            <div className="font-medium">Credit Card</div>
            <div className="text-sm text-secondary-foreground">
              Visa, Mastercard, American Express
            </div>
          </div>
        </div>
      </Radio.Label>
    </RadioGroup.Item>
    
    <RadioGroup.Item value="paypal">
      <Radio.Label>
        <div className="flex items-center gap-2">
          <span>🅿️</span>
          <div>
            <div className="font-medium">PayPal</div>
            <div className="text-sm text-secondary-foreground">
              Pay with your PayPal account
            </div>
          </div>
        </div>
      </Radio.Label>
    </RadioGroup.Item>
    
    <RadioGroup.Item value="bank" disabled>
      <Radio.Label>
        <div className="flex items-center gap-2">
          <span>🏦</span>
          <div>
            <div className="font-medium">Bank Transfer</div>
            <div className="text-sm text-secondary-foreground">
              Currently unavailable
            </div>
          </div>
        </div>
      </Radio.Label>
    </RadioGroup.Item>
  </RadioGroup>
</fieldset>
```

### Quiz question

```tsx
const [answer, setAnswer] = useState<string>("")

<div className="space-y-4">
  <h3 className="font-medium">What is the capital of France?</h3>
  
  <RadioGroup
    value={answer}
    onChange={setAnswer}
    options={[
      { value: "london", label: "London" },
      { value: "berlin", label: "Berlin" },
      { value: "paris", label: "Paris" },
      { value: "madrid", label: "Madrid" },
    ]}
  />
  
  {answer && (
    <p className="text-sm text-secondary-foreground">
      Selected: {answer}
    </p>
  )}
</div>
```

## Notes

- Radio buttons enforce single selection within a group (use Checkbox for multiple selections)
- String children are automatically wrapped with `Radio.Label` for consistent styling
- `RadioGroup` manages state and provides proper keyboard navigation between options
- Use the `options` prop for simple cases, `RadioGroup.Item` children for complex layouts
- Disabled options maintain visual presence but prevent interaction
- The component follows native radio button behavior with enhanced styling and accessibility
- Focus management ensures proper keyboard navigation within groups