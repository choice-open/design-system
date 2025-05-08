import { faker } from "@faker-js/faker"
import type { Placement as FloatingPlacement } from "@floating-ui/react"
import type { Meta, StoryObj } from "@storybook/react"
import React, { useMemo, useRef, useState } from "react"
import { Button } from "../button"
import { Dropdown } from "../dropdown"
import { Input } from "../input"
import { Select } from "../select"
import { Tabs } from "../tabs"
import { Popover } from "./popover"

const meta: Meta<typeof Popover> = {
  title: "Overlays/Popover",
  component: Popover,
}

export default meta

type Story = StoryObj<typeof Popover>

/**
 * `IfDragPopover` is a floating popover component with dragging support and flexible interaction modes.
 * - Floating positioning with auto-adjustment
 * - Draggable popover (optional)
 * - Multiple trigger modes (click/hover/focus)
 * - Custom header and content support
 * - `content`: The content of the popover.
 * - `children`: The trigger of the popover.
 */
export const Basic: Story = {
  render: function BasicStory() {
    return (
      <Popover>
        <Popover.Trigger>
          <Button>Open</Button>
        </Popover.Trigger>
        <Popover.Content className="w-64 p-3">{faker.lorem.paragraph(3)}</Popover.Content>
      </Popover>
    )
  },
}

/**
 * - `defaultOpen`: Whether the popover is open by default.
 */
export const DefaultOpen: Story = {
  render: function DefaultOpenStory() {
    return (
      <Popover defaultOpen>
        <Popover.Trigger>
          <Button>Open</Button>
        </Popover.Trigger>
        <Popover.Content className="w-64 p-3">{faker.lorem.paragraph(3)}</Popover.Content>
      </Popover>
    )
  },
}

/**
 * - `offset`: The offset of the popover.
 */
export const Offset: Story = {
  render: function OffsetStory() {
    return (
      <Popover offset={16}>
        <Popover.Trigger>
          <Button>Open</Button>
        </Popover.Trigger>
        <Popover.Content className="w-64 p-3">{faker.lorem.paragraph(3)}</Popover.Content>
      </Popover>
    )
  },
}

/**
 * - `interactions`: The interactions of the popover.
 *    - `none`: The popover is not open.
 *    - `hover`: The popover is open when the mouse is over the trigger.
 *    - `click`: The popover is open when the trigger is clicked.
 *    - `focus`: The popover is open when the trigger is focused.
 */
export const Interactions: Story = {
  render: function InteractionsStory() {
    return (
      <>
        <Popover interactions="hover">
          <Popover.Trigger>
            <Button>Hover</Button>
          </Popover.Trigger>
          <Popover.Content className="w-64 p-3">{faker.lorem.paragraph(3)}</Popover.Content>
        </Popover>

        <Popover interactions="click">
          <Popover.Trigger>
            <Button>Click</Button>
          </Popover.Trigger>
          <Popover.Content className="w-64 p-3">{faker.lorem.paragraph(3)}</Popover.Content>
        </Popover>

        <Popover interactions="focus">
          <Popover.Trigger>
            <Input placeholder="Use tab to focus" />
          </Popover.Trigger>
          <Popover.Content className="w-64 p-3">{faker.lorem.paragraph(3)}</Popover.Content>
        </Popover>
      </>
    )
  },
}

/**
 * - `open`: Whether the popover is open.
 * - `onOpenChange`: Callback function that is called when the popover is opened or closed.
 */
export const Controlled: Story = {
  render: function ControlledStory() {
    const [open, setOpen] = useState(false)
    return (
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <Popover.Trigger>
          <Button active={open}>Click: {open ? "Close" : "Open"}</Button>
        </Popover.Trigger>
        <Popover.Content className="w-64 p-3">{faker.lorem.paragraph(3)}</Popover.Content>
      </Popover>
    )
  },
}

/**
 * - `triggerRef`: The reference to the trigger element.
 *
 * | The use case is when the trigger element is outside the Popover, manual control of the Popover's open and close state is required.
 */
export const TriggerRef: Story = {
  render: function TriggerRefStory() {
    const [open, setOpen] = useState(false)
    const triggerRef = useRef<HTMLButtonElement>(null)
    return (
      <>
        <Button
          ref={triggerRef}
          active={open}
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Open"}
        </Button>

        <Popover
          triggerRef={triggerRef}
          open={open}
          onOpenChange={setOpen}
        >
          <Popover.Content className="w-64 p-3">{faker.lorem.paragraph(3)}</Popover.Content>
        </Popover>
      </>
    )
  },
}

/**
 * - `placement`: The placement of the popover.
 */
