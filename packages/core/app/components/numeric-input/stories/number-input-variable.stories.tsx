import { faker } from "@faker-js/faker"
import { Show } from "@legendapp/state/react"
import type { Meta, StoryObj } from "@storybook/react"
import { useEffect, useRef, useState } from "react"

import { Dot } from "@choiceform/icons-react"
import React from "react"
import { tcx } from "../../../utils"
import { IconButton } from "../../icon-button"
import { Popover } from "../../popover"
import { Select } from "../../select"
import { NumericInputMenuTrigger } from "../components"
import { NumericInputVariableTrigger } from "../components/numeric-input-variable-trigger"
import { NumericInput } from "../numeric-input"

const meta: Meta<typeof NumericInput> = {
  title: "Forms/NumericInput/Variable",
  component: NumericInput,
}

export default meta

export type BaseVariableValue = string | number | boolean

export type VariableId = string
export type VariableValue = BaseVariableValue | Record<string, unknown> | Array<BaseVariableValue>
export type VariableType = "color" | "number" | "boolean" | "string" | "enum" | "object" | "array"
export type VariableOption = { value: string; id: string }
export type VariableControlKey =
  | "overflow"
  | "blendingMode"
  | "pointerEvents"
  | "userSelect"
  | "scrollbars"
  | "cursor"

type Story = StoryObj<typeof NumericInput>
type Variable = {
  masterId: string
  name: string
  description?: string

  controlKey?: VariableControlKey
  type: VariableType
  id: VariableId

  value: VariableValue
  options?: Array<VariableOption>

  referencedNodeIds?: string[]
  referencedConditionIds?: string[]

  isComponentVariable?: boolean
  referencedVariantIds?: string[]

  createdAt: number
  updatedAt: number | null
}

const createNumberMockVariable = (): Variable => ({
  id: faker.string.uuid(),
  value: faker.number.int({ min: 0, max: 1000 }),
  name: faker.person.firstName(),
  masterId: `${faker.helpers.arrayElement(["System", "User"])}`,
  type: "number",
  createdAt: faker.date.recent().getTime(),
  updatedAt: faker.date.recent().getTime(),
})

/**
 * The Variable feature in IfNumberInput allows binding dynamic values to the input field.
 * This enables values to be controlled by variables that can be updated from different sources.
 *
 * ### Features
 * - Variable binding and unbinding
 * - Real-time value synchronization
 * - Visual feedback for variable state
 * - Support for both action trigger and select trigger styles
 *
 * ### Variable States
 * - **Unbound**: Normal input state, value can be changed directly
 * - **Bound**: Input shows the variable's value and updates when the variable changes
 * - **Selected**: Visual feedback when the variable selector is open
 *
 * ### Implementation Examples
 *
 * #### Action Trigger Style
 * ```tsx
 * const [value, setValue] = useState(10)
 * const [variable, setVariable] = useState<Variable | null>(null)
 *
 * <IfNumberInput
 *   value={value}
 *   variableValue={variable?.value}
 *   onChange={setValue}
 *   onVariableClick={() => {
 *     // Open variable selector
 *   }}
 *   suffixElement={{
 *     type: "action",
 *     element: <IfNumberInputVariableTrigger
 *       variableValue={variable?.value}
 *       onVariableChange={handleVariableChange}
 *       onUnlink={handleUnlink}
 *     />
 *   }}
 * />
 * ```
 *
 * #### Select Trigger Style
 * ```tsx
 * <IfNumberInput
 *   value={value}
 *   variableValue={variable?.value}
 *   onChange={setValue}
 *   suffixElement={{
 *     type: "action",
 *     element: variable ? (
 *       <UnlinkButton onClick={handleUnlink} />
 *     ) : (
 *       <IfSelect
 *         options={[
 *           // ... other options
 *           {
 *             label: "Apply variable...",
 *             value: "variable",
 *             onClick: () => {} //Open variable selector
 *           }
 *         ]}
 *       />
 *     )
 *   }}
 * />
 * ```
 *
 * ### Key Props
 * - `value`: Current input value
 * - `variableValue`: Value from the bound variable (if any)
 * - `onVariableClick`: Handler for opening the variable selector
 * - `selected`: Visual state for when variable selector is open
 *
 * ### Variable Binding Behavior
 * 1. When a variable is bound:
 *    - The input shows the variable's value
 *    - Direct input changes will unbind the variable
 *    - The variable trigger shows the bound state
 *
 * 2. When a variable is unbound:
 *    - The input returns to normal input mode
 *    - The value can be changed directly
 *    - The variable trigger shows the unbound state
 *
 * ### Use Cases
 * - Dynamic value management
 * - Global variable synchronization
 * - Linked input fields
 * - System-wide value updates
 */
