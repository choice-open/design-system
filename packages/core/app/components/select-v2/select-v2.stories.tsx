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
import { SelectV2 } from "./select-v2"

const meta: Meta<typeof SelectV2> = {
  title: "Collections/SelectV2",
  component: SelectV2,
  tags: ["upgrade"],
}

export default meta
type Story = StoryObj<typeof SelectV2>

/**
 * Basic select component using the new MenuContext system.
 *
 * Features:
 * - Enhanced MenuContextItem components
 * - Unified interaction handling with useEventCallback
 * - Improved keyboard navigation and selection
 * - Better ref management for floating UI
 */
export const Basic: Story = {
  render: function BasicStory() {
    const [value, setValue] = useState<string>("option-2")

    return (
      <SelectV2
        value={value}
        onChange={setValue}
      >
        <SelectV2.Trigger>
          <SelectV2.Value>{value || "Select an option..."}</SelectV2.Value>
        </SelectV2.Trigger>
        <SelectV2.Content>
          {Array.from({ length: 8 }, (_, i) => (
            <SelectV2.Item
              key={i}
              value={`option-${i + 1}`}
            >
              <SelectV2.Value>Option {i + 1}</SelectV2.Value>
            </SelectV2.Item>
          ))}
        </SelectV2.Content>
      </SelectV2>
    )
  },
}

/**
 * Select component in disabled state.
 */
export const Disabled: Story = {
  render: function DisabledStory() {
    const [value, setValue] = useState<string>("option-2")

    return (
      <SelectV2
        disabled
        value={value}
        onChange={setValue}
      >
        <SelectV2.Trigger>
          <SelectV2.Value>{value || "Select an option..."}</SelectV2.Value>
        </SelectV2.Trigger>
        <SelectV2.Content>
          {Array.from({ length: 5 }, (_, i) => (
            <SelectV2.Item
              key={i}
              value={`option-${i + 1}`}
            >
              <SelectV2.Value>Option {i + 1}</SelectV2.Value>
            </SelectV2.Item>
          ))}
        </SelectV2.Content>
      </SelectV2>
    )
  },
}

/**
 * Select with individual disabled options.
 */
export const DisabledOptions: Story = {
  render: function DisabledOptionsStory() {
    const [value, setValue] = useState<string>("option-2")

    return (
      <SelectV2
        value={value}
        onChange={setValue}
      >
        <SelectV2.Trigger>
          <SelectV2.Value>{value || "Select an option..."}</SelectV2.Value>
        </SelectV2.Trigger>
        <SelectV2.Content>
          <SelectV2.Item
            value="option-1"
            disabled
          >
            <SelectV2.Value>Option 1 (Disabled)</SelectV2.Value>
          </SelectV2.Item>
          <SelectV2.Item value="option-2">
            <SelectV2.Value>Option 2</SelectV2.Value>
          </SelectV2.Item>
          <SelectV2.Item value="option-3">
            <SelectV2.Value>Option 3</SelectV2.Value>
          </SelectV2.Item>
          <SelectV2.Item
            value="option-4"
            disabled
          >
            <SelectV2.Value>Option 4 (Disabled)</SelectV2.Value>
          </SelectV2.Item>
          <SelectV2.Item value="option-5">
            <SelectV2.Value>Option 5</SelectV2.Value>
          </SelectV2.Item>
        </SelectV2.Content>
      </SelectV2>
    )
  },
}

/**
 * Select with dividers for grouping options.
 */
export const WithDivider: Story = {
  render: function WithDividerStory() {
    const [value, setValue] = useState<string>("category-a-1")

    return (
      <SelectV2
        value={value}
        onChange={setValue}
      >
        <SelectV2.Trigger>
          <SelectV2.Value>{value || "Select an option..."}</SelectV2.Value>
        </SelectV2.Trigger>
        <SelectV2.Content>
          <SelectV2.Item value="category-a-1">
            <SelectV2.Value>Category A - Option 1</SelectV2.Value>
          </SelectV2.Item>
          <SelectV2.Item value="category-a-2">
            <SelectV2.Value>Category A - Option 2</SelectV2.Value>
          </SelectV2.Item>
          <SelectV2.Divider />
          <SelectV2.Item value="category-b-1">
            <SelectV2.Value>Category B - Option 1</SelectV2.Value>
          </SelectV2.Item>
          <SelectV2.Item value="category-b-2">
            <SelectV2.Value>Category B - Option 2</SelectV2.Value>
          </SelectV2.Item>
          <SelectV2.Divider />
          <SelectV2.Item value="category-c-1">
            <SelectV2.Value>Category C - Option 1</SelectV2.Value>
          </SelectV2.Item>
        </SelectV2.Content>
      </SelectV2>
    )
  },
}