export const Placement: Story = {
  render: function PlacementStory() {
    const PLACEMENTS = [
      { label: "Top", value: "top" },
      { label: "Top Start", value: "top-start" },
      { label: "Top End", value: "top-end" },
      { label: "Bottom", value: "bottom" },
      { label: "Bottom Start", value: "bottom-start" },
      { label: "Bottom End", value: "bottom-end" },
      { label: "Left", value: "left" },
      { label: "Left Start", value: "left-start" },
      { label: "Left End", value: "left-end" },
      { label: "Right", value: "right" },
      { label: "Right Start", value: "right-start" },
      { label: "Right End", value: "right-end" },
    ]
    const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
    const [placement, setPlacement] = useState<FloatingPlacement>("bottom-start")
    const [open, setOpen] = useState(false)

    return (
      <>
        <div className="grid grid-cols-3 gap-2">
          {PLACEMENTS.map((option) => {
            return (
              <Button
                ref={(node) => {
                  if (node) {
                    triggerRefs.current.set(option.value, node)
                  }
                }}
                key={option.value}
                onMouseDown={() => {
                  setPlacement(option.value as FloatingPlacement)
                  setOpen(true)
                }}
              >
                {option.label}
              </Button>
            )
          })}
        </div>

        <Popover
          triggerRef={{ current: triggerRefs.current.get(placement) ?? null }}
          placement={placement}
          open={open}
          onOpenChange={setOpen}
        >
          <Popover.Content className="w-64 p-3">{faker.lorem.paragraph(3)}</Popover.Content>
        </Popover>
      </>
    )
  },
}

/**
 * - `draggable`: Whether the popover is draggable.
 */
export const Draggable: Story = {
  render: function DraggableStory() {
    const [open, setOpen] = useState(false)
    return (
      <Popover
        draggable
        open={open}
        onOpenChange={setOpen}
      >
        <Popover.Trigger>
          <Button active={open}>Drag: {open ? "Close" : "Open"}</Button>
        </Popover.Trigger>

        <Popover.Header title="Drag" />
        <Popover.Content className="w-64 p-3">{faker.lorem.paragraph(3)}</Popover.Content>
      </Popover>
    )
  },
}

/**
 * - `outside-press-ignore` class is used to ignore the outside press event.
 */
export const OutsidePressIgnore: Story = {
  render: function OutsidePressIgnoreStory() {
    const [open, setOpen] = useState(false)
    return (
      <div className="outside-press-ignore rounded-lg border p-16">
        <Popover
          open={open}
          onOpenChange={setOpen}
          outsidePressIgnore="outside-press-ignore"
        >
          <Popover.Trigger>
            <Button>{open ? "Close" : "Open"}</Button>
          </Popover.Trigger>
          <Popover.Content className="w-64 p-3">{faker.lorem.paragraph(3)}</Popover.Content>
        </Popover>
      </div>
    )
  },
}

/**
 * - `header`: The header of the popover.
 */
export const Header: Story = {
  render: function HeaderStory() {
    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState("tab-1")

    const header = useMemo(
      () => (
        <div className="flex h-10 items-center justify-between px-3">
          <Tabs
            value={tab}
            onChange={setTab}
          >
            <Tabs.Item value="tab-1">Tab 1</Tabs.Item>
            <Tabs.Item value="tab-2">Tab 2</Tabs.Item>
            <Tabs.Item value="tab-3">Tab 3</Tabs.Item>
          </Tabs>
        </div>
      ),
      [tab, setTab],
    )

    return (
      <Popover
        draggable
        open={open}
        onOpenChange={setOpen}
      >
        <Popover.Trigger>
          <Button>{open ? "Close" : "Open"}</Button>
        </Popover.Trigger>
        <Popover.Header>{header}</Popover.Header>
        <Popover.Content className="w-64 p-3">{faker.lorem.paragraph(3)}</Popover.Content>
      </Popover>
    )
  },
}

export const Nested: Story = {
  render: function NestedStory() {
    const [open, setOpen] = useState(false)
    return (
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <Popover.Trigger>
          <Button>{open ? "Close" : "Open"}</Button>
        </Popover.Trigger>
        <Popover.Content className="flex gap-4 p-4">
          <Select
            value="option-1"
            onChange={() => {}}
          >
            <Select.Trigger>Select</Select.Trigger>
            <Select.Content>
              <Select.Item value="option-1">Option 1</Select.Item>
              <Select.Item value="option-2">Option 2</Select.Item>
            </Select.Content>
          </Select>

          <Popover>
            <Popover.Trigger>
              <Button>Popover</Button>
            </Popover.Trigger>
            <Popover.Content className="w-64 p-3">{faker.lorem.paragraph(3)}</Popover.Content>
          </Popover>

          <Dropdown disabledNested>
            <Dropdown.Trigger>Dropdown</Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item>Option 1</Dropdown.Item>
              <Dropdown.Item>Option 2</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </Popover.Content>
      </Popover>
    )
  },
}
