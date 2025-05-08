# NumericInput

A versatile numeric input component that supports value formatting, expression evaluation, and rich interaction patterns.

## Features

- 🔢 **Numeric Value Handling**: Supports different types of numeric values with validation
- 🧮 **Math Expression Evaluation**: Allows users to input mathematical expressions (e.g., `1+2*3`)
- 🏷️ **Unit Format Support**: Displays values with units (e.g., `100px`, `50%`)
- 🎛️ **Custom Constraints**: Min/max boundaries, step increments, decimal precision
- ⌨️ **Keyboard Navigation**: Arrow keys with modifier support for value adjustments
- 🖱️ **Drag Interaction**: Click and drag to adjust values
- 🧩 **Multiple Value Formats**: Support for simple numbers, arrays, and object structures
- 🎯 **Variable Value Support**: Bind to dynamic values with visual indication

## Installation

```bash
# If using npm
npm install @choiceform/design-system

# If using yarn
yarn add @choiceform/design-system

# If using pnpm
pnpm add @choiceform/design-system
```

## Basic Usage

```tsx
import { NumericInput } from "@choiceform/design-system"
import { useState } from "react"

function Example() {
  const [value, setValue] = useState(10)

  return (
    <NumericInput
      value={value}
      onChange={(newValue) => setValue(newValue as number)}
    />
  )
}
```

## With Units

```tsx
import { NumericInput } from "@choiceform/design-system"
import { useState } from "react"

function Example() {
  const [value, setValue] = useState(100)

  return (
    <NumericInput
      value={value}
      expression="{value}px"
      onChange={(newValue) => setValue(newValue as number)}
    />
  )
}
```

## Compound Values

```tsx
import { NumericInput } from "@choiceform/design-system"
import { useState } from "react"

function Example() {
  const [value, setValue] = useState({ width: 100, height: 200 })

  return (
    <NumericInput
      value={value}
      expression="{width}px, {height}px"
      onChange={(newValue) => setValue(newValue as { width: number; height: number })}
    />
  )
}
```

## Custom Prefix/Suffix

```tsx
import { NumericInput } from "@choiceform/design-system"
import { HugWidth, Relative } from "@choiceform/icons-react"
import { useState } from "react"

function Example() {
  const [value, setValue] = useState(100)

  return (
    <NumericInput
      value={value}
      onChange={(newValue) => setValue(newValue as number)}
    >
      <NumericInput.Prefix>
        <HugWidth />
      </NumericInput.Prefix>
      <NumericInput.Suffix>
        <Relative />
      </NumericInput.Suffix>
    </NumericInput>
  )
}
```

## Variable Values

```tsx
import { NumericInput } from "@choiceform/design-system"
import { useState } from "react"

function Example() {
  const [value, setValue] = useState<number | undefined>(undefined)
  const [variableValue, setVariableValue] = useState(10)

  return (
    <NumericInput
      value={value}
      onChange={(newValue) => setValue(newValue as number)}
    >
      {value === undefined && <NumericInput.Variable value={variableValue} />}
    </NumericInput>
  )
}
```

## Dropdown Menu Integration

```tsx
import { NumericInput } from "@choiceform/design-system"
import { Dropdown, IconButton } from "@choiceform/design-system"
import { ChevronDownSmall } from "@choiceform/icons-react"
import { useState } from "react"

function Example() {
  const [value, setValue] = useState(10)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <NumericInput
      focused={menuOpen}
      value={value}
      onChange={(newValue) => setValue(newValue as number)}
    >
      <NumericInput.Suffix type="menu">
        <Dropdown
          open={menuOpen}
          onOpenChange={setMenuOpen}
          placement="bottom"
        >
          <Dropdown.Trigger asChild>
            <IconButton className="rounded-l-none">
              <ChevronDownSmall />
            </IconButton>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Option 1</Dropdown.Item>
            <Dropdown.Item>Option 2</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </NumericInput.Suffix>
    </NumericInput>
  )
}
```

## API Reference

### NumericInput Props