/**
 * Select with labels for better organization.
 */
export const WithLabels: Story = {
  render: function WithLabelsStory() {
    const [value, setValue] = useState<string>("basic-1")

    return (
      <SelectV2
        value={value}
        onChange={setValue}
      >
        <SelectV2.Trigger>
          <SelectV2.Value>{value || "Select a plan..."}</SelectV2.Value>
        </SelectV2.Trigger>
        <SelectV2.Content>
          <SelectV2.Label>Basic Plans</SelectV2.Label>
          <SelectV2.Item value="basic-1">
            <SelectV2.Value>Basic - Starter</SelectV2.Value>
          </SelectV2.Item>
          <SelectV2.Item value="basic-2">
            <SelectV2.Value>Basic - Professional</SelectV2.Value>
          </SelectV2.Item>

          <SelectV2.Divider />

          <SelectV2.Label>Premium Plans</SelectV2.Label>
          <SelectV2.Item value="premium-1">
            <SelectV2.Value>Premium - Business</SelectV2.Value>
          </SelectV2.Item>
          <SelectV2.Item value="premium-2">
            <SelectV2.Value>Premium - Enterprise</SelectV2.Value>
          </SelectV2.Item>

          <SelectV2.Divider />

          <SelectV2.Label>Custom Solutions</SelectV2.Label>
          <SelectV2.Item value="custom-1">
            <SelectV2.Value>Custom - Tailored</SelectV2.Value>
          </SelectV2.Item>
        </SelectV2.Content>
      </SelectV2>
    )
  },
}

/**
 * Select with icons for better visual recognition.
 */
export const WithIcons: Story = {
  render: function WithIconsStory() {
    const [value, setValue] = useState<string>("attachment")

    return (
      <SelectV2
        value={value}
        onChange={setValue}
      >
        <SelectV2.Trigger>
          <SelectV2.Value>{value || "Select field type..."}</SelectV2.Value>
        </SelectV2.Trigger>
        <SelectV2.Content>
          <SelectV2.Item value="attachment">
            <FieldTypeAttachment />
            <SelectV2.Value>Attachment Field</SelectV2.Value>
          </SelectV2.Item>
          <SelectV2.Item value="checkbox">
            <FieldTypeCheckbox />
            <SelectV2.Value>Checkbox Field</SelectV2.Value>
          </SelectV2.Item>
          <SelectV2.Item value="count">
            <FieldTypeCount />
            <SelectV2.Value>Count Field</SelectV2.Value>
          </SelectV2.Item>
        </SelectV2.Content>
      </SelectV2>
    )
  },
}

/**
 * Select with a large number of options demonstrating scroll performance.
 */
export const LongList: Story = {
  render: function LongListStory() {
    const [value, setValue] = useState<string>("item-25")

    const options = useMemo(
      () =>
        Array.from({ length: 100 }, (_, i) => ({
          value: `item-${i + 1}`,
          label: `${faker.location.city()} ${i + 1}`,
        })),
      [],
    )

    return (
      <SelectV2
        value={value}
        onChange={setValue}
      >
        <SelectV2.Trigger>
          <SelectV2.Value>
            {value ? options.find((opt) => opt.value === value)?.label : "Select a city..."}
          </SelectV2.Value>
        </SelectV2.Trigger>
        <SelectV2.Content>
          <SelectV2.Label>Cities ({options.length} total)</SelectV2.Label>
          {options.map((option) => (
            <SelectV2.Item
              key={option.value}
              value={option.value}
            >
              <SelectV2.Value>{option.label}</SelectV2.Value>
            </SelectV2.Item>
          ))}
        </SelectV2.Content>
      </SelectV2>
    )
  },
}

