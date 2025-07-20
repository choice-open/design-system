// This story demonstrates the ContextInput component with mention functionality
// Features include: @ mentions, # channels, and custom triggers with search capabilities
import { AddSmall, ArrowsMaximize } from "@choiceform/icons-react"
import type { Meta, StoryObj } from "@storybook/react"
import React, { useRef, useState } from "react"
import { Badge } from "../badge"
import { IconButton } from "../icon-button"
import { ContextInput } from "./context-input"
import type { ContextInputValue, MentionItem } from "./types"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { useDarkMode } from "storybook-dark-mode"
import { useEventCallback } from "usehooks-ts"
import { useSlate } from "slate-react"
import { Descendant } from "slate"

const meta: Meta<typeof ContextInput> = {
  title: "Components/ContextInput",
  component: ContextInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof ContextInput>

// Mock data for testing
const users: MentionItem[] = [
  {
    id: "1",
    type: "user",
    label: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    description: "Software Engineer",
  },
  {
    id: "2",
    type: "user",
    label: "Jane Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    description: "Product Manager",
  },
  {
    id: "3",
    type: "user",
    label: "Bob Wilson",
    description: "Designer",
  },
]

const channels: MentionItem[] = [
  {
    id: "general",
    type: "channel",
    label: "general",
    description: "General discussion",
  },
  {
    id: "dev",
    type: "channel",
    label: "development",
    description: "Development team",
  },
  {
    id: "design",
    type: "channel",
    label: "design",
    description: "Design team",
  },
]

// Basic example with user mentions
export const Basic: Story = {
  render: function Basic() {
    const [value, setValue] = useState<ContextInputValue>({ text: "", mentions: [] })
    const isDark = useDarkMode()

    const style = isDark ? oneDark : oneLight

    return (
      <div className="w-full max-w-md">
        <ContextInput
          value={value}
          placeholder="Type @ to mention someone..."
          className="max-h-96 w-80"
          triggers={[
            {
              char: "@",
              onSearch: async (query) => {
                return users.filter((user) =>
                  user.label.toLowerCase().includes(query.toLowerCase()),
                )
              },
            },
          ]}
          onChange={setValue}
          onMentionSelect={(mention, trigger) => {
            console.log("Mention selected:", mention, trigger)
          }}
        />

        <div className="bg-secondary-background mt-4 w-80 rounded-xl p-4">
          <p className="text-sm font-medium">Current value:</p>
          <SyntaxHighlighter
            language="json"
            style={style}
            customStyle={{
              background: "transparent",
              padding: "0",
            }}
            codeTagProps={{
              className: "bg-transparent",
            }}
            lineProps={{
              style: {
                background: "transparent",
                fontSize: "11px",
              },
            }}
            wrapLongLines
          >
            {JSON.stringify(value, null, 2)}
          </SyntaxHighlighter>
        </div>
      </div>
    )
  },
}

export const WithHeader: Story = {
  render: function WithHeader() {
    const [value, setValue] = useState<ContextInputValue>({ text: "", mentions: [] })
    const inputRef = useRef<HTMLDivElement>(null)

    return (
      <div className="w-full max-w-md">
        <ContextInput
          ref={inputRef}
          value={value}
          placeholder="Type @ to mention someone..."
          className="max-h-96 w-80"
          triggers={[
            {
              char: "@",
              onSearch: async (query) => {
                await new Promise((resolve) => setTimeout(resolve, 10))
                return users.filter((user) =>
                  user.label.toLowerCase().includes(query.toLowerCase()),
                )
              },
            },
          ]}
          onChange={setValue}
          onMentionSelect={(mention, trigger) => {
            console.log("Mention selected:", mention, trigger)
          }}
        >
          <ContextInput.Header>
            <h3 className="flex-1 font-medium">Header</h3>
            <div className="flex items-center gap-1">
              <ContextInput.InsertMentionsButton
                variant="ghost"
                size="default"
                onClick={() => console.log("Insert @ clicked")}
              />
              <ContextInput.CopyButton
                onClick={(copiedText) => {
                  console.log("Copied text:", copiedText)
                  alert(`已复制!\n\n${copiedText}`)
                }}
              />
              <IconButton>
                <ArrowsMaximize />
              </IconButton>
            </div>
          </ContextInput.Header>
        </ContextInput>
      </div>
    )
  },
}

// Copy button example - demonstrates mention format conversion
export const WithCopyButton: Story = {
  render: function WithCopyButton() {
    const [value, setValue] = useState<ContextInputValue>({ text: "", mentions: [] })

    // 模拟SlateJS内容用于演示copy功能
    const mockSlateNodes = [
      {
        type: "paragraph",
        children: [
          { text: "Hello " },
          {
            type: "mention",
            mentionId: "1739416889031",
            mentionLabel: "John Doe",
            mentionType: "user",
            mentionData: {},
            children: [{ text: "" }],
          },
          { text: " and welcome!" },
        ],
      },
    ]

    return (
      <div className="w-full max-w-md space-y-4">
        <ContextInput
          value={value}
          placeholder="Type @ to mention someone..."
          className="max-h-96 w-80"
          triggers={[
            {
              char: "@",
              onSearch: async (query) => {
                return users.filter((user) =>
                  user.label.toLowerCase().includes(query.toLowerCase()),
                )
              },
            },
          ]}
          onChange={setValue}
        >
          <ContextInput.Header>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">输入内容</h3>
              <ContextInput.CopyButton
                onClick={(copiedText) => {
                  console.log("Copied text:", copiedText)
                  alert(`已复制!\n\n${copiedText}`)
                }}
              />
            </div>
          </ContextInput.Header>
        </ContextInput>

        <div className="rounded bg-gray-50 p-3 text-sm text-gray-600">
          💡 <strong>演示说明:</strong> 点击复制按钮会将模拟内容转换为：
          <code className="mt-2 block rounded border bg-white p-2 font-mono text-xs">
            Hello {`{{#context#}}{{#1739416889031.text#}}`} and welcome!
          </code>
        </div>
      </div>
    )
  },
}

// Multiple triggers example
export const MultipleTriggers: Story = {
  render: function MultipleTriggers() {
    const [value, setValue] = useState<ContextInputValue>({ text: "", mentions: [] })

    return (
      <div className="w-full max-w-md">
        <ContextInput
          value={value}
          placeholder="Try @ for users, # for channels..."
          triggers={[
            {
              char: "@",
              onSearch: async (query) => {
                return users.filter((user) =>
                  user.label.toLowerCase().includes(query.toLowerCase()),
                )
              },
            },
            {
              char: "#",
              onSearch: async (query) => {
                return channels.filter((channel) =>
                  channel.label.toLowerCase().includes(query.toLowerCase()),
                )
              },
            },
          ]}
          onChange={setValue}
          onMentionSelect={(mention, trigger) => {
            console.log("Selected:", mention.label, "via", trigger)
          }}
        />

        <div className="mt-4 rounded bg-gray-50 p-4">
          <p className="text-sm font-medium">Instructions:</p>
          <ul className="mt-2 space-y-1 text-xs">
            <li>
              • Type <code>@</code> to mention users
            </li>
            <li>
              • Type <code>#</code> to mention channels
            </li>
            <li>• Use arrow keys to navigate</li>
            <li>• Press Enter or Tab to select</li>
          </ul>
        </div>
      </div>
    )
  },
}

// Different sizes
export const Sizes: Story = {
  render: function Sizes() {
    const trigger = {
      char: "@",
      onSearch: async (query: string) => users.slice(0, 3),
    }

    return (
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Small</label>
          <ContextInput
            size="sm"
            placeholder="Small input..."
            triggers={[trigger]}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Medium (Default)</label>
          <ContextInput
            size="md"
            placeholder="Medium input..."
            triggers={[trigger]}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Large</label>
          <ContextInput
            size="lg"
            placeholder="Large input..."
            triggers={[trigger]}
          />
        </div>
      </div>
    )
  },
}

// Different variants
export const Variants: Story = {
  render: function Variants() {
    const trigger = {
      char: "@",
      onSearch: async (query: string) => users.slice(0, 3),
    }

    return (
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Default</label>
          <ContextInput
            variant="default"
            placeholder="Default variant..."
            triggers={[trigger]}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Filled</label>
          <ContextInput
            variant="filled"
            placeholder="Filled variant..."
            triggers={[trigger]}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Ghost</label>
          <ContextInput
            variant="ghost"
            placeholder="Ghost variant..."
            triggers={[trigger]}
          />
        </div>
      </div>
    )
  },
}

// Custom rendering
export const CustomRendering: Story = {
  render: function CustomRendering() {
    const [value, setValue] = useState<ContextInputValue>({ text: "", mentions: [] })

    return (
      <div className="w-full max-w-md">
        <ContextInput
          value={value}
          placeholder="Custom mention rendering..."
          triggers={[
            {
              char: "@",
              onSearch: async (query) => {
                return users.filter((user) =>
                  user.label.toLowerCase().includes(query.toLowerCase()),
                )
              },
            },
          ]}
          onChange={setValue}
          renderMention={(mention) => (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-sm font-medium text-blue-800">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-200 text-xs">
                {mention.item.label.charAt(0)}
              </span>
              {mention.item.label}
            </span>
          )}
          renderSuggestion={(item, isSelected) => (
            <Badge>
              <div className="flex h-4 w-4 items-center justify-center rounded-full">
                {item.label.charAt(0)}
              </div>
              <div className="flex-1">{item.label}</div>
            </Badge>
          )}
        />

        <div className="mt-4 rounded bg-gray-50 p-4">
          <p className="text-sm font-medium">Features:</p>
          <ul className="mt-2 space-y-1 text-xs">
            <li>• Custom mention pill design</li>
            <li>• Enhanced suggestion list styling</li>
            <li>• Gradient avatars</li>
          </ul>
        </div>
      </div>
    )
  },
}

// Performance test with many items
export const Performance: Story = {
  render: () => {
    // Generate large dataset
    const largeUserList = Array.from({ length: 1000 }, (_, i) => ({
      id: `user-${i}`,
      type: "user" as const,
      label: `User ${i + 1}`,
      description: `Description for user ${i + 1}`,
    }))

    return (
      <div className="w-full max-w-md">
        <ContextInput
          placeholder="Search through 1000 users (type @)..."
          triggers={[
            {
              char: "@",
              onSearch: async (query) => {
                return largeUserList
                  .filter((user) => user.label.toLowerCase().includes(query.toLowerCase()))
                  .slice(0, 50) // Limit results for performance
              },
            },
          ]}
          maxSuggestions={10}
          onChange={(value) => console.log("Value changed:", value)}
        />

        <div className="mt-4 rounded bg-gray-50 p-4">
          <p className="text-sm font-medium">Performance optimizations:</p>
          <ul className="mt-2 space-y-1 text-xs">
            <li>• Debounced search (300ms)</li>
            <li>• Limited results (max 10 shown)</li>
            <li>• Virtual scrolling ready</li>
            <li>• Memoized components</li>
          </ul>
        </div>
      </div>
    )
  },
}

// Story component for InsertMentionsButton
const WithInsertButtonComponent = (args: typeof WithInsertButton.args) => {
  const [value, setValue] = useState<ContextInputValue>({ text: "", mentions: [] })
  const isDark = useDarkMode()

  return (
    <div className="w-[500px]">
      <ContextInput
        {...args}
        value={value}
        onChange={setValue}
      >
        <ContextInput.Header>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">发送消息</span>
            <div className="flex items-center gap-1">
              <ContextInput.InsertMentionsButton
                variant="ghost"
                size="default"
                onClick={() => console.log("Insert @ clicked")}
              />
              <IconButton
                variant="ghost"
                size="default"
              >
                <ArrowsMaximize />
              </IconButton>
            </div>
          </div>
        </ContextInput.Header>
      </ContextInput>

      {/* 显示当前值 */}
      <div className="bg-muted mt-4 rounded-md p-3">
        <h4 className="mb-2 text-sm font-medium">当前值:</h4>
        <SyntaxHighlighter
          language="json"
          style={isDark ? oneDark : oneLight}
          customStyle={{ margin: 0, fontSize: "12px" }}
        >
          {JSON.stringify(value, null, 2)}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

// Story with InsertMentionsButton in header
export const WithInsertButton: Story = {
  args: {
    placeholder: "输入消息... 或点击 @ 按钮插入提及",
    triggers: [
      {
        char: "@",
        onSearch: async (query) => {
          return users.filter((user) => user.label.toLowerCase().includes(query.toLowerCase()))
        },
      },
    ],
  },
  render: WithInsertButtonComponent,
}

// Component to demonstrate paste functionality
const PasteTestComponent = () => {
  const [value, setValue] = useState<ContextInputValue>({ text: "", mentions: [] })
  const isDark = useDarkMode()

  const handleChange = (newValue: ContextInputValue) => {
    setValue(newValue)
  }

  return (
    <div className="w-[500px] space-y-4">
      <div className="bg-card text-card-foreground rounded-lg border p-4 shadow-sm">
        <h3 className="mb-2 text-lg font-medium">Paste 测试</h3>
        <p className="text-muted-foreground mb-4 text-sm">
          尝试粘贴包含 mention 格式的文本，支持两种格式：
          <br />
          <code className="bg-muted mt-1 block rounded px-2 py-1 text-xs">
            {"{{"}#context#{"}}"}
            {"{{"}#1739416889031.text#{"}}"}
          </code>
          <small className="text-muted-foreground">
            • {"{{"}#id#{"}}"} - 简单格式（如：context）
            <br />• {"{{"}#id.text#{"}}"} - 数字ID格式（如：1739416889031）
          </small>
        </p>

        <ContextInput
          value={value}
          onChange={handleChange}
          placeholder="粘贴包含 mention 格式的文本..."
          triggers={[
            {
              char: "@",
              onSearch: async (query) => {
                return users.filter((user) =>
                  user.label.toLowerCase().includes(query.toLowerCase()),
                )
              },
            },
          ]}
        >
          <ContextInput.Header>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Paste 功能测试</h4>
              <ContextInput.CopyButton />
            </div>
          </ContextInput.Header>
        </ContextInput>
      </div>

      {/* 显示当前值 */}
      <div className="bg-muted rounded-md p-3">
        <h4 className="mb-2 text-sm font-medium">当前值:</h4>
        <SyntaxHighlighter
          language="json"
          style={isDark ? oneDark : oneLight}
          customStyle={{ margin: 0, fontSize: "12px" }}
        >
          {JSON.stringify(value, null, 2)}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

// Story to test paste functionality with mentions
export const PasteTest: Story = {
  args: {
    placeholder: "粘贴包含 {{#id.text#}} 格式的文本测试...",
  },
  render: PasteTestComponent,
}
