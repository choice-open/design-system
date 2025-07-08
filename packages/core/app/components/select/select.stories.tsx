import {
  FieldTypeAttachment,
  FieldTypeCheckbox,
  FieldTypeCount,
  Settings,
} from "@choiceform/icons-react"
import { faker } from "@faker-js/faker"
import type { Meta, StoryObj } from "@storybook/react"
import React, { useMemo, useRef, useState } from "react"
import { Popover } from "../popover"
import { Select } from "./select"

const meta: Meta<typeof Select> = {
  title: "Collections/Select",
  component: Select,
  tags: ["upgrade"],
}

export default meta
type Story = StoryObj<typeof Select>

/**
 * The Select component is a customizable dropdown select component that provides a rich set of features
 * for handling selection interactions in a user interface.
 *
 * Key Features:
 * - Flexible option configuration with icons, labels, and values
 * - Support for disabled states (both component and individual options)
 * - Divider support for grouping options
 * - Customizable trigger and list widths
 * - Keyboard navigation and typeahead support
 * - Custom placement options for the dropdown
 *
 * Component Structure:
 * ```tsx
 * <Select value={value} onChange={setValue}>
 *   <Select.Trigger>
 *     <Select.Value>Display Text</Select.Value>
 *   </Select.Trigger>
 *   <Select.Content>
 *     <Select.Item value="option-1">
 *       <Select.Value>Option 1</Select.Value>
 *     </Select.Item>
 *     <Select.Divider />
 *     <Select.Item value="option-2">
 *       <Select.Value>Option 2</Select.Value>
 *     </Select.Item>
 *   </Select.Content>
 * </Select>
 * ```
 */