/**
 * Select that matches the trigger width for consistent layout.
 */
export const MatchTriggerWidth: Story = {
  render: function MatchTriggerWidthStory() {
    const [value, setValue] = useState<string>("medium")

    const options = useMemo(
      () => [
        { value: "small", label: faker.music.songName() },
        { value: "medium", label: faker.music.songName() },
        { value: "large", label: faker.music.songName() },
        { value: "extra-large", label: faker.music.songName() },
      ],
      [],
    )

    return (
      <SelectV2
        value={value}
        onChange={setValue}
        matchTriggerWidth
      >
        <SelectV2.Trigger className="w-80">
          <SelectV2.Value>
            {value ? options.find((opt) => opt.value === value)?.label : "Select a song..."}
          </SelectV2.Value>
        </SelectV2.Trigger>
        <SelectV2.Content>
          <SelectV2.Label>Songs</SelectV2.Label>
          {options.map((option) => (
            <SelectV2.Item
              key={option.value}
              value={option.value}
            >
              <SelectV2.Value>{option.label}</SelectV2.Value>
            </SelectV2.Item>
          ))}
        </SelectV2.Content>
      </SelectV2>
    )
  },
}

/**
 * Select with different placement options.
 */
export const Placement: Story = {
  render: function PlacementStory() {
    const [value, setValue] = useState<string>("option-2")

    return (
      <div className="flex flex-wrap gap-4">
        <SelectV2
          value={value}
          onChange={setValue}
          placement="bottom-start"
        >
          <SelectV2.Trigger>
            <SelectV2.Value>Bottom Start</SelectV2.Value>
          </SelectV2.Trigger>
          <SelectV2.Content>
            {Array.from({ length: 5 }, (_, i) => (
              <SelectV2.Item
                key={i}
                value={`option-${i + 1}`}
              >
                <SelectV2.Value>Option {i + 1}</SelectV2.Value>
              </SelectV2.Item>
            ))}
          </SelectV2.Content>
        </SelectV2>

        <SelectV2
          value={value}
          onChange={setValue}
          placement="bottom-end"
        >
          <SelectV2.Trigger>
            <SelectV2.Value>Bottom End</SelectV2.Value>
          </SelectV2.Trigger>
          <SelectV2.Content>
            {Array.from({ length: 5 }, (_, i) => (
              <SelectV2.Item
                key={i}
                value={`option-${i + 1}`}
              >
                <SelectV2.Value>Option {i + 1}</SelectV2.Value>
              </SelectV2.Item>
            ))}
          </SelectV2.Content>
        </SelectV2>

        <SelectV2
          value={value}
          onChange={setValue}
          placement="bottom-start"
        >
          <SelectV2.Trigger>
            <SelectV2.Value>Another Bottom Start</SelectV2.Value>
          </SelectV2.Trigger>
          <SelectV2.Content>
            {Array.from({ length: 5 }, (_, i) => (
              <SelectV2.Item
                key={i}
                value={`option-${i + 1}`}
              >
                <SelectV2.Value>Option {i + 1}</SelectV2.Value>
              </SelectV2.Item>
            ))}
          </SelectV2.Content>
        </SelectV2>
      </div>
    )
  },
}

/**
 * Compound component pattern demonstration.
 */
