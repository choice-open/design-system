import {
  Check,
  ChevronRightSmall,
  ThemeMoonDark,
  ThemeSunBright,
  ThemeSystem,
} from "@choiceform/icons-react"
import { faker } from "@faker-js/faker"
import { Story } from "@storybook/blocks"
import type { Meta, StoryObj } from "@storybook/react"
import React, { ReactNode, useMemo, useState } from "react"
import { tcx } from "../../utils"
import { Avatar } from "../avatar"
import { KbdKey } from "../kbd"
import { MenuItem } from "./components"
import { Menus } from "./menus"

const meta: Meta<typeof MenuItem> = {
  title: "Collections/MenuItem",
  component: MenuItem,
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof MenuItem>

export const Basic: Story = {
  render: function BasicStory() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    return (
      <Menus>
        <Menus.Item
          active={activeIndex === 0}
          onMouseEnter={() => setActiveIndex(0)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <span>Item</span>
        </Menus.Item>
      </Menus>
    )
  },
}

export const WithPrefixStory: Story = {
  render: function WithPrefixStory() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const Options = [
      {
        label: "Sun Bright",
        icon: <ThemeSunBright />,
      },
      {
        label: "Moon Dark",
        icon: <ThemeMoonDark />,
      },
      {
        label: "System",
        icon: <ThemeSystem />,
      },
    ]

    return (
      <Menus>
        {Options.map((option, index) => (
          <Menus.Item
            key={option.label}
            active={activeIndex === index}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            prefixElement={option.icon}
          >
            <span className="flex-1 truncate">{option.label}</span>
          </Menus.Item>
        ))}
      </Menus>
    )
  },
}

export const WithSuffixStory: Story = {
  render: function WithSuffixStory() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    return (
      <Menus>
        {Array.from({ length: 4 }).map((_, index) => (
          <Menus.Item
            key={index}
            active={activeIndex === index}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            suffixElement={<ChevronRightSmall />}
          >
            <span className="flex-1 truncate">Item</span>
          </Menus.Item>
        ))}
      </Menus>
    )
  },
}

export const WithShortcutStory: Story = {
  render: function WithShortcutStory() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const Options = [
      {
        label: "Option 1",
        shortcut: { modifier: "command", keys: "K" },
      },
      {
        label: "Option 2",
        shortcut: { modifier: "command", keys: "L" },
      },
      {
        label: "Option 3",
        shortcut: { modifier: "command", keys: "M" },
      },
      {
        label: "Option 4",
        shortcut: { modifier: "command", keys: "N" },
      },
    ]
    return (
      <Menus>
        {Options.map((option, index) => (
          <Menus.Item
            key={option.label}
            active={activeIndex === index}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            shortcut={option.shortcut as { modifier: KbdKey; keys: ReactNode }}
          >
            <span className="flex-1 truncate">{option.label}</span>
          </Menus.Item>
        ))}
      </Menus>
    )
  },
}

export const WithSelectionIconStory: Story = {
  render: function WithSelectionIconStory() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    return (
      <Menus>
        {Array.from({ length: 4 }).map((_, index) => (
          <Menus.Item
            key={index}
            active={activeIndex === index}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            prefixElement={selectedIndex === index ? <Check /> : <></>}
            onMouseDown={() => setSelectedIndex(index)}
          >
            <span className="flex-1 truncate">Item</span>
          </Menus.Item>
        ))}
      </Menus>
    )
  },
}

export const WithRightSelectionIconStory: Story = {
  render: function WithRightSelectionIconStory() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [selectedIndex, setSelectedIndex] = useState<number[]>([])
    return (
      <Menus>
        {Array.from({ length: 4 }).map((_, index) => (
          <Menus.Item
            key={index}
            active={activeIndex === index}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            suffixElement={
              <Menus.Checkbox
                active={activeIndex === index}
                selected={selectedIndex.includes(index)}
              />
            }
            onMouseDown={() =>
              setSelectedIndex((prev) =>
                prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
              )
            }
          >
            <span className="flex-1 truncate">Item</span>
          </Menus.Item>
        ))}
      </Menus>
    )
  },
}

export const WithAvatarStory: Story = {
  render: function WithAvatarStory() {
    const Options = useMemo(
      () =>
        Array.from({ length: 4 }, (_, index) => ({
          color: faker.color.rgb(),
          name: faker.person.fullName(),
          picture: faker.image.avatar(),
        })),
      [],
    )

    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    return (
      <Menus>
        {Options.map((option, index) => (
          <Menus.Item
            key={option.name}
            active={activeIndex === index}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <Avatar
              size="small"
              color={option.color}
              photo={option.picture}
              name={option.name}
            />
            <span className="flex-1 truncate">{option.name}</span>
          </Menus.Item>
        ))}
      </Menus>
    )
  },
}

export const WithBadgeStory: Story = {
  render: function WithBadgeStory() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [selectedIndex, setSelectedIndex] = useState<number[]>([])

    const Options = useMemo(
      () =>
        Array.from({ length: 4 }, (_, index) => ({
          label: faker.music.songName(),
        })),
      [],
    )

    return (
      <Menus>
        {Options.map((option, index) => (
          <Menus.Item
            key={index}
            active={activeIndex === index}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            onMouseDown={() =>
              setSelectedIndex((prev) =>
                prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
              )
            }
            prefixElement={selectedIndex.includes(index) ? <Check /> : <></>}
            suffixElement={
              <div
                className={tcx(
                  "mr-1 ml-2 flex items-center justify-center rounded-md border px-1",
                  activeIndex === index && "bg-menu-background",
                  selectedIndex.includes(index) && activeIndex !== index
                    ? "border-white/20"
                    : "border-transparent",
                )}
              >
                Badge
              </div>
            }
          >
            <span className="flex-1 truncate">{option.label}</span>
          </Menus.Item>
        ))}
      </Menus>
    )
  },
}
