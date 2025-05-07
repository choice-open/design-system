import { Check, Remove } from "@choiceform/icons-react"
import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { Button } from "../button"
import { ToggleButton } from "../toggle-button"
import { Tooltip } from "./tooltip"

const meta: Meta<typeof Tooltip> = {
  title: "Tooltip",
  component: Tooltip,
}

export default meta

type Story = StoryObj<typeof Tooltip>

const BasicStory = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col items-start gap-4 px-8">
      <strong>Basic</strong>
      <Tooltip content="This is a tooltip">
        <Button>Tooltip 1</Button>
      </Tooltip>
      <Tooltip content="This is a tooltip">
        <Button>Tooltip 2</Button>
      </Tooltip>

      <strong>With class names</strong>
      <Tooltip
        content="This is a tooltip"
        classNames={{
          content: "bg-accent text-white",
          arrow: "fill-accent",
        }}
      >
        <Button>Tooltip 3</Button>
      </Tooltip>

      <strong>Side</strong>
      <div className="flex gap-2">
        {["top", "right", "left", "bottom"].map((side) => (
          <Tooltip
            key={side}
            content="This is a tooltip"
            placement={side as "top" | "right" | "bottom" | "left"}
          >
            <Button>Tooltip {side}</Button>
          </Tooltip>
        ))}
      </div>

      <strong>Align</strong>
      <div className="grid w-full grid-cols-3 gap-2">
        {["start", "center", "end"].map((align) => (
          <Tooltip
            key={align}
            content="This is a tooltip"
            align={align as "start" | "center" | "end"}
          >
            <Button>Tooltip {align}</Button>
          </Tooltip>
        ))}
      </div>

      <strong>Controlled</strong>
      <div className="flex items-center gap-2">
        <Tooltip
          content="This is a tooltip"
          open={open}
          onOpenChange={setOpen}
        >
          <Button>Tooltip</Button>
        </Tooltip>
        <ToggleButton
          value={open}
          onChange={setOpen}
        >
          {open ? <Check /> : <Remove />}
        </ToggleButton>
      </div>

      <strong>Default open</strong>
      <Tooltip
        content="This is a tooltip"
        defaultOpen
      >
        <Button>Tooltip</Button>
      </Tooltip>
    </div>
  )
}

/**
 * Shows how to use the `Tooltip` component.
 *
 * ### Features
 * - Display a tooltip
 * - Support for custom class names
 *
 * ### Usage
 * ```tsx
 * <Tooltip content="This is a tooltip">
 *   <Button>Tooltip</Button>
 * </Tooltip>
 * ```
 */

export const Basic: Story = {
  render: () => <BasicStory />,
}

const ShortcutStory = () => {
  return (
    <Tooltip
      content="This is a tooltip"
      shortcut={{ modifier: "command", keys: "K" }}
    >
      <Button>Tooltip</Button>
    </Tooltip>
  )
}

/**
 * Shows how to use the `shortcut` prop to add keyboard shortcuts to a tooltip.
 *
 * ### Features
 * - Display keyboard shortcuts
 * - Support for modifier keys
 *
 * ### Usage
 * ```tsx
 * <Tooltip
 *   content="This is a tooltip"
 *   shortcut={{ modifier: "command", keys: "K" }}
 * >
 *   <Button>Tooltip</Button>
 * </Tooltip>
 * ```
 */

export const Shortcut: Story = {
  render: () => <ShortcutStory />,
}