export const CompoundComponent: Story = {
  render: function CompoundComponentStory() {
    const [value, setValue] = useState<string | null>("option-2")

    return (
      <div className="flex w-80 flex-col gap-8">
        <SelectV2
          value={value}
          onChange={setValue}
        >
          <SelectV2.Trigger>
            <SelectV2.Value>{value ? `Selected: ${value}` : "Choose an option..."}</SelectV2.Value>
          </SelectV2.Trigger>
          <SelectV2.Content>
            <SelectV2.Label>Available Options</SelectV2.Label>
            <SelectV2.Item value="option-1">
              <SelectV2.Value>First Option</SelectV2.Value>
            </SelectV2.Item>
            <SelectV2.Item value="option-2">
              <SelectV2.Value>Second Option</SelectV2.Value>
            </SelectV2.Item>
            <SelectV2.Divider />
            <SelectV2.Item value="option-3">
              <SelectV2.Value>Third Option</SelectV2.Value>
            </SelectV2.Item>
            <SelectV2.Item
              value="option-4"
              disabled
            >
              <SelectV2.Value>Disabled Option</SelectV2.Value>
            </SelectV2.Item>
          </SelectV2.Content>
        </SelectV2>

        <div className="rounded-lg bg-stone-50 p-4">
          <div className="mb-2 text-sm font-medium text-stone-700">Current Selection:</div>
          <div className="font-mono text-sm text-stone-600">{value || "None"}</div>
        </div>
      </div>
    )
  },
}

/**
 * Select positioned at edge cases for testing placement behavior.
 */
export const MarginalConditions: Story = {
  render: function MarginalConditionsStory() {
    const [value, setValue] = useState<string>("")

    return (
      <div className="flex h-screen flex-col justify-end p-4">
        <SelectV2
          value={value}
          onChange={setValue}
        >
          <SelectV2.Trigger>
            <SelectV2.Value>{value || "Edge case test..."}</SelectV2.Value>
          </SelectV2.Trigger>
          <SelectV2.Content>
            <SelectV2.Label>Edge Position Test</SelectV2.Label>
            {Array.from({ length: 12 }, (_, i) => (
              <SelectV2.Item
                key={i}
                value={`edge-option-${i + 1}`}
              >
                <SelectV2.Value>Edge Option {i + 1}</SelectV2.Value>
              </SelectV2.Item>
            ))}
          </SelectV2.Content>
        </SelectV2>
      </div>
    )
  },
}

/**
 * Multiple selects testing proper event handling and switching.
 */
export const Multiple: Story = {
  render: function MultipleStory() {
    const [value1, setValue1] = useState<string>("option-1")
    const [value2, setValue2] = useState<string>("choice-b")
    const [value3, setValue3] = useState<string>("item-ii")

    const options1 = Array.from({ length: 4 }, (_, i) => ({
      value: `option-${i + 1}`,
      label: `Option ${i + 1}`,
    }))

    const options2 = Array.from({ length: 4 }, (_, i) => ({
      value: `choice-${String.fromCharCode(97 + i)}`,
      label: `Choice ${String.fromCharCode(65 + i)}`,
    }))

    const options3 = Array.from({ length: 4 }, (_, i) => ({
      value: `item-${["i", "ii", "iii", "iv"][i]}`,
      label: `Item ${["I", "II", "III", "IV"][i]}`,
    }))

    return (
      <div className="flex flex-col gap-8 p-8">
        <div className="text-lg font-medium">Multiple Select Components Test</div>

        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-stone-600">First Select</label>
            <SelectV2
              value={value1}
              onChange={setValue1}
            >
              <SelectV2.Trigger className="w-48">
                <SelectV2.Value>
                  {value1
                    ? options1.find((opt) => opt.value === value1)?.label
                    : "Select option..."}
                </SelectV2.Value>
              </SelectV2.Trigger>
              <SelectV2.Content>
                <SelectV2.Label>Number Options</SelectV2.Label>
                {options1.map((option) => (
                  <SelectV2.Item
                    key={option.value}
                    value={option.value}
                  >
                    <SelectV2.Value>{option.label}</SelectV2.Value>
                  </SelectV2.Item>
                ))}
              </SelectV2.Content>
            </SelectV2>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-stone-600">Second Select</label>
            <SelectV2
              value={value2}
              onChange={setValue2}
            >
              <SelectV2.Trigger className="w-48">
                <SelectV2.Value>
                  {value2
                    ? options2.find((opt) => opt.value === value2)?.label
                    : "Select option..."}
                </SelectV2.Value>
              </SelectV2.Trigger>
              <SelectV2.Content>
                <SelectV2.Label>Letter Options</SelectV2.Label>
                {options2.map((option) => (
                  <SelectV2.Item
                    key={option.value}
                    value={option.value}
                  >
                    <FieldTypeAttachment />
                    <SelectV2.Value>{option.label}</SelectV2.Value>
                  </SelectV2.Item>
                ))}
              </SelectV2.Content>
            </SelectV2>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-stone-600">Third Select</label>
            <SelectV2
              value={value3}
              onChange={setValue3}
              placement="bottom-end"
            >
              <SelectV2.Trigger className="w-48">
                <SelectV2.Value>
                  {value3
                    ? options3.find((opt) => opt.value === value3)?.label
                    : "Select option..."}
                </SelectV2.Value>
              </SelectV2.Trigger>
              <SelectV2.Content>
                <SelectV2.Label>Roman Numerals</SelectV2.Label>
                {options3.map((option) => (
                  <SelectV2.Item
                    key={option.value}
                    value={option.value}
                  >
                    <FieldTypeCount />
                    <SelectV2.Value>{option.label}</SelectV2.Value>
                  </SelectV2.Item>
                ))}
                <SelectV2.Divider />
                <SelectV2.Item
                  value="special"
                  disabled
                >
                  <Settings />
                  <SelectV2.Value>Special Option (Disabled)</SelectV2.Value>
                </SelectV2.Item>
              </SelectV2.Content>
            </SelectV2>
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
          💡 Test: Try switching between different selects rapidly to ensure proper event handling.
        </div>
      </div>
    )
  },
}

