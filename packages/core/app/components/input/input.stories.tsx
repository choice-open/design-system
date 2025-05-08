import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { Input } from "./input"

const meta: Meta<typeof Input> = {
  title: "Forms/Input",
  component: Input,
}

export default meta

type Story = StoryObj<typeof Input>

/**
 * `Input` is a basic input component that can be used to input text.
 */
export const Basic: Story = {
  render: () => <Input />,
}

/**
 * The `disabled` prop is used to disable the input.
 */
export const Disabled: Story = {
  render: function DisabledStory() {
    const [value, setValue] = useState("Disabled")
    return (
      <Input
        value={value}
        onChange={(value) => setValue(value)}
        disabled
      />
    )
  },
}

/**
 * The `readOnly` prop is used to make the input read-only.
 */
export const ReadOnly: Story = {
  render: function ReadOnlyStory() {
    const [value, setValue] = useState("Read Only")
    return (
      <Input
        readOnly
        value={value}
        onChange={(value) => setValue(value)}
      />
    )
  },
}

/**
 * The `selected` prop is used to select the input.
 * - `selected` option is generally used when the external container is selected and the input needs to be highlighted.
 */
export const Selected: Story = {
  render: function SelectedStory() {
    const [value, setValue] = useState("Selected")
    return (
      <Input
        value={value}
        onChange={(value) => setValue(value)}
        selected
      />
    )
  },
}

/**
 * The `placeholder` prop is used to display a placeholder text.
 */
export const Placeholder: Story = {
  render: function PlaceholderStory() {
    const [value, setValue] = useState("")
    return (
      <Input
        placeholder="Placeholder"
        value={value}
        onChange={(value) => setValue(value)}
      />
    )
  },
}

/**
 * The `variant` prop is used to set the variant of the input.
 * - `default`: default variant
 * - `transparent`: transparent variant
 *
 * | The transparent variant is generally used in scenarios where no styling is needed.
 */
export const Variants: Story = {
  render: function VariantsStory() {
    return (
      <>
        <Input value="Default" />
        <Input
          value="Reset"
          variant="reset"
        />
      </>
    )
  },
}

/**
 * The `variant` prop is used to set the variant of the input.
 * - `dark`: dark variant
 * - `default`: default variant
 * - `reset`: reset variant
 */
export const Dark: Story = {
  render: function DarkStory() {
    return (
      <div className="flex aspect-square items-center justify-center bg-gray-800 p-8">
        <Input
          variant="dark"
          placeholder="Dark"
        />
      </div>
    )
  },
}

/**
 * The `disabled` prop is used to disable the input.
 */
export const DarkWithDisabled: Story = {
  render: function DarkWithDisabledStory() {
    return (
      <div className="flex aspect-square items-center justify-center bg-gray-800 p-8">
        <Input
          variant="dark"
          placeholder="Dark"
          disabled
        />
      </div>
    )
  },
}

/**
 * The `value` and `onChange` props are used to control the input value.
 */
export const Controlled: Story = {
  render: function ControlledStory() {
    const [value, setValue] = useState("Controlled")
    return (
      <Input
        value={value}
        onChange={(value) => setValue(value)}
      />
    )
  },
}
