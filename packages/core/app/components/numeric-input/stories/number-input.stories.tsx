import { Dot } from "@choiceform/icons-react"
import { observable } from "@legendapp/state"
import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { Checkbox } from "../../checkbox"
import { Select } from "../../select"
import { NumericInputMenuActionPrompt, NumericInputMenuTrigger } from "../components"
import { NumericInput } from "../numeric-input"
import { NumberResult, NumericInputValue } from "../types"

const meta: Meta<typeof NumericInput> = {
  title: "Forms/NumericInput",
  component: NumericInput,
}

export default meta

type Story = StoryObj<typeof NumericInput>
const selectOptions$ = observable([
  {
    label: "Fixed height",
    value: "fixed",
    icon: <Dot />,
  },
  {
    label: "Hug contents",
    value: "hug",
    icon: <Dot />,
  },
  {
    divider: true,
  },
  {
    label: "Add min height...",
    value: "min",
    icon: <Dot />,
  },
  {
    label: "Add max height...",
    value: "max",
    icon: <Dot />,
  },
])

/**
 * The `IfNumberInput` component is a specialized input field designed for numerical values with enhanced functionality
 * and customization options.
 *
 * ### Features
 * - Supports both direct number input and drag-to-adjust functionality
 * - Customizable prefix and suffix elements
 * - Variable binding support for dynamic value management
 * - Integrated menu trigger for additional options
 * - Supports disabled and selected states
 * - Expression pattern support for complex value formatting
 * - Multiple value handling with custom expressions
 * - Math expression evaluation
 * - Decimal precision control
 *
 * ### Advanced Usage Patterns
 *
 * #### Expression Pattern
 * ```tsx
 * // Using expressions to format values
 * <IfNumberInput
 *   value="100px"
 *   expression="{value}px"
 *   onChange={(newValue) => setValue(newValue)}
 * />
 * ```
 *
 * #### Multiple Values
 * ```tsx
 * // Handling multiple values with a single input
 * <IfNumberInput
 *   value={{ x: 100, y: 200 }}
 *   expression="{x},{y}"
 *   onChange={(newValue) => setValue(newValue)}
 * />
 * ```
 *
 * #### Array Values
 * ```tsx
 * // Working with array values
 * <IfNumberInput
 *   value={[10, 20, 30]}
 *   onChange={(newValue) => setValue(newValue as number[])}
 * />
 * ```
 *
 * #### Constraints
 * ```tsx
 * // Adding value constraints
 * <IfNumberInput
 *   value={50}
 *   min={0}
 *   max={100}
 *   step={5}
 *   shiftStep={20}  // Larger steps when holding Shift
 *   decimal={0}     // No decimal places
 *   onChange={handleChange}
 * />
 * ```
 *
 * #### Dynamic Expressions
 * ```tsx
 * // Dynamic expression based on values
 * <IfNumberInput
 *   value={[100, 200]}
 *   expression="{value1}, {value2}"
 *   onChange={(_, { array }) => {
 *     const areAllValuesSame = array.every(v => v === array[0]);
 *     setExpression(areAllValuesSame ? "{value1}{value2,hidden}" : "{value1}, {value2}");
 *   }}
 * />
 * ```
 *
 * #### Mixed Expressions
 * ```tsx
 * // Complex text with multiple values
 * <IfNumberInput
 *   value={{ value: 100, value2: 200, value3: 300 }}
 *   expression="This is {value,value2,value3} !"
 *   onChange={handleChange}
 * />
 * ```
 *
 * #### Empty Value Handling
 * ```tsx
 * // Handling undefined/empty values
 * <IfNumberInput
 *   value={value}
 *   onChange={handleChange}
 *   onEmpty={() => setValue(undefined)}
 * />
 * ```
 *
 * #### Decimal Precision
 * ```tsx
 * // Controlling decimal places
 * <IfNumberInput
 *   value={100.12345678}
 *   decimal={5}
 *   onChange={handleChange}
 * />
 * ```
 *
 * ### IfNumberValue Props
 *
 * ```tsx
 * export type IfNumberValue = IfNumberInputValue
 * export type IfNumberChangeDetail = ReturnType<typeof dealWithIfNumberInputValue>
 * ```
 */
