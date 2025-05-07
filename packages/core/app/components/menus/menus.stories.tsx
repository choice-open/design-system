import { Check, Search } from "@choiceform/icons-react"
import { faker } from "@faker-js/faker"
import { Story } from "@storybook/blocks"
import type { Meta, StoryObj } from "@storybook/react"
import React, { useMemo, useState } from "react"
import { MenuSearch, MenuSearchEmpty } from "./components"
import { Menus } from "./menus"

const meta: Meta<typeof Menus> = {
  title: "Menus",
  component: Menus,
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Menus>

const options = Array.from({ length: 6 }, () => ({
  label: faker.music.songName(),
  value: faker.string.uuid(),
}))

export const Basic: Story = {
  render: function BasicStory() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    return (
      <Menus className="w-64">
        {options.map((option, index) => (
          <Menus.Item
            key={option.value}
            active={activeIndex === index}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <span className="flex-1 truncate">{option.label}</span>
          </Menus.Item>
        ))}
      </Menus>
    )
  },
}

export const SearchStory: Story = {
  render: function SearchStory() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [search, setSearch] = useState("")

    const filteredOptions = useMemo(() => {
      return options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase()))
    }, [search])

    return (
      <Menus className="w-64">
        <MenuSearch
          value={search}
          onChange={setSearch}
        />

        <Menus.Divider />

        {filteredOptions.map((option, index) => (
          <Menus.Item
            key={option.value}
            active={activeIndex === index}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <span className="flex-1 truncate">{option.label}</span>
          </Menus.Item>
        ))}

        {filteredOptions.length === 0 && (
          <MenuSearchEmpty onClear={() => setSearch("")}>
            <Search
              className="text-secondary"
              width={32}
              height={32}
            />
          </MenuSearchEmpty>
        )}
      </Menus>
    )
  },
}

export const InputStory: Story = {
  render: function InputStory() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    return (
      <Menus className="w-64">
        <Menus.Input />

        <Menus.Divider />

        {options.map((option, index) => (
          <Menus.Item
            key={option.value}
            active={activeIndex === index}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <span className="flex-1 truncate">{option.label}</span>
          </Menus.Item>
        ))}
      </Menus>
    )
  },
}

export const ButtonStory: Story = {
  render: function ButtonStory() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [selectedIndex, setSelectedIndex] = useState<number[]>([])
    return (
      <Menus className="w-64">
        <Menus.Label>Menu</Menus.Label>
        {options.map((option, index) => (
          <Menus.Item
            key={option.value}
            active={activeIndex === index}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            selected={selectedIndex.includes(index)}
            prefixElement={selectedIndex.includes(index) ? <Check /> : <></>}
            onMouseDown={() =>
              setSelectedIndex((prev) =>
                prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
              )
            }
          >
            <span className="flex-1 truncate">{option.label}</span>
          </Menus.Item>
        ))}
        <Menus.Divider />
        <Menus.Button onClick={() => setSelectedIndex([])}>Button</Menus.Button>
      </Menus>
    )
  },
}
