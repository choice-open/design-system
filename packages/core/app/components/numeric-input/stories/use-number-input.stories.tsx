import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { useNumericInput } from "../hooks/use-numeric-input"

const meta: Meta = {
  title: "NumericInput/useNumericInput",
}

export default meta

/**
 * A basic implementation of a number input field showcasing the core features of useIfNumberInput:
 *
 * Features:
 * - Basic number input functionality
 * - Drag-to-adjust value
 * - Real-time value updates
 * - Simple styling customization
 *
 * This example demonstrates how to create a basic number input component with an input field and drag handle.
 */
export const Basic: StoryObj = {
  render: function BasicStory() {
    const [value, setValue] = useState<number>(0)
    const { inputProps, handlerProps } = useNumericInput({
      value,
      onChange: (newValue) => setValue(newValue as number),
    })

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <input
            {...inputProps}
            className="w-24 rounded border border-gray-300 px-2 py-1"
            placeholder="Enter number"
          />
          <div
            {...handlerProps}
            className="cursor-ew-resize px-4 select-none"
          >
            ⟷
          </div>
        </div>
        <div>Current value: {value}</div>
      </div>
    )
  },
}

/**
 * Demonstrates how to use expression patterns for handling values with units:
 *
 * Features:
 * - Support for values with units (e.g., "100px")
 * - Automatic parsing and formatting of unit values
 * - Unit format preservation during drag operations
 * - Custom expression pattern support
 *
 * This example shows how to handle numeric inputs with units, such as pixels or percentages.
 */
export const Expression: StoryObj = {
  render: function ExpressionStory() {
    const [value, setValue] = useState("100px")
    const { inputProps, handlerProps } = useNumericInput({
      value,
      expression: "{value}px",
      onChange: (newValue) => setValue(newValue as string),
    })

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <input
            {...inputProps}
            className="w-24 rounded border border-gray-300 px-2 py-1"
            placeholder="Enter value"
          />
          <div
            {...handlerProps}
            className="cursor-ew-resize px-4 select-none"
          >
            ⟷
          </div>
        </div>
        <div>Current value: {value}</div>
      </div>
    )
  },
}

/**
 * Shows how to handle multiple related values in a single input field:
 *
 * Features:
 * - Support for multi-value inputs (e.g., x,y coordinates)
 * - Structured data output
 * - Custom delimiter and formatting
 * - Synchronized value updates
 *
 * Ideal for scenarios requiring input of related numeric values, such as coordinates or dimensions.
 */
export const MultipleValues: StoryObj = {
  render: function MultipleValuesStory() {
    const [value, setValue] = useState<Record<string, number>>({ x: 100, y: 200 })
    const { inputProps, handlerProps } = useNumericInput({
      value,
      expression: "{x},{y}",
      onChange: (newValue) => setValue(newValue as Record<string, number>),
    })

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <input
            {...inputProps}
            className="w-32 rounded border border-gray-300 px-2 py-1"
            placeholder="x,y"
          />
          <div
            {...handlerProps}
            className="cursor-ew-resize px-4 select-none"
          >
            ⟷
          </div>
        </div>
        <div>
          X: {value.x}, Y: {value.y}
        </div>
      </div>
    )
  },
}

/**
 * Demonstrates how to add constraints and step controls to numeric inputs:
 *
 * Features:
 * - Min/max value boundaries
 * - Custom step increments
 * - Shift key for larger steps
 * - Decimal precision control
 * - Input validation
 *
 * This example shows how to implement controlled numeric input with value constraints.
 */
export const Constraints: StoryObj = {
  render: function ConstraintsStory() {
    const [value, setValue] = useState(50)
    const { inputProps, handlerProps } = useNumericInput({
      value,
      min: 0,
      max: 100,
      step: 5,
      shiftStep: 20,
      decimal: 0,
      onChange: (newValue) => setValue(newValue as number),
    })

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <input
            {...inputProps}
            className="w-24 rounded border border-gray-300 px-2 py-1"
            placeholder="0-100"
          />
          <div
            {...handlerProps}
            className="cursor-ew-resize px-4 select-none"
          >
            ⟷
          </div>
        </div>
        <div>
          Value: {value}
          <div className="text-sm text-gray-500">Min: 0, Max: 100, Step: 5 (Hold Shift for 20)</div>
        </div>
      </div>
    )
  },
}

/**
 * Demonstrates handling array-type values:
 *
 * Features:
 * - Array input/output support
 * - Comma-separated value input
 * - Batch value updates
 * - Array-specific formatting
 *
 * Useful for scenarios requiring input of multiple numeric values as a list.
 */