/**
 * Select with active item handling and popover integration.
 */
export const ItemActive: Story = {
  render: function ItemActiveStory() {
    const [open, setOpen] = useState(false)
    const [selectOpen, setSelectOpen] = useState(false)
    const itemRef = useRef<HTMLDivElement>(null)
    const [value, setValue] = useState<string | null>(null)

    const options = useMemo(
      () =>
        Array.from({ length: 8 }, (_, i) => ({
          value: `option-${i + 1}`,
          label: faker.music.songName(),
        })),
      [],
    )

    return (
      <>
        <SelectV2
          value={value}
          onChange={setValue}
          open={selectOpen}
          onOpenChange={setSelectOpen}
        >
          <SelectV2.Trigger className="relative">
            <SelectV2.Value>
              {value ? options.find((option) => option.value === value)?.label : "Select song..."}
            </SelectV2.Value>
            <div
              className="absolute inset-x-0 bottom-0 h-px"
              ref={itemRef}
            />
          </SelectV2.Trigger>
          <SelectV2.Content>
            <SelectV2.Label>Music Library</SelectV2.Label>
            {options.map((option) => (
              <SelectV2.Item
                key={option.value}
                value={option.value}
              >
                <SelectV2.Value>{option.label}</SelectV2.Value>
              </SelectV2.Item>
            ))}
            <SelectV2.Divider />
            <SelectV2.Label>Actions</SelectV2.Label>
            <SelectV2.Item
              onClick={() => {
                setOpen(true)
                setSelectOpen(false)
              }}
            >
              <Settings />
              <SelectV2.Value>Open Music Settings</SelectV2.Value>
            </SelectV2.Item>
          </SelectV2.Content>
        </SelectV2>

        <Popover
          open={open}
          onOpenChange={setOpen}
          triggerRef={itemRef}
        >
          <Popover.Content className="w-80 p-4">
            <div className="space-y-4">
              <h3 className="font-medium">Music Settings</h3>
              <p className="text-sm text-stone-600">
                Configure your music playback preferences and library settings.
              </p>
              <div className="flex gap-2">
                <button
                  className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
                  onClick={() => setOpen(false)}
                >
                  Save
                </button>
                <button
                  className="rounded border px-3 py-1 text-sm"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Popover.Content>
        </Popover>
      </>
    )
  },
}

/**
 * Advanced select demonstrating complex real-world usage patterns.
 */
