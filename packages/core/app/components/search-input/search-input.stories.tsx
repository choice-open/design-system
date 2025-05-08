import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { SearchInput } from "./search-input"

const meta: Meta<typeof SearchInput> = {
  title: "Forms/SearchInput",
  component: SearchInput,
}

export default meta

type Story = StoryObj<typeof SearchInput>

/**
 * `SearchInput` is a basic input component that can be used to input text.
 */
export const Basic: Story = {
  render: function BasicStory() {
    const [value, setValue] = useState("")

    return (
      <SearchInput
        value={value}
        onChange={setValue}
      />
    )
  },
}

export const Size: Story = {
  render: function SizeStory() {
    const [value, setValue] = useState("")

    return (
      <SearchInput
        value={value}
        onChange={setValue}
        size="large"
      />
    )
  },
}

export const Disabled: Story = {
  render: function DisabledStory() {
    return <SearchInput disabled />
  },
}

export const Dark: Story = {
  render: function DarkStory() {
    const [value, setValue] = useState("")

    return (
      <div className="flex aspect-square items-center justify-center bg-gray-800 p-8">
        <SearchInput
          value={value}
          onChange={setValue}
          variant="dark"
        />
      </div>
    )
  },
}

export const DarkWithDisabled: Story = {
  render: function DarkWithDisabledStory() {
    const [value, setValue] = useState("")

    return (
      <div className="flex aspect-square items-center justify-center bg-gray-800 p-8">
        <SearchInput
          value={value}
          onChange={setValue}
          variant="dark"
          disabled
        />
      </div>
    )
  },
}