export const ArrayValues: StoryObj = {
  render: function ArrayValuesStory() {
    const [value, setValue] = useState<number[]>([10, 20, 30])
    const { inputProps, handlerProps } = useNumericInput({
      value,
      onChange: (newValue) => setValue(newValue as number[]),
    })

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <input
            {...inputProps}
            className="w-32 rounded border border-gray-300 px-2 py-1"
            placeholder="Enter numbers"
          />
          <div
            {...handlerProps}
            className="cursor-ew-resize px-4 select-none"
          >
            ⟷
          </div>
        </div>
        <div>Values: {value.join(", ")}</div>
      </div>
    )
  },
}

/**
 * Shows different input field states management:
 *
 * Features:
 * - Disabled state
 * - ReadOnly state
 * - Visual feedback for state changes
 * - State-specific interaction constraints
 *
 * Demonstrates how to handle different input states and their corresponding behaviors.
 */
export const States: StoryObj = {
  render: function StatesStory() {
    const [value, setValue] = useState(50)
    const [isDisabled, setIsDisabled] = useState(false)
    const [isReadOnly, setIsReadOnly] = useState(false)

    const { inputProps, handlerProps } = useNumericInput({
      value,
      disabled: isDisabled,
      readOnly: isReadOnly,
      onChange: (newValue) => setValue(newValue as number),
    })

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <input
            {...inputProps}
            className="w-24 rounded border border-gray-300 px-2 py-1"
            placeholder="Enter number"
          />
          <div
            {...handlerProps}
            className="cursor-ew-resize px-4 select-none"
          >
            ⟷
          </div>
        </div>
        <div className="flex gap-4">
          <label>
            <input
              type="checkbox"
              checked={isDisabled}
              onChange={(e) => setIsDisabled(e.target.checked)}
            />{" "}
            Disabled
          </label>
          <label>
            <input
              type="checkbox"
              checked={isReadOnly}
              onChange={(e) => setIsReadOnly(e.target.checked)}
            />{" "}
            ReadOnly
          </label>
        </div>
        <div>Value: {value}</div>
      </div>
    )
  },
}

/**
 * Shows support for mathematical expression input:
 *
 * Features:
 * - Basic arithmetic operations (+, -, *, /)
 * - Parentheses grouping
 * - Real-time expression evaluation
 * - Error handling and feedback
 *
 * Allows users to input mathematical expressions with immediate calculation results.
 */
export const MathExpressions: StoryObj = {
  render: function MathExpressionsStory() {
    const [value, setValue] = useState("1 + 2 * 3")
    const { inputProps, handlerProps } = useNumericInput({
      value,
      onChange: (newValue) => {
        if (typeof newValue === "string") {
          setValue(newValue)
        }
      },
    })

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <input
            {...inputProps}
            className="w-32 rounded border border-gray-300 px-2 py-1"
            placeholder="Math expression"
          />
          <div
            {...handlerProps}
            className="cursor-ew-resize px-4 select-none"
          >
            ⟷
          </div>
        </div>
        <div>
          Expression: {value}
          <div className="text-sm text-gray-500">Supports +, -, *, / and parentheses</div>
        </div>
      </div>
    )
  },
}

/**
 * Demonstrates dynamic expression patterns:
 *
 * Features:
 * - Value-based conditional formatting
 * - Smart value display (e.g., hiding duplicates)
 * - Context-aware formatting
 * - Responsive display patterns
 *
 * Shows how to dynamically adjust the display format based on input values.
 */
export const DynamicExpression: StoryObj = {
  render: function DynamicExpressionStory() {
    const [value, setValue] = useState<number[]>([100, 200])
    const [expression, setExpression] = useState("{value1}, {value2}")

    const { inputProps, handlerProps } = useNumericInput({
      value,
      expression,
      onChange: (_, { array }) => {
        if (Array.isArray(array)) {
          // If all values are the same, hide the second value
          const areAllValuesSame = array.every((v) => v === array[0])
          setExpression(areAllValuesSame ? "{value1}{value2,hidden}" : "{value1}, {value2}")
          setValue(array)
        }
      },
    })

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <input
            {...inputProps}
            className="w-32 rounded border border-gray-300 px-2 py-1"
            placeholder="Enter numbers"
          />
          <div
            {...handlerProps}
            className="cursor-ew-resize px-4 select-none"
          >
            ⟷
          </div>
        </div>
        <div>
          Values: {value.join(", ")}
          <div className="text-sm text-gray-500">Expression: {expression}</div>
        </div>
      </div>
    )
  },
}

