import { faker } from "@faker-js/faker"
import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Button } from "../button"
import { Dialog } from "./dialog"
import { Dropdown } from "../dropdown"
import { Select } from "../select"
import { Popover } from "../popover"
import React from "react"

const meta: Meta<typeof Dialog> = {
  title: "Dialog",
  component: Dialog,
}

export default meta

type Story = StoryObj<typeof Dialog>

/**
 * The `IfDragDialog` component is a draggable dialog component that is used to display a dialog.
 * It is a controlled component that requires a `open` prop and an `onOpenChange` prop.
 * - Draggable dialog window
 * - Resizable width/height
 * - Modal/non-modal modes
 * - Custom header support
 */
export const Basic: Story = {
  render: function BasicStory() {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(!open)}>Open Dialog</Button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
        >
          <Dialog.Header title="Dialog Title" />
          <Dialog.Content className="w-96 p-3">{faker.lorem.paragraphs(3)}</Dialog.Content>
        </Dialog>
      </>
    )
  },
}

/**
 * - `draggable`: Whether the dialog is draggable.
 */
export const Draggable: Story = {
  render: function DragStory() {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(!open)}>Open Dialog</Button>
        <Dialog
          draggable
          open={open}
          onOpenChange={setOpen}
        >
          <Dialog.Header title="Draggable Dialog Title" />
          <Dialog.Content className="w-96 p-3">{faker.lorem.paragraphs(3)}</Dialog.Content>
        </Dialog>
      </>
    )
  },
}

/**
 * - `overlay`: Whether the dialog is an overlay.
 * - When `overlay` is enabled, the overlay will cover the page content.
 */
export const Overlay: Story = {
  render: function OverlayStory() {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(!open)}>Open Dialog</Button>
        <Dialog
          overlay
          draggable
          open={open}
          onOpenChange={setOpen}
        >
          <Dialog.Header title="Overlay Dialog Title" />
          <Dialog.Content className="w-96 p-3">{faker.lorem.paragraphs(3)}</Dialog.Content>
        </Dialog>
      </>
    )
  },
}

/**
 * - `overlay`: Whether the dialog is an overlay.
 * - `classNames.backdrop`: Custom backdrop class.
 */
export const CustomBackdrop: Story = {
  render: function CustomBackdropStory() {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(!open)}>Open Dialog</Button>
        <Dialog
          overlay
          open={open}
          onOpenChange={setOpen}
        >
          <Dialog.Backdrop />
          <Dialog.Header title="Custom Backdrop Dialog Title" />
          <Dialog.Content className="w-96 p-3">{faker.lorem.paragraphs(3)}</Dialog.Content>
        </Dialog>
      </>
    )
  },
}

/**
 * - `outsidePress`: Whether the dialog can be closed by clicking outside the dialog.
 */
export const OutsidePress: Story = {
  render: function OutsidePressStory() {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(!open)}>Open Dialog</Button>
        <Dialog
          outsidePress
          open={open}
          onOpenChange={setOpen}
        >
          <Dialog.Header title="Outside Press Dialog Title" />
          <Dialog.Content className="w-96 p-3">{faker.lorem.paragraphs(3)}</Dialog.Content>
        </Dialog>
      </>
    )
  },
}

/**
 * - `resizable`: Whether the dialog is resizable.
 * - `resizable.width`: Whether the dialog is resizable by width.
 * - `resizable.height`: Whether the dialog is resizable by height.
 *
 * | If `resizable` is enabled, it is recommended to set the className of the content to `overflow-y-auto` to prevent content overflow issues.
 */
export const Resizable: Story = {
  render: function ResizableStory() {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(!open)}>Open Dialog</Button>
        <Dialog
          draggable
          overlay
          resizable={{ width: true, height: true }}
          open={open}
          onOpenChange={setOpen}
        >
          <Dialog.Header title="Resizable Dialog Title" />
          <Dialog.Content className="w-96 overflow-y-auto p-3">
            {faker.lorem.paragraphs(3)}
          </Dialog.Content>
        </Dialog>
      </>
    )
  },
}

export const Nested: Story = {
  render: function NestedStory() {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(!open)}>Open Dialog</Button>
        <Dialog
          open={open}
          outsidePress
          onOpenChange={setOpen}
        >
          <Dialog.Header title="Nested Dialog Title" />
          <Dialog.Content className="w-96 p-3">
            <Select
              value="option-1"
              onChange={() => {}}
            >
              <Select.Trigger>Open</Select.Trigger>
              <Select.Item value="option-1">Option 1</Select.Item>
              <Select.Item value="option-2">Option 2</Select.Item>
              <Select.Item value="option-3">Option 3</Select.Item>
            </Select>
            <Popover>
              <Popover.Trigger>
                <Button>Open</Button>
              </Popover.Trigger>
              <Popover.Content className="w-64 p-3">{faker.lorem.paragraph(3)}</Popover.Content>
            </Popover>
            <Dropdown>
              <Dropdown.Trigger>Open</Dropdown.Trigger>
              <Dropdown.Item>Option 1</Dropdown.Item>
              <Dropdown.Item>Option 2</Dropdown.Item>
            </Dropdown>
          </Dialog.Content>
        </Dialog>
      </>
    )
  },
}