export const Advanced: Story = {
  render: function AdvancedStory() {
    const [status, setStatus] = useState<string>("active")
    const [priority, setPriority] = useState<string>("medium")
    const [assignee, setAssignee] = useState<string>("john-doe")

    const statusOptions = [
      { value: "active", label: "Active", color: "bg-green-500" },
      { value: "pending", label: "Pending", color: "bg-yellow-500" },
      { value: "completed", label: "Completed", color: "bg-blue-500" },
      { value: "cancelled", label: "Cancelled", color: "bg-red-500" },
    ]

    const priorityOptions = [
      { value: "low", label: "Low Priority", icon: "📋" },
      { value: "medium", label: "Medium Priority", icon: "⚡" },
      { value: "high", label: "High Priority", icon: "🔥" },
      { value: "urgent", label: "Urgent", icon: "🚨" },
    ]

    const assigneeOptions = useMemo(
      () =>
        Array.from({ length: 6 }, (_, i) => ({
          value: `user-${i + 1}`,
          name: faker.person.fullName(),
          email: faker.internet.email(),
        })),
      [],
    )

    return (
      <div className="space-y-6 p-6">
        <h2 className="text-xl font-semibold">Task Management</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-700">Status</label>
            <SelectV2
              value={status}
              onChange={setStatus}
            >
              <SelectV2.Trigger className="w-full">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${statusOptions.find((opt) => opt.value === status)?.color}`}
                  />
                  <SelectV2.Value>
                    {statusOptions.find((opt) => opt.value === status)?.label}
                  </SelectV2.Value>
                </div>
              </SelectV2.Trigger>
              <SelectV2.Content>
                <SelectV2.Label>Task Status</SelectV2.Label>
                {statusOptions.map((option) => (
                  <SelectV2.Item
                    key={option.value}
                    value={option.value}
                  >
                    <div className={`h-2 w-2 rounded-full ${option.color}`} />
                    <SelectV2.Value>{option.label}</SelectV2.Value>
                  </SelectV2.Item>
                ))}
              </SelectV2.Content>
            </SelectV2>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-700">Priority</label>
            <SelectV2
              value={priority}
              onChange={setPriority}
            >
              <SelectV2.Trigger className="w-full">
                <SelectV2.Value>
                  {priorityOptions.find((opt) => opt.value === priority)?.icon}{" "}
                  {priorityOptions.find((opt) => opt.value === priority)?.label}
                </SelectV2.Value>
              </SelectV2.Trigger>
              <SelectV2.Content>
                <SelectV2.Label>Priority Level</SelectV2.Label>
                {priorityOptions.map((option) => (
                  <SelectV2.Item
                    key={option.value}
                    value={option.value}
                  >
                    <span className="text-base">{option.icon}</span>
                    <SelectV2.Value>{option.label}</SelectV2.Value>
                  </SelectV2.Item>
                ))}
              </SelectV2.Content>
            </SelectV2>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-700">Assignee</label>
            <SelectV2
              value={assignee}
              onChange={setAssignee}
            >
              <SelectV2.Trigger className="w-full">
                <SelectV2.Value>
                  {assigneeOptions.find((opt) => opt.value === assignee)?.name || "Unassigned"}
                </SelectV2.Value>
              </SelectV2.Trigger>
              <SelectV2.Content>
                <SelectV2.Label>Team Members</SelectV2.Label>
                <SelectV2.Item value="unassigned">
                  <SelectV2.Value>Unassigned</SelectV2.Value>
                </SelectV2.Item>
                <SelectV2.Divider />
                {assigneeOptions.map((option) => (
                  <SelectV2.Item
                    key={option.value}
                    value={option.value}
                  >
                    <div className="flex flex-col">
                      <SelectV2.Value>{option.name}</SelectV2.Value>
                      <span className="text-xs text-stone-500">{option.email}</span>
                    </div>
                  </SelectV2.Item>
                ))}
              </SelectV2.Content>
            </SelectV2>
          </div>
        </div>

        <div className="rounded-lg border bg-stone-50 p-4">
          <h3 className="mb-2 font-medium">Current Configuration</h3>
          <div className="space-y-1 text-sm">
            <div>
              Status: <span className="font-mono">{status}</span>
            </div>
            <div>
              Priority: <span className="font-mono">{priority}</span>
            </div>
            <div>
              Assignee: <span className="font-mono">{assignee}</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
}