/**
 * Shows handling of mixed expressions:
 *
 * Features:
 * - Combined text and numeric values
 * - Complex formatting patterns
 * - Template-based value insertion
 * - Rich text representation
 *
 * Suitable for scenarios requiring multiple numeric values embedded within text.
 */
export const MixedExpression: StoryObj = {
  render: function MixedExpressionStory() {
    const [value, setValue] = useState<Record<string, number>>({
      value: 100,
      value2: 200,
      value3: 300,
    })
    const { inputProps, handlerProps } = useNumericInput({
      value,
      expression: "This is {value,value2,value3} !",
      onChange: (newValue) => {
        if (typeof newValue === "object" && newValue !== null && !Array.isArray(newValue)) {
          setValue(newValue as Record<string, number>)
        }
      },
    })

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <input
            {...inputProps}
            className="w-48 rounded border border-gray-300 px-2 py-1"
            placeholder="Enter values"
          />
          <div
            {...handlerProps}
            className="cursor-ew-resize px-4 select-none"
          >
            ⟷
          </div>
        </div>
        <div>
          Values:{" "}
          {Object.entries(value)
            .map(([k, v]) => `${k}=${v}`)
            .join(", ")}
        </div>
      </div>
    )
  },
}

/**
 * Shows custom drag handler implementation:
 *
 * Features:
 * - Multiple drag handles
 * - Directional controls
 * - Custom handler styling
 * - Different interaction patterns
 *
 * Demonstrates how to implement and customize drag handles for value adjustment.
 */
export const Handlers: StoryObj = {
  render: function HandlersStory() {
    const [value, setValue] = useState(100)
    const { inputProps, handlerProps } = useNumericInput({
      value,
      onChange: (newValue) => setValue(newValue as number),
    })

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div
            {...handlerProps}
            className="cursor-ew-resize px-4 text-blue-500 select-none"
          >
            ←
          </div>
          <input
            {...inputProps}
            className="w-24 rounded border border-gray-300 px-2 py-1"
            placeholder="Enter number"
          />
          <div
            {...handlerProps}
            className="cursor-ew-resize px-4 text-blue-500 select-none"
          >
            →
          </div>
        </div>
        <div>Value: {value}</div>
      </div>
    )
  },
}

/**
 * Shows empty value handling:
 *
 * Features:
 * - Support for undefined/null values
 * - Value clearing functionality
 * - Placeholder display
 * - Default value management
 *
 * Demonstrates how to handle empty states in the input field.
 */
export const EmptyValue: StoryObj = {
  render: function EmptyValueStory() {
    const [value, setValue] = useState<number | undefined>(100)
    const { inputProps, handlerProps } = useNumericInput({
      value,
      onChange: (newValue) => {
        if (typeof newValue === "number" || newValue === undefined) {
          setValue(newValue)
        }
      },
      onEmpty: () => setValue(undefined),
    })

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <input
            {...inputProps}
            className="w-32 rounded border border-gray-300 px-2 py-1"
            placeholder="Clear for empty"
          />
          <div
            {...handlerProps}
            className="cursor-ew-resize px-4 select-none"
          >
            ⟷
          </div>
        </div>
        <div>
          Current value: {value === undefined ? "empty" : value}
          <button
            className="ml-2 rounded bg-gray-200 px-2 py-1 text-sm"
            onClick={() => setValue(undefined)}
          >
            Clear
          </button>
        </div>
      </div>
    )
  },
}

/**
 * Shows decimal precision control:
 *
 * Features:
 * - Decimal places control
 * - Rounding behavior
 * - Format preservation
 * - Precision-aware drag updates
 *
 * Demonstrates how to precisely control numeric decimal places.
 */
export const DecimalPrecision: StoryObj = {
  render: function DecimalPrecisionStory() {
    const [value, setValue] = useState(100.12345678)
    const { inputProps, handlerProps } = useNumericInput({
      value,
      decimal: 5,
      onChange: (newValue) => setValue(newValue as number),
    })

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <input
            {...inputProps}
            className="w-32 rounded border border-gray-300 px-2 py-1"
            placeholder="Enter decimal"
          />
          <div
            {...handlerProps}
            className="cursor-ew-resize px-4 select-none"
          >
            ⟷
          </div>
        </div>
        <div>
          Value: {value}
          <div className="text-sm text-gray-500">5 decimal places</div>
        </div>
      </div>
    )
  },
}
