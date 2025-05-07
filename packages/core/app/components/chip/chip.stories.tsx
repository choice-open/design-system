import { SearchSmall } from "@choiceform/icons-react"
import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Chip } from "."

const meta = {
  title: "Chip",
  component: Chip,
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: function BasicStory() {
    return <Chip>Chip</Chip>
  },
}

export const Selected: Story = {
  render: function SelectedStory() {
    const [selected, setSelected] = useState(false)

    return (
      <Chip
        selected={selected}
        onClick={() => setSelected(!selected)}
      >
        Chip
      </Chip>
    )
  },
}

export const OnRemove: Story = {
  render: function OnRemoveStory() {
    const [chips, setChips] = useState<string[]>(["Chip 1", "Chip 2", "Chip 3"])
    const [selected, setSelected] = useState<string[]>([])

    return (
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <Chip
            key={chip}
            selected={selected.includes(chip)}
            onClick={() => {
              setSelected(
                selected.includes(chip) ? selected.filter((c) => c !== chip) : [...selected, chip],
              )
            }}
            onRemove={() => {
              setChips(chips.filter((c) => c !== chip))
            }}
          >
            {chip}
          </Chip>
        ))}
      </div>
    )
  },
}

export const Prefix: Story = {
  render: function PrefixStory() {
    return <Chip prefixElement={<div className="h-2 w-2 rounded-full bg-red-500" />}>Chip</Chip>
  },
}

export const Suffix: Story = {
  render: function SuffixStory() {
    return <Chip suffixElement={<SearchSmall />}>Chip</Chip>
  },
}
