import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { CoordinateMenu, type CoordinateMenuPosition } from "./coordinate-menu"
import { Textarea } from "../textarea"

const meta: Meta<typeof CoordinateMenu> = {
  title: "Components/CoordinateMenu",
  component: CoordinateMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

const MenuItems = () => (
  <>
    <CoordinateMenu.Item>Option 1</CoordinateMenu.Item>
    <CoordinateMenu.Item>Option 2</CoordinateMenu.Item>
    <CoordinateMenu.Item>Option 3</CoordinateMenu.Item>
  </>
)

// Component for Default story to use hooks properly
const DefaultExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<CoordinateMenuPosition | null>(null)

  const handleClick = (event: React.MouseEvent) => {
    setPosition({
      x: event.clientX,
      y: event.clientY,
    })
    setIsOpen(true)
  }

  return (
    <div className="rounded-lg border-2 border-dashed border-gray-300 p-8">
      <p className="mb-4 text-sm text-gray-600">
        Click anywhere in this area to show the menu at that position
      </p>
      <div
        className="h-40 cursor-pointer rounded bg-gray-50"
        onMouseDown={handleClick}
      >
        Click me to show menu at mouse position
      </div>

      <CoordinateMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position={position}
      >
        <CoordinateMenu.Content>
          <MenuItems />
        </CoordinateMenu.Content>
      </CoordinateMenu>
    </div>
  )
}

// Component for MentionsMenu story
const MentionsExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<CoordinateMenuPosition | null>(null)
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  const mentionUsers = [
    { name: "John Doe", username: "@johndoe" },
    { name: "Jane Smith", username: "@janesmith" },
    { name: "Bob Johnson", username: "@bobjohnson" },
  ]

  const handleInputChange = (value: string) => {
    const lastAtIndex = value.lastIndexOf("@")

    if (lastAtIndex !== -1 && value.length > lastAtIndex + 1) {
      // 使用 ref 获取真实的 DOM 元素
      const element = inputRef.current
      if (element) {
        const rect = element.getBoundingClientRect()
        setPosition({
          x: rect.left,
          y: rect.bottom + 4,
        })
        setIsOpen(true)
      }
    } else {
      setIsOpen(false)
    }
  }

  return (
    <div className="max-w-md p-4">
      <p className="text-secondary-foreground mb-2">Type @ to trigger mentions menu</p>
      <Textarea
        ref={inputRef}
        placeholder="Type @ to see mentions..."
        onChange={handleInputChange}
        rows={3}
      />

      <CoordinateMenu
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
          // 菜单关闭时，focus回到输入框
          inputRef.current?.focus()
        }}
        position={position}
        placement="bottom-start"
      >
        <CoordinateMenu.Content>
          {mentionUsers.map((user) => (
            <CoordinateMenu.Item
              key={user.username}
              onClick={() => setIsOpen(false)}
              shortcut={{
                keys: [user.username],
              }}
            >
              <CoordinateMenu.Value>{user.name}</CoordinateMenu.Value>
            </CoordinateMenu.Item>
          ))}
        </CoordinateMenu.Content>
      </CoordinateMenu>
    </div>
  )
}

// Basic coordinate menu
export const Default: Story = {
  render: () => <DefaultExample />,
}

// Mentions menu simulation
export const MentionsMenu: Story = {
  render: () => <MentionsExample />,
}