export const Basic: Story = {
  render: function BasicStory() {
    const [value, setValue] = useState<string>("option-1")
    return (
      <Select
        value={value}
        onChange={setValue}
      >
        <Select.Trigger>
          <Select.Value>{value || "Select"}</Select.Value>
        </Select.Trigger>
        <Select.Content>
          {Array.from({ length: 10 }, (_, i) => (
            <Select.Item
              key={i}
              value={`option-${i + 1}`}
            >
              <Select.Value>Option {i + 1}</Select.Value>
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    )
  },
}

/**
 * Demonstrates the disabled state of the entire select component.
 * When disabled, the component:
 * - Prevents user interaction
 * - Shows a visual disabled state
 * - Maintains the current selection
 */
export const Disabled: Story = {
  render: function DisabledStory() {
    const [value, setValue] = useState<string>("option-1")
    return (
      <Select
        disabled
        value={value}
        onChange={setValue}
      >
        <Select.Trigger>{value || "Select"}</Select.Trigger>
        <Select.Content>
          {Array.from({ length: 10 }, (_, i) => (
            <Select.Item
              key={i}
              value={`option-${i + 1}`}
            >
              <Select.Value>Option {i + 1}</Select.Value>
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    )
  },
}

/**
 * Shows how to disable individual options while keeping others interactive.
 * Useful for:
 * - Contextually unavailable options
 * - Permission-based option restrictions
 * - Dependent selections
 */
export const DisabledOptions: Story = {
  render: function DisabledOptionsStory() {
    const [value, setValue] = useState<string>("option-2")
    return (
      <Select
        value={value}
        onChange={setValue}
      >
        <Select.Trigger>
          <Select.Value>{value || "Select"}</Select.Value>
        </Select.Trigger>
        <Select.Content>
          <Select.Item
            value="option-1"
            disabled
          >
            <Select.Value>Option 1 (Disabled)</Select.Value>
          </Select.Item>
          <Select.Item value="option-2">
            <Select.Value>Option 2</Select.Value>
          </Select.Item>
          <Select.Item value="option-3">
            <Select.Value>Option 3</Select.Value>
          </Select.Item>
        </Select.Content>
      </Select>
    )
  },
}

/**
 * Demonstrates the use of dividers to create logical groupings of options.
 * Dividers help:
 * - Organize related options
 * - Improve visual hierarchy
 * - Separate different option categories
 */
export const WithDivider: Story = {
  render: function WithDividerStory() {
    const [value, setValue] = useState<string>("option-1")
    return (
      <Select
        value={value}
        onChange={setValue}
      >
        <Select.Trigger>
          <Select.Value>{value || "Select"}</Select.Value>
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="option-1">
            <Select.Value>Option 1</Select.Value>
          </Select.Item>
          <Select.Divider />
          <Select.Item value="option-2">
            <Select.Value>Option 2</Select.Value>
          </Select.Item>
          <Select.Divider />
          <Select.Item value="option-3">
            <Select.Value>Option 3</Select.Value>
          </Select.Item>
        </Select.Content>
      </Select>
    )
  },
}

export const WithLabel: Story = {
  render: function WithLabelStory() {
    const [value, setValue] = useState<string>("option-1")
    return (
      <Select
        value={value}
        onChange={setValue}
      >
        <Select.Trigger>
          <Select.Value>{value || "Select"}</Select.Value>
        </Select.Trigger>
        <Select.Content>
          <Select.Label>Select an option</Select.Label>
          <Select.Item value="option-1">
            <Select.Value>Option 1</Select.Value>
          </Select.Item>
          <Select.Item value="option-2">
            <Select.Value>Option 2</Select.Value>
          </Select.Item>
          <Select.Item value="option-3">
            <Select.Value>Option 3</Select.Value>
          </Select.Item>
          <Select.Divider />
          <Select.Label>Select an option</Select.Label>
          <Select.Item value="option-4">
            <Select.Value>Option 1</Select.Value>
          </Select.Item>
          <Select.Item value="option-5">
            <Select.Value>Option 2</Select.Value>
          </Select.Item>
          <Select.Item value="option-6">
            <Select.Value>Option 3</Select.Value>
          </Select.Item>
        </Select.Content>
      </Select>
    )
  },
}

/**
 * Shows how to enhance options with icons for better visual representation.
 * Icons can:
 * - Improve option recognition
 * - Add visual hierarchy
 * - Provide additional context
 */
export const WithIcon: Story = {
  render: function WithIconStory() {
    const [value, setValue] = useState<string>("option-1")
    return (
      <Select
        value={value}
        onChange={setValue}
      >
        <Select.Trigger>
          <Select.Value>{value || "Select"}</Select.Value>
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="option-1">
            <FieldTypeAttachment />
            <Select.Value>Option 1</Select.Value>
          </Select.Item>
          <Select.Item value="option-2">
            <FieldTypeCheckbox />
            <Select.Value>Option 2</Select.Value>
          </Select.Item>
          <Select.Divider />
          <Select.Item value="option-3">
            <FieldTypeCount />
            <Select.Value>Option 3</Select.Value>
          </Select.Item>
        </Select.Content>
      </Select>
    )
  },
}

/**
 * Shows how the component handles large datasets efficiently.
 * Features:
 * - Virtualized scrolling
 * - Smooth performance with many items
 * - Scroll position management
 */
export const LongItems: Story = {
  render: function LongItemsStory() {
    const [value, setValue] = useState<string>("option-1")
    return (
      <Select
        value={value}
        onChange={setValue}
      >
        <Select.Trigger>
          <Select.Value>{value || "Select"}</Select.Value>
        </Select.Trigger>
        <Select.Content>
          {Array.from({ length: 100 }, (_, i) => (
            <Select.Item
              key={i}
              value={`option-${i + 1}`}
            >
              <Select.Value>Option {i + 1}</Select.Value>
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    )
  },
}

/**
 * Demonstrates the matchTriggerWidth prop for consistent widths.
 * Use when:
 * - List content width matches trigger
 * - Maintaining visual alignment is important
 * - Preventing layout shifts
 */
export const MatchTriggerWidth: Story = {
  render: function MatchTriggerWidthStory() {
    const [value, setValue] = useState<string>("option-1")
    const options = Array.from({ length: 10 }, (_, i) => ({
      value: `option-${i + 1}`,
      label: faker.music.songName(),
    }))
    return (
      <Select
        value={value}
        onChange={setValue}
        matchTriggerWidth
      >
        <Select.Trigger className="w-64">
          <Select.Value>{value || "Select an option"}</Select.Value>
        </Select.Trigger>
        <Select.Content>
          {options.map((option) => (
            <Select.Item
              key={option.value}
              value={option.value}
            >
              <Select.Value>{option.label}</Select.Value>
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    )
  },
}

/**
 * Shows different dropdown placement options.
 * Supports:
 * - Multiple positioning strategies
 * - Automatic repositioning
 * - Custom offset configuration
 */
export const Placement: Story = {
  render: function PlacementStory() {
    const [value, setValue] = useState<string>("option-1")
    return (
      <Select
        value={value}
        onChange={setValue}
        placement="bottom-end"
      >
        <Select.Trigger>
          <Select.Value>{value || "Select an option"}</Select.Value>
        </Select.Trigger>
        <Select.Content>
          {Array.from({ length: 10 }, (_, i) => (
            <Select.Item
              key={i}
              value={`option-${i + 1}`}
            >
              <Select.Value>Option {i + 1}</Select.Value>
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    )
  },
}

/**
 * Demonstrates the compound component pattern for the Select component.
 * This pattern allows for more direct component composition, providing a more intuitive JSX structure.
 *
 * ```tsx
 * <Select value={value} onChange={setValue}>
 *   <Select.Trigger>
 *     <Select.Value>Select an option</Select.Value>
 *   </Select.Trigger>
 *   <Select.Content>
 *     <Select.Item value="option-1">
 *       <Select.Value>Option 1</Select.Value>
 *     </Select.Item>
 *     <Select.Divider />
 *     <Select.Item value="option-2">
 *       <Select.Value>Option 2</Select.Value>
 *     </Select.Item>
 *   </Select.Content>
 * </Select>
 * ```
 */
export const CompoundComponent: Story = {
  render: function CompoundComponentStory() {
    const [value, setValue] = useState<string | null>("option-1")

    return (
      <div className="flex w-64 flex-col gap-8">
        <Select
          value={value}
          onChange={setValue}
        >
          <Select.Trigger>
            <Select.Value>{value ? `Selected: ${value}` : "Select..."}</Select.Value>
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="option-1">
              <Select.Value>Option 1</Select.Value>
            </Select.Item>
            <Select.Item value="option-2">
              <Select.Value>Option 2</Select.Value>
            </Select.Item>
            <Select.Divider />
            <Select.Item value="option-3">
              <Select.Value>Option 3</Select.Value>
            </Select.Item>
            <Select.Item
              value="option-4"
              disabled
            >
              <Select.Value>Disabled Option</Select.Value>
            </Select.Item>
          </Select.Content>
        </Select>

        <p className="text-sm text-stone-400">Current value: {value || "None"}</p>
      </div>
    )
  },
}

/**
 * Select in marginal conditions
 */
export const MarginalConditions: Story = {
  render: function MarginalConditionsStory() {
    return (
      <div className="flex h-screen flex-col justify-end p-2">
        <Select>
          <Select.Trigger>
            <Select.Value>Select</Select.Value>
          </Select.Trigger>
          <Select.Content>
            {Array.from({ length: 10 }, (_, i) => (
              <Select.Item
                key={i}
                value={`option-${i + 1}`}
              >
                <Select.Value>Option {i + 1}</Select.Value>
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </div>
    )
  },
}

/**
 * Multiple: Tests multiple Select components on the same page to ensure proper event handling.
 *
 * This story verifies:
 * - Multiple selects can be opened independently
 * - Opening one select closes others (proper event handling)
 * - No event conflicts between multiple floating elements
 * - Proper focus management across multiple selects
 *
 * Expected behavior:
 * - Click a select trigger to open its dropdown
 * - Opening another select should close the first one
 * - All selects should work independently without conflicts
 */
export const Multiple: Story = {
  render: function MultipleStory() {
    const [value1, setValue1] = useState<string>("option-1")
    const [value2, setValue2] = useState<string>("option-b")
    const [value3, setValue3] = useState<string>("choice-i")

    const options1 = Array.from({ length: 5 }, (_, i) => ({
      value: `option-${i + 1}`,
      label: `Option ${i + 1}`,
    }))

    const options2 = Array.from({ length: 5 }, (_, i) => ({
      value: `option-${String.fromCharCode(97 + i)}`,
      label: `Option ${String.fromCharCode(65 + i)}`,
    }))

    const options3 = Array.from({ length: 5 }, (_, i) => ({
      value: `choice-${String.fromCharCode(105 + i)}`,
      label: `Choice ${String.fromCharCode(73 + i)}`,
    }))

    return (
      <div className="flex flex-col gap-8 p-8">
        <div className="text-lg font-medium">Multiple Select Components Test</div>

        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-stone-600">First Select</label>
            <Select
              value={value1}
              onChange={setValue1}
            >
              <Select.Trigger className="w-48">
                <Select.Value>{value1 || "Select option..."}</Select.Value>
              </Select.Trigger>
              <Select.Content>
                <Select.Label>Number Options</Select.Label>
                {options1.map((option) => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                  >
                    <Select.Value>{option.label}</Select.Value>
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-stone-600">Second Select</label>
            <Select
              value={value2}
              onChange={setValue2}
            >
              <Select.Trigger className="w-48">
                <Select.Value>{value2 || "Select option..."}</Select.Value>
              </Select.Trigger>
              <Select.Content>
                <Select.Label>Letter Options</Select.Label>
                {options2.map((option) => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                  >
                    <FieldTypeAttachment />
                    <Select.Value>{option.label}</Select.Value>
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-stone-600">Third Select</label>
            <Select
              value={value3}
              onChange={setValue3}
              placement="bottom-end"
            >
              <Select.Trigger className="w-48">
                <Select.Value>{value3 || "Select option..."}</Select.Value>
              </Select.Trigger>
              <Select.Content>
                <Select.Label>Choice Options</Select.Label>
                {options3.map((option) => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                  >
                    <FieldTypeCheckbox />
                    <Select.Value>{option.label}</Select.Value>
                  </Select.Item>
                ))}
                <Select.Divider />
                <Select.Item
                  value="special"
                  disabled
                >
                  <FieldTypeCount />
                  <Select.Value>Disabled Option</Select.Value>
                </Select.Item>
              </Select.Content>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-lg bg-stone-50 p-4">
          <div className="text-sm font-medium text-stone-700">Current Values:</div>
          <div className="text-sm text-stone-600">
            First: <span className="font-mono">{value1}</span>
          </div>
          <div className="text-sm text-stone-600">
            Second: <span className="font-mono">{value2}</span>
          </div>
          <div className="text-sm text-stone-600">
            Third: <span className="font-mono">{value3}</span>
          </div>
        </div>

        <div className="text-xs text-stone-500">
          💡 Test: Try opening different selects rapidly to ensure proper event handling and no
          conflicts.
        </div>
      </div>
    )
  },
}

export const ItemActive: Story = {
  render: function ItemActiveStory() {
    const [open, setOpen] = useState(false)
    const [selectOpen, setSelectOpen] = useState(false)
    const itemRef = useRef<HTMLDivElement>(null)
    const [value, setValue] = useState<string | null>(null)

    const options = useMemo(
      () =>
        Array.from({ length: 10 }, (_, i) => ({
          value: `option-${i + 1}`,
          label: faker.music.songName(),
        })),
      [],
    )

    return (
      <>
        <Select
          value={value}
          onChange={setValue}
          open={selectOpen}
          onOpenChange={setSelectOpen}
        >
          <Select.Trigger className="relative">
            <Select.Value>
              {value ? options.find((option) => option.value === value)?.label : "Select ..."}
            </Select.Value>
            <div
              className="absolute inset-x-0 bottom-0 h-px"
              ref={itemRef}
            />
          </Select.Trigger>
          <Select.Content>
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
              >
                <Select.Value>{option.label}</Select.Value>
              </Select.Item>
            ))}
            <Select.Divider />
            <Select.Label selection={false}>Open Popover</Select.Label>
            <Select.Item
              onClick={() => {
                setOpen(true)
                setSelectOpen(false)
              }}
            >
              <Settings />
              <Select.Value>Open Popover</Select.Value>
            </Select.Item>
          </Select.Content>
        </Select>

        <Popover
          open={open}
          onOpenChange={setOpen}
          triggerRef={itemRef}
        >
          <Popover.Content className="w-64 p-4">{faker.lorem.paragraph()}</Popover.Content>
        </Popover>
      </>
    )
  },
}
