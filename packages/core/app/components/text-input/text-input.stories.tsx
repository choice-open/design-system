import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { TextInput } from "./text-input"
import React from "react"

const meta: Meta<typeof TextInput> = {
  title: "TextInput",
  component: TextInput,
}

export default meta

type Story = StoryObj<typeof TextInput>

/**
 * `TextInput` is a basic input component that can be used to input text.
 */
export const Basic: Story = {
  render: () => <TextInput />,
}

/**
 * The `disabled` prop is used to disable the input.
 */
export const Disabled: Story = {
  render: function DisabledStory() {
    const [value, setValue] = useState("Disabled")
    return (
      <TextInput
        value={value}
        onChange={(value) => setValue(value)}
        disabled
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
      <TextInput
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
      <TextInput
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
        <TextInput value="Default" />
        <TextInput
          value="Transparent"
          variant="transparent"
        />
      </>
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
      <TextInput
        value={value}
        onChange={(value) => setValue(value)}
      />
    )
  },
}