export const Basic: Story = {
  render: function BasicStory() {
    // Action Trigger 状态
    const [actionValue, setActionValue] = useState(10)
    const [actionVariable, setActionVariable] = useState<Variable | null>(null)
    const [actionVariableOpen, setActionVariableOpen] = useState<boolean>(false)

    // Select Trigger 状态
    const [selectInputValue, setSelectInputValue] = useState(10)
    const [selectVariable, setSelectVariable] = useState<Variable | null>(null)
    const [selectVariableOpen, setSelectVariableOpen] = useState<boolean>(false)
    const [selectValue, setSelectValue] = useState("1")

    const OPTIONS = [
      { label: "Option 1", value: "1" },
      { label: "Option 2", value: "2" },
      { label: "Option 3", value: "3" },
      { divider: true },
      {
        label: "Apply variable...",
        value: "variable",
        icon: <Dot />,
        onClick: () => {
          setSelectVariableOpen(true)
        },
      },
    ]

    const triggerRefs = useRef<{
      button: HTMLLabelElement | null
      select: HTMLLabelElement | null
      [key: string]: HTMLLabelElement | null
    }>({
      button: null,
      select: null,
    })

    useEffect(() => {
      if (actionValue !== actionVariable?.value) {
        setActionVariable(null)
      }
    }, [actionValue, actionVariable])

    useEffect(() => {
      if (selectInputValue !== selectVariable?.value) {
        setSelectVariable(null)
      }
    }, [selectInputValue, selectVariable])

    return (
      <>
        <div className="grid w-64 grid-cols-2 gap-x-4 gap-y-2">
          <strong>Action Trigger</strong>
          <strong>Select Trigger</strong>

          <NumericInput
            triggerRef={(el) => {
              triggerRefs.current.button = el
            }}
            tooltip={{
              content: "Number input",
            }}
            aria-label="Number input"
            selected={actionVariableOpen}
            prefixElement={
              <div>
                <Dot />
              </div>
            }
            onVariableClick={() => {
              setActionVariableOpen(!actionVariableOpen)
            }}
            suffixElement={{
              type: "action",
              element: (
                <NumericInputVariableTrigger
                  variableValue={actionVariable?.value as number}
                  open={actionVariableOpen}
                  onOpenChange={(open) => setActionVariableOpen(open)}
                  onVariableChange={() => {}}
                  onUnlink={() => {
                    setActionVariable(null)
                    setActionVariableOpen(false)
                  }}
                />
              ),
            }}
            variableValue={actionVariable?.value as number}
            value={actionValue}
            onChange={(newValue) => setActionValue(newValue as number)}
          />

          <NumericInput
            triggerRef={(el) => {
              triggerRefs.current.select = el
            }}
            tooltip={{
              content: "Number input",
            }}
            aria-label="Number input"
            selected={selectVariableOpen}
            prefixElement={
              <div>
                <Dot />
              </div>
            }
            onVariableClick={() => {
              setSelectVariableOpen(true)
            }}
            suffixElement={{
              type: "action",
              element: (
                <Show
                  if={selectVariable}
                  else={
                    <Select
                      placement="bottom-end"
                      options={OPTIONS}
                      value={selectValue}
                      onChange={(newValue) => setSelectValue(newValue)}
                      trigger={() => <NumericInputMenuTrigger aria-label="Open menu" />}
                    />
                  }
                >
                  <div className="bg-light-100 rounded-r-md [grid-area:action]">
                    <IconButton
                      tooltip={{
                        content: "Detach variable",
                      }}
                      variant={undefined}
                      className={tcx(
                        "text-secondary-foreground hover:text-primary invisible",
                        selectVariableOpen
                          ? undefined
                          : "group-hover:visible active:bg-transparent",
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectVariable(null)
                        setSelectVariableOpen(false)
                      }}
                    >
                      <Dot />
                    </IconButton>
                  </div>
                </Show>
              ),
            }}
            variableValue={selectVariable?.value as number}
            value={selectInputValue}
            onChange={(newValue) => setSelectInputValue(newValue as number)}
          />
        </div>

        <Popover
          offset={0}
          placement="bottom-end"
          classNames={{
            content: "flex h-full w-60 flex-col overflow-hidden p-0",
          }}
          triggerRef={{
            current:
              triggerRefs.current[
                actionVariableOpen ? "button" : selectVariableOpen ? "select" : ""
              ] ?? null,
          }}
          open={actionVariableOpen || selectVariableOpen}
          onOpenChange={(open) => {
            if (actionVariableOpen) {
              setActionVariableOpen(open)
            } else if (selectVariableOpen) {
              setSelectVariableOpen(open)
            }
          }}
          content={<div></div>}
        />
      </>
    )
  },
}