export const Basic: Story = {
  render: function BasicStory() {
    const [disabled, setDisabled] = useState(false)
    const [selected, setSelected] = useState(false)

    const [singleValue, setSingleValue] = useState(100)
    const [prefixHandlerValueLeft, setPrefixHandlerValueLeft] = useState(100)
    const [prefixHandlerValueRight, setPrefixHandlerValueRight] = useState(100)
    const [suffixHandlerValue, setSuffixHandlerValue] = useState(100)
    const [prefixAndSuffixHandlerValueLeft, setPrefixAndSuffixHandlerValueLeft] = useState(100)
    const [prefixAndSuffixHandlerValueRight, setPrefixAndSuffixHandlerValueRight] = useState(100)
    const [suffixMenuValueLeft, setSuffixMenuValueLeft] = useState(100)
    const [suffixMenuValueRight, setSuffixMenuValueRight] = useState(100)
    const [suffixActionValue, setSuffixActionValue] = useState(100)

    const [variableValue1, setVariableValue1] = useState(100)
    const [variableValue2, setVariableValue2] = useState(100)
    const [variableValue3, setVariableValue3] = useState(100)
    const [variableValue4, setVariableValue4] = useState(100)

    const [menuOpenA, setMenuOpenA] = useState(false)
    const [menuOpenB, setMenuOpenB] = useState(false)
    const [menuOpenC, setMenuOpenC] = useState(false)
    const [menuValue, setMenuValue] = useState<string | null>("fixed")

    return (
      <div className="grid w-64 grid-cols-2 gap-2">
        <Checkbox
          value={disabled}
          onChange={(checked) => setDisabled(checked)}
          label="Disabled"
        />
        <Checkbox
          value={selected}
          onChange={(checked) => setSelected(checked)}
          label="Selected"
        />
        <strong className="col-span-full">Single</strong>
        <NumericInput
          value={singleValue}
          onChange={(newValue) => setSingleValue(newValue as number)}
          disabled={disabled}
          selected={selected}
        />
        <strong className="col-span-full">Prefix Element (handler)</strong>
        <NumericInput
          prefixElement={
            <div>
              <Dot />,
            </div>
          }
          value={prefixHandlerValueLeft}
          onChange={(newValue) => setPrefixHandlerValueLeft(newValue as number)}
          disabled={disabled}
          selected={selected}
        />
        <NumericInput
          prefixElement={<div>X</div>}
          value={prefixHandlerValueRight}
          onChange={(newValue) => setPrefixHandlerValueRight(newValue as number)}
          disabled={disabled}
          selected={selected}
        />
        <strong className="col-span-full">Suffix Element (handler)</strong>
        <NumericInput
          suffixElement={{
            type: "handler",
            element: <div className="w-fit pr-1.75">%</div>,
          }}
          value={suffixHandlerValue}
          onChange={(newValue) => setSuffixHandlerValue(newValue as number)}
          disabled={disabled}
          selected={selected}
        />
        <strong className="col-span-full">Prefix & Suffix Element (handler)</strong>
        <NumericInput
          prefixElement={<div>X</div>}
          suffixElement={{
            type: "handler",
            element: <div className="w-fit pr-1.75">%</div>,
          }}
          value={prefixAndSuffixHandlerValueLeft}
          onChange={(newValue) => setPrefixAndSuffixHandlerValueLeft(newValue as number)}
          disabled={disabled}
          selected={selected}
        />
        <NumericInput
          prefixElement={<div className="w-fit pl-1.75" />}
          suffixElement={{
            type: "handler",
            element: <div className="w-fit pr-1.75">%</div>,
          }}
          value={prefixAndSuffixHandlerValueRight}
          onChange={(newValue) => setPrefixAndSuffixHandlerValueRight(newValue as number)}
          disabled={disabled}
          selected={selected}
        />
        <strong className="col-span-full">Suffix Element (menu)</strong>
        <NumericInput
          selected={selected || menuOpenA}
          suffixElement={{
            type: "action",
            element: (
              <Select
                disabled={disabled}
                open={menuOpenA}
                onOpenChange={(open) => setMenuOpenA(open)}
                value={menuValue ?? "fixed"}
                onChange={(value) => {
                  setMenuOpenA(false)
                  setMenuValue(value)
                }}
                placement="bottom-end"
                options={selectOptions$.get()}
                classNames={{ list: "min-w-fit" }}
                trigger={() => <NumericInputMenuTrigger aria-label="Open menu" />}
              />
            ),
          }}
          value={suffixMenuValueLeft}
          onChange={(newValue) => setSuffixMenuValueLeft(newValue as number)}
          disabled={disabled}
        />

        <NumericInput
          selected={selected || menuOpenB}
          prefixElement={
            <div>
              <SvgIcon name={SvgIconName.interface.effectLayerBlur} />
            </div>
          }
          suffixElement={{
            type: "action",
            element: (
              <Select
                disabled={disabled}
                open={menuOpenB}
                onOpenChange={(open) => setMenuOpenB(open)}
                value={menuValue ?? "fixed"}
                onChange={(value) => {
                  setMenuOpenB(false)
                  setMenuValue(value)
                }}
                placement="bottom-end"
                options={selectOptions$.get()}
                classNames={{ list: "min-w-fit" }}
                trigger={() => <NumericInputMenuTrigger aria-label="Open menu" />}
              />
            ),
          }}
          value={suffixMenuValueRight}
          onChange={(newValue) => setSuffixMenuValueRight(newValue as number)}
          disabled={disabled}
        />

        <strong className="col-span-full">Suffix Element (action)</strong>
        <NumericInput
          selected={selected || menuOpenC}
          prefixElement={
            <div>
              <Dot />,
            </div>
          }
          suffixElement={{
            type: "action",
            element: (
              <>
                {menuValue !== "fixed" && (
                  <NumericInputMenuActionPrompt>
                    {
                      selectOptions$
                        .get()
                        .find((option) => option.value === menuValue)
                        ?.label?.split(" ")[0]
                    }
                  </NumericInputMenuActionPrompt>
                )}
                <Select
                  disabled={disabled}
                  open={menuOpenC}
                  onOpenChange={(open) => setMenuOpenC(open)}
                  value={menuValue ?? "fixed"}
                  onChange={(value) => {
                    setMenuOpenC(false)
                    setMenuValue(value)
                  }}
                  placement="bottom-end"
                  options={selectOptions$.get()}
                  classNames={{ list: "min-w-fit" }}
                  trigger={() => <NumericInputMenuTrigger aria-label="Open menu" />}
                />
              </>
            ),
          }}
          value={suffixActionValue}
          onChange={(newValue) => setSuffixActionValue(newValue as number)}
          disabled={disabled}
        />

        <strong className="col-span-full">Variable</strong>

        <NumericInput
          variableValue={10}
          value={variableValue1}
          onChange={(newValue) => setVariableValue1(newValue as number)}
          disabled={disabled}
          selected={selected}
        />
        <NumericInput
          prefixElement={
            <div>
              <Dot />,
            </div>
          }
          variableValue={10}
          value={variableValue2}
          onChange={(newValue) => setVariableValue2(newValue as number)}
          disabled={disabled}
          selected={selected}
        />
        <NumericInput
          suffixElement={{
            type: "action",
            element: (
              <Select
                disabled={disabled}
                placement="bottom-end"
                options={selectOptions$.get()}
                classNames={{ list: "min-w-fit" }}
                trigger={() => (
                  <NumericInputMenuTrigger
                    aria-label="Open menu"
                    type="action"
                  />
                )}
              />
            ),
          }}
          variableValue={10}
          value={variableValue3}
          onChange={(newValue) => setVariableValue3(newValue as number)}
          disabled={disabled}
          selected={selected}
        />
        <NumericInput
          prefixElement={
            <div>
              <Dot />,
            </div>
          }
          suffixElement={{
            type: "action",
            element: (
              <Select
                disabled={disabled}
                placement="bottom-end"
                options={selectOptions$.get()}
                classNames={{ list: "min-w-fit" }}
                trigger={() => (
                  <NumericInputMenuTrigger
                    aria-label="Open menu"
                    type="action"
                  />
                )}
              />
            ),
          }}
          variableValue={10}
          value={variableValue4}
          onChange={(newValue) => setVariableValue4(newValue as number)}
          disabled={disabled}
          selected={selected}
        />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: function DisabledStory() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [menuValue, setMenuValue] = useState<string | null>("fixed")
    const [suffixActionInput, setSuffixActionInput] = useState(10)

    return (
      <div className="grid w-64 grid-cols-2 gap-4">
        <NumericInput
          disabled
          prefixElement={<div>X</div>}
          value={10}
          onChange={(newValue) => console.log(newValue)}
          suffixElement={{
            type: "action",
            element: <div>Y</div>,
          }}
        />
        <NumericInput
          disabled
          prefixElement={<div>X</div>}
          value={10}
          onChange={(newValue) => console.log(newValue)}
          variableValue={10}
          suffixElement={{
            type: "action",
            element: <div>Y</div>,
          }}
        />
        <NumericInput
          disabled
          prefixElement={<div>X</div>}
          value={10}
          onChange={(newValue) => console.log(newValue)}
          suffixElement={{
            type: "action",
            element: (
              <Select
                disabled
                placement="bottom-end"
                options={selectOptions$.get()}
                classNames={{ list: "min-w-fit" }}
                trigger={() => (
                  <NumericInputMenuTrigger
                    aria-label="Open menu"
                    type="action"
                  />
                )}
              />
            ),
          }}
        />

        <NumericInput
          disabled
          selected={menuOpen}
          prefixElement={
            <div>
              <Dot />,
            </div>
          }
          suffixElement={{
            type: "action",
            element: (
              <>
                {menuValue === "fixed" && (
                  <NumericInputMenuActionPrompt disabled>
                    {
                      selectOptions$
                        .get()
                        .find((option) => option.value === menuValue)
                        ?.label?.split(" ")[0]
                    }
                  </NumericInputMenuActionPrompt>
                )}
                <Select
                  disabled
                  open={menuOpen}
                  onOpenChange={(open) => setMenuOpen(open)}
                  value={menuValue ?? "fixed"}
                  onChange={(value) => {
                    setMenuOpen(false)
                    setMenuValue(value)
                  }}
                  placement="bottom-end"
                  options={selectOptions$.get()}
                  classNames={{ list: "min-w-fit" }}
                  trigger={() => (
                    <NumericInputMenuTrigger
                      aria-label="Open menu"
                      type="action"
                    />
                  )}
                />
              </>
            ),
          }}
          value={suffixActionInput}
          onChange={(newValue) => setSuffixActionInput(newValue as number)}
        />
      </div>
    )
  },
}

/**
 * This example demonstrates the calculation functionality of the number input.
 *
 * Features demonstrated:
 * 1. Entering mathematical expressions (e.g., 1+1) calculates the result (2)
 * 2. When the calculation result equals the current value, onChange won't be triggered
 *
 * For example:
 * - When the value is 2, directly entering 2 won't trigger onChange
 * - When the value is 2, entering 1+1 (which also results in 2) won't trigger onChange
 * - When the value is 2, entering 3 or 1+2 (resulting in 3) will trigger onChange
 *
 * The console will show onChange event triggers, demonstrating that identical result values won't cause repeated triggers.
 */
export const ExpressionCalculation: Story = {
  render: function ExpressionCalculationStory() {
    const [value, setValue] = useState(2)
    const [changeCount, setChangeCount] = useState(0)
    const [lastInputText, setLastInputText] = useState("")

    const handleChange = (newValue: NumericInputValue, detail: NumberResult) => {
      console.log("onChange triggered with:", newValue, detail)
      setValue(newValue as number)
      setChangeCount((prev) => prev + 1)
      setLastInputText(detail.string)
    }

    return (
      <div className="grid w-96 gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium">Mathematical Expression Test</h3>
          <p className="text-xs text-gray-600">
            Try entering different values and expressions to observe onChange event behavior:
          </p>
          <ul className="list-disc pl-5 text-xs text-gray-600">
            <li>
              Current value is {value}, entering {value} won&apos;t trigger onChange
            </li>
            <li>
              Current value is {value}, entering expressions that result in {value} (like{" "}
              {value - 1}+1) won&apos;t trigger onChange
            </li>
            <li>Entering other values or expressions will trigger onChange</li>
          </ul>
        </div>

        <div className="flex flex-col items-start gap-2">
          <NumericInput
            value={value}
            onChange={handleChange}
          />

          <div className="mt-2 rounded border bg-gray-50 p-3">
            <p className="text-sm">
              <b>Current value:</b> {value}
            </p>
            <p className="text-sm">
              <b>onChange trigger count:</b> {changeCount}
            </p>
            {lastInputText && (
              <p className="text-sm">
                <b>Last input text:</b> {lastInputText}
              </p>
            )}
            <p className="text-secondary-foreground mt-2 text-xs">
              Tip: Try entering &ldquo;1+1&rdquo;, &ldquo;2*1&rdquo;, &ldquo;4/2&rdquo; or other
              expressions that result in the current value
            </p>
          </div>
        </div>
      </div>
    )
  },
}