| Prop           | Type                                                                  | Default     | Description                                       |
| -------------- | --------------------------------------------------------------------- | ----------- | ------------------------------------------------- |
| `value`        | `number \| string \| Record<string, number> \| number[] \| undefined` | -           | The current value of the input                    |
| `defaultValue` | `number \| string \| Record<string, number> \| number[] \| undefined` | -           | Default value (for uncontrolled mode)             |
| `onChange`     | `(value: NumericInputValue, detail: NumberResult) => void`            | -           | Callback when value changes                       |
| `onEmpty`      | `() => void`                                                          | -           | Callback when input is cleared                    |
| `expression`   | `string`                                                              | -           | Pattern for formatted values, e.g., `"{value}px"` |
| `min`          | `number`                                                              | -           | Minimum allowed value                             |
| `max`          | `number`                                                              | -           | Maximum allowed value                             |
| `step`         | `number`                                                              | `1`         | Step increment for arrow keys and drag            |
| `shiftStep`    | `number`                                                              | `10`        | Step increment when Shift key is pressed          |
| `decimal`      | `number`                                                              | -           | Number of decimal places to display               |
| `disabled`     | `boolean`                                                             | `false`     | Disables the input                                |
| `readOnly`     | `boolean`                                                             | `false`     | Makes the input read-only                         |
| `selected`     | `boolean`                                                             | `false`     | Sets selected visual state                        |
| `focused`      | `boolean`                                                             | `false`     | Sets focused visual state                         |
| `variant`      | `"default" \| "dark"`                                                 | `"default"` | Visual variant                                    |

### NumericInput.Prefix

Container for prefix content (typically icons or labels).

### NumericInput.Suffix

Container for suffix content (e.g., units, icons, or menus).

| Prop   | Type                              | Default     | Description    |
| ------ | --------------------------------- | ----------- | -------------- |
| `type` | `"default" \| "menu" \| "action"` | `"default"` | Type of suffix |

### NumericInput.Variable

Displays a variable value when the main input is undefined.

| Prop    | Type               | Default | Description                   |
| ------- | ------------------ | ------- | ----------------------------- |
| `value` | `number \| string` | -       | The variable value to display |

### NumericInput.ActionPrompt

Displays a prompt for action-related text.

### NumericInput.MenuTrigger

A button that triggers menu dropdowns.

| Prop   | Type                 | Default  | Description          |
| ------ | -------------------- | -------- | -------------------- |
| `type` | `"menu" \| "action"` | `"menu"` | Type of menu trigger |

## Using the useNumericInput Hook

For advanced customization, you can use the underlying hook directly:

```tsx
import { useNumericInput } from "@choiceform/design-system"
import { useState } from "react"

function CustomNumericInput() {
  const [value, setValue] = useState(50)

  const { inputProps, handlerProps } = useNumericInput({
    value,
    min: 0,
    max: 100,
    step: 5,
    onChange: (newValue) => setValue(newValue as number),
  })

  return (
    <div className="flex items-center gap-2">
      <input
        {...inputProps}
        className="w-24 rounded border px-2 py-1"
      />
      <div
        {...handlerProps}
        className="cursor-ew-resize select-none px-2"
      >
        ⟷
      </div>
    </div>
  )
}
```

## Keyboard Shortcuts

| Key                             | Action                                      |
| ------------------------------- | ------------------------------------------- |
| `↑` / `↓`                       | Increase/decrease by step value             |
| `Shift + ↑` / `Shift + ↓`       | Increase/decrease by shiftStep value        |
| `Meta/Alt + ↑` / `Meta/Alt + ↓` | Increase/decrease by 1 (regardless of step) |
| `Enter`                         | Confirm the value                           |
| `Escape`                        | Reset to previous value when editing        |

## Expression Format Examples

| Expression                     | Example Value               | Display                                      |
| ------------------------------ | --------------------------- | -------------------------------------------- |
| `"{value}px"`                  | `100`                       | "100px"                                      |
| `"{width}x{height}"`           | `{width: 100, height: 200}` | "100x200"                                    |
| `"{value1},{value2},{value3}"` | `[10, 20, 30]`              | "10,20,30"                                   |
| `"{value1}{value2,hidden}"`    | `[10, 10]`                  | "10" (second value hidden because identical) |

## Best Practices

1. Use appropriate constraints (`min`, `max`, `step`) for better UX
2. Provide clear prefix/suffix elements to indicate the value type or unit
3. For complex formatted values, always use the expression pattern
4. When using variables, make sure to handle undefined values appropriately
5. For linked inputs (like RGB color), each input should update a shared state

## Accessibility

- Supports keyboard navigation and interaction
- Works with screen readers through proper ARIA attributes
- Visual feedback for error states, focus, and selection
- Maintains correct tab order in complex scenarios

## Dark Mode

Use the `variant="dark"` prop for dark backgrounds.

```tsx
<NumericInput
  variant="dark"
  value={value}
  onChange={setValue}
/>
```
