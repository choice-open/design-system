import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { MultiLineTextInput } from "./multi-line-text-input"

const meta: Meta<typeof MultiLineTextInput> = {
  title: "MultiLineTextInput",
  component: MultiLineTextInput,
}

export default meta

type Story = StoryObj<typeof MultiLineTextInput>

/**
 * `MultiLineTextInput` is a basic input component that can be used to input text.
 */
export const Basic: Story = {
  render: () => <MultiLineTextInput />,
}

/**
 * The `disabled` prop is used to disable the input.
 */
export const Disabled: Story = {
  render: function DisabledStory() {
    const [value, setValue] = useState("Disabled")
    return (
      <MultiLineTextInput
        value={value}
        onChange={(value) => setValue(value)}
        disabled
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
      <MultiLineTextInput
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
        <MultiLineTextInput value="Default" />
        <MultiLineTextInput
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
      <div className="flex flex-col gap-2">
        <MultiLineTextInput
          value={value}
          onChange={(value) => setValue(value)}
        />
        <div className="text-secondary-foreground text-sm">Value: {value}</div>
      </div>
    )
  },
}
