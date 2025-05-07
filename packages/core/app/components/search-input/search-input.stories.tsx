import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { SearchInput } from "./search-input"

const meta: Meta<typeof SearchInput> = {
  title: "SearchInput",
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
