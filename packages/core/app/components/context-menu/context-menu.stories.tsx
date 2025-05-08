import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { ContextMenu } from "."
import React from "react"

const meta: Meta<typeof ContextMenu> = {
  title: "Collections/ContextMenu",
  component: ContextMenu,
}

export default meta
type Story = StoryObj<typeof ContextMenu>

/**
 * The ContextMenu component is a right-click menu component based on Radix UI's Context Menu.
 * It provides a styled context menu that can be triggered by right-clicking on an element.
 *
 * Features:
 * - Customizable menu items
 * - Support for disabled states
 * - Support for keyboard shortcuts
 * - Support for nested menus
 * - Support for dividers
 */
export const Basic: Story = {
  render: function BasicStory() {
    const [selectedItem, setSelectedItem] = useState("none")

    return (
      <div className="flex flex-col gap-4">
        <div className="mb-4">
          <span>Right-click on the area below to show the context menu</span>
          <div className="mt-2">Selected Item: {selectedItem}</div>
        </div>

        <ContextMenu>
          <ContextMenu.Trigger>
            <div className="flex h-64 w-96 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4">
              Right-click me
            </div>
          </ContextMenu.Trigger>

          <ContextMenu.Content>
            <ContextMenu.Item
              onClick={() => setSelectedItem("Cut")}
              shortcut={{
                modifier: "command",
                keys: "X",
              }}
            >
              Cut
            </ContextMenu.Item>

            <ContextMenu.Item
              onClick={() => setSelectedItem("Copy")}
              shortcut={{
                modifier: "command",
                keys: "C",
              }}
            >
              Copy
            </ContextMenu.Item>

            <ContextMenu.Item
              onClick={() => setSelectedItem("Paste")}
              shortcut={{
                modifier: "command",
                keys: "V",
              }}
            >
              Paste
            </ContextMenu.Item>

            <ContextMenu.Divider />

            <ContextMenu.Submenu>
              <ContextMenu.Submenu.Trigger>Sort Options</ContextMenu.Submenu.Trigger>
              <ContextMenu.Submenu.Content>
                <ContextMenu.Item onClick={() => setSelectedItem("Sort by Name")}>
                  Sort by Name
                </ContextMenu.Item>
                <ContextMenu.Item onClick={() => setSelectedItem("Sort by Date")}>
                  Sort by Date
                </ContextMenu.Item>
                <ContextMenu.Item onClick={() => setSelectedItem("Sort by Size")}>
                  Sort by Size
                </ContextMenu.Item>
              </ContextMenu.Submenu.Content>
            </ContextMenu.Submenu>

            <ContextMenu.Divider />

            <ContextMenu.Item
              disabled
              onClick={() => setSelectedItem("Delete")}
              shortcut={{
                modifier: "command",
                keys: "⌫",
              }}
            >
              Delete (Disabled)
            </ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu>
      </div>
    )
  },
}

/**
 * 简化的 API 用法示例
 *
 * 这个例子展示了如何使用简化后的 API，无需显式指定 Content 包装器。
 * 所有非 Trigger 的组件会自动被包装在一个 Content 组件中。
 */
export const SimplifiedApi: Story = {
  render: function SimplifiedApiStory() {
    const [selectedItem, setSelectedItem] = useState("none")

    return (
      <div className="flex flex-col gap-4">
        <div className="mb-4">
          <span>右键点击下方区域查看简化 API 的上下文菜单</span>
          <div className="mt-2">选中项: {selectedItem}</div>
          <div className="mt-1 text-sm text-gray-500">
            注意: 这个例子无需使用 <code>&lt;ContextMenu.Content&gt;</code> 容器
          </div>
        </div>

        <ContextMenu contentProps={{ sideOffset: 5, align: "start" }}>
          <ContextMenu.Trigger>
            <div className="flex h-64 w-96 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4">
              右键点击我 (简化 API)
            </div>
          </ContextMenu.Trigger>

          {/* 无需 Content 包装器 */}
          <ContextMenu.Item
            onClick={() => setSelectedItem("剪切")}
            shortcut={{
              modifier: "command",
              keys: "X",
            }}
          >
            剪切
          </ContextMenu.Item>

          <ContextMenu.Item
            onClick={() => setSelectedItem("复制")}
            shortcut={{
              modifier: "command",
              keys: "C",
            }}
          >
            复制
          </ContextMenu.Item>

          <ContextMenu.Item
            onClick={() => setSelectedItem("粘贴")}
            shortcut={{
              modifier: "command",
              keys: "V",
            }}
          >
            粘贴
          </ContextMenu.Item>

          <ContextMenu.Divider />

          <ContextMenu.Submenu>
            <ContextMenu.Submenu.Trigger>排序选项</ContextMenu.Submenu.Trigger>

            {/* 子菜单也无需 Content 包装器 */}
            <ContextMenu.Item onClick={() => setSelectedItem("按名称排序")}>
              按名称排序
            </ContextMenu.Item>
            <ContextMenu.Item onClick={() => setSelectedItem("按日期排序")}>
              按日期排序
            </ContextMenu.Item>
            <ContextMenu.Item onClick={() => setSelectedItem("按大小排序")}>
              按大小排序
            </ContextMenu.Item>
          </ContextMenu.Submenu>

          <ContextMenu.Divider />

          <ContextMenu.Item
            disabled
            onClick={() => setSelectedItem("删除")}
            shortcut={{
              modifier: "command",
              keys: "⌫",
            }}
          >
            删除 (禁用)
          </ContextMenu.Item>
        </ContextMenu>
      </div>
    )
  },
}

/**
 * Shows how to use the `ContextMenu` component with selection.
 *
 * ### Features
 * - Display selected items with checkmarks (requires setting `selection={true}`)
 * - Support for disabled states
 *
 * When `selection` is set to `true`, the `selected` prop on items will display a checkmark.
 */
export const WithSelection: Story = {
  render: function WithSelectionStory() {
    const options = [
      { id: "1", label: "Option 1" },
      { id: "2", label: "Option 2" },
      { id: "3", label: "Option 3" },
    ]

    const [selectedOption, setSelectedOption] = useState(options[0].id)

    return (
      <div className="flex flex-col gap-4">
        <div className="mb-4">
          <span>Right-click on the area below to show the context menu with selection</span>
          <div className="mt-2">
            Selected Option: {options.find((o) => o.id === selectedOption)?.label}
          </div>
        </div>

        <ContextMenu selection={true}>
          <ContextMenu.Trigger>
            <div className="flex h-64 w-96 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4">
              Right-click to select an option
            </div>
          </ContextMenu.Trigger>

          {/* 简化 API - 无需使用 Content 包装器 */}
          <ContextMenu.Label>Options</ContextMenu.Label>
          {options.map((option) => (
            <ContextMenu.Item
              key={option.id}
              selected={option.id === selectedOption}
              onClick={() => setSelectedOption(option.id)}
            >
              {option.label}
            </ContextMenu.Item>
          ))}
        </ContextMenu>
      </div>
    )
  },
}

/**
 * Example showing selection with nested submenus.
 * This demonstrates how the selection feature works with multi-level menus.
 */
export const SelectionWithSubmenus: Story = {
  render: function SelectionWithSubmenusStory() {
    const categories = [
      { id: "files", label: "Files" },
      { id: "edit", label: "Edit" },
      { id: "view", label: "View" },
    ]

    const fileOptions = [
      { id: "new", label: "New File" },
      { id: "open", label: "Open File" },
      { id: "save", label: "Save" },
    ]

    const editOptions = [
      { id: "cut", label: "Cut" },
      { id: "copy", label: "Copy" },
      { id: "paste", label: "Paste" },
    ]

    const viewOptions = [
      { id: "explorer", label: "Explorer" },
      { id: "search", label: "Search" },
      { id: "debug", label: "Debug" },
    ]

    const [selectedCategory, setSelectedCategory] = useState("files")
    const [selectedFileOption, setSelectedFileOption] = useState("new")
    const [selectedEditOption, setSelectedEditOption] = useState("copy")
    const [selectedViewOption, setSelectedViewOption] = useState("explorer")

    return (
      <div className="flex flex-col gap-4">
        <div className="mb-4">
          <span>Right-click on the area below to show nested menus with selection</span>
          <div className="mt-2">
            <div>Selected Category: {categories.find((c) => c.id === selectedCategory)?.label}</div>
            <div>
              Selected File Option: {fileOptions.find((o) => o.id === selectedFileOption)?.label}
            </div>
            <div>
              Selected Edit Option: {editOptions.find((o) => o.id === selectedEditOption)?.label}
            </div>
            <div>
              Selected View Option: {viewOptions.find((o) => o.id === selectedViewOption)?.label}
            </div>
          </div>
        </div>

        <ContextMenu selection={true}>
          <ContextMenu.Trigger>
            <div className="flex h-64 w-96 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4">
              Right-click to see nested menus with selection
            </div>
          </ContextMenu.Trigger>

          <ContextMenu.Label>Categories</ContextMenu.Label>
          {categories.map((category) => (
            <ContextMenu.Item
              key={category.id}
              selected={category.id === selectedCategory}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </ContextMenu.Item>
          ))}

          <ContextMenu.Divider />

          <ContextMenu.Label>Submenus</ContextMenu.Label>

          <ContextMenu.Submenu>
            <ContextMenu.Submenu.Trigger>Files</ContextMenu.Submenu.Trigger>
            <ContextMenu.Label>File Actions</ContextMenu.Label>
            {fileOptions.map((option) => (
              <ContextMenu.Item
                key={option.id}
                selected={option.id === selectedFileOption}
                onClick={() => setSelectedFileOption(option.id)}
              >
                {option.label}
              </ContextMenu.Item>
            ))}
          </ContextMenu.Submenu>

          <ContextMenu.Submenu>
            <ContextMenu.Submenu.Trigger>Edit</ContextMenu.Submenu.Trigger>
            <ContextMenu.Label>Edit Actions</ContextMenu.Label>
            {editOptions.map((option) => (
              <ContextMenu.Item
                key={option.id}
                selected={option.id === selectedEditOption}
                onClick={() => setSelectedEditOption(option.id)}
              >
                {option.label}
              </ContextMenu.Item>
            ))}
          </ContextMenu.Submenu>

          <ContextMenu.Submenu>
            <ContextMenu.Submenu.Trigger>View</ContextMenu.Submenu.Trigger>
            <ContextMenu.Label>View Options</ContextMenu.Label>
            {viewOptions.map((option) => (
              <ContextMenu.Item
                key={option.id}
                selected={option.id === selectedViewOption}
                onClick={() => setSelectedViewOption(option.id)}
              >
                {option.label}
              </ContextMenu.Item>
            ))}
          </ContextMenu.Submenu>
        </ContextMenu>
      </div>
    )
  },
}

/**
 * Example demonstrating how labels are properly aligned in both selection
 * and non-selection modes.
 */
export const AlignedLabels: Story = {
  render: function AlignedLabelsStory() {
    const [selectedInSection1, setSelectedInSection1] = useState("item1")
    const [selectedInSection2, setSelectedInSection2] = useState("item2")

    return (
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium">With Selection</h3>
            <p className="text-sm text-gray-500">
              Labels are aligned with menu items, with space for icons
            </p>
          </div>

          <ContextMenu selection={true}>
            <ContextMenu.Trigger>
              <div className="flex h-64 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4">
                Right-click to see aligned labels (with selection)
              </div>
            </ContextMenu.Trigger>

            <ContextMenu.Label>Section 1</ContextMenu.Label>
            <ContextMenu.Item
              selected={selectedInSection1 === "item1"}
              onClick={() => setSelectedInSection1("item1")}
            >
              Item 1
            </ContextMenu.Item>
            <ContextMenu.Item
              selected={selectedInSection1 === "item2"}
              onClick={() => setSelectedInSection1("item2")}
            >
              Item 2
            </ContextMenu.Item>

            <ContextMenu.Divider />

            <ContextMenu.Label>Section 2</ContextMenu.Label>
            <ContextMenu.Item
              selected={selectedInSection2 === "item1"}
              onClick={() => setSelectedInSection2("item1")}
            >
              Item 1
            </ContextMenu.Item>
            <ContextMenu.Item
              selected={selectedInSection2 === "item2"}
              onClick={() => setSelectedInSection2("item2")}
            >
              Item 2
            </ContextMenu.Item>
          </ContextMenu>
        </div>

        <div className="flex flex-col gap-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium">Without Selection</h3>
            <p className="text-sm text-gray-500">Labels without additional spacing</p>
          </div>

          <ContextMenu selection={false}>
            <ContextMenu.Trigger>
              <div className="flex h-64 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4">
                Right-click to see aligned labels (without selection)
              </div>
            </ContextMenu.Trigger>

            <ContextMenu.Label>Section 1</ContextMenu.Label>
            <ContextMenu.Item onClick={() => {}}>Item 1</ContextMenu.Item>
            <ContextMenu.Item onClick={() => {}}>Item 2</ContextMenu.Item>

            <ContextMenu.Divider />

            <ContextMenu.Label>Section 2</ContextMenu.Label>
            <ContextMenu.Item onClick={() => {}}>Item 1</ContextMenu.Item>
            <ContextMenu.Item onClick={() => {}}>Item 2</ContextMenu.Item>
          </ContextMenu>
        </div>
      </div>
    )
  },
}

/**
 * Example showing how selection works with multiple menus.
 */
export const ComparisonWithAndWithoutSelection: Story = {
  render: function ComparisonStory() {
    const options = [
      { id: "1", label: "Option 1" },
      { id: "2", label: "Option 2" },
      { id: "3", label: "Option 3" },
    ]

    const [selectedOption1, setSelectedOption1] = useState(options[0].id)
    const [selectedOption2, setSelectedOption2] = useState(options[0].id)

    return (
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium">With Selection</h3>
            <p className="text-sm text-gray-500">
              selection={"{true}"} - Shows checkmarks on selected items
            </p>
            <div className="mt-2">
              Selected: {options.find((o) => o.id === selectedOption1)?.label}
            </div>
          </div>

          <ContextMenu selection={true}>
            <ContextMenu.Trigger>
              <div className="flex h-64 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4">
                Right-click me (with selection)
              </div>
            </ContextMenu.Trigger>

            {options.map((option) => (
              <ContextMenu.Item
                key={option.id}
                selected={option.id === selectedOption1}
                onClick={() => setSelectedOption1(option.id)}
              >
                {option.label}
              </ContextMenu.Item>
            ))}
          </ContextMenu>
        </div>

        <div className="flex flex-col gap-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium">Without Selection</h3>
            <p className="text-sm text-gray-500">selection={"{false}"} - No checkmarks shown</p>
            <div className="mt-2">
              Selected: {options.find((o) => o.id === selectedOption2)?.label}
            </div>
          </div>

          <ContextMenu selection={false}>
            <ContextMenu.Trigger>
              <div className="flex h-64 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4">
                Right-click me (without selection)
              </div>
            </ContextMenu.Trigger>

            {options.map((option) => (
              <ContextMenu.Item
                key={option.id}
                selected={option.id === selectedOption2}
                onClick={() => setSelectedOption2(option.id)}
              >
                {option.label}
              </ContextMenu.Item>
            ))}
          </ContextMenu>
        </div>
      </div>
    )
  },
}

/**
 * 演示简化 API 的优点
 *
 * 本例展示了与传统方式（使用 Content 包装器）相比，简化 API 如何减少代码嵌套层次，
 * 使组件结构更加清晰。
 */
export const SimplifiedApiComparison: Story = {
  render: function SimplifiedApiComparisonStory() {
    return (
      <div className="flex flex-col gap-4">
        <div className="mb-4">
          <p className="text-lg font-medium">简化 API 的优点</p>
          <p className="text-sm text-gray-500">
            所有故事示例都已使用简化 API，无需显式添加 Content 包装器。这降低了代码的嵌套层次，
            使组件结构更加清晰。
          </p>
          <p className="mt-2 text-sm text-gray-600">对比代码示例:</p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="rounded-lg border bg-gray-50 p-4">
            <p className="mb-2 font-medium">传统 API</p>
            <pre className="rounded bg-gray-100 p-2 text-xs">
              {`<ContextMenu>
  <ContextMenu.Trigger>
    <div>触发区域</div>
  </ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Item>选项 1</ContextMenu.Item>
    <ContextMenu.Item>选项 2</ContextMenu.Item>
    <ContextMenu.Submenu>
      <ContextMenu.Submenu.Trigger>
        子菜单
      </ContextMenu.Submenu.Trigger>
      <ContextMenu.Submenu.Content>
        <ContextMenu.Item>子选项 1</ContextMenu.Item>
        <ContextMenu.Item>子选项 2</ContextMenu.Item>
      </ContextMenu.Submenu.Content>
    </ContextMenu.Submenu>
  </ContextMenu.Content>
</ContextMenu>`}
            </pre>
          </div>

          <div className="rounded-lg border bg-gray-50 p-4">
            <p className="mb-2 font-medium">简化 API</p>
            <pre className="rounded bg-gray-100 p-2 text-xs">
              {`<ContextMenu>
  <ContextMenu.Trigger>
    <div>触发区域</div>
  </ContextMenu.Trigger>
  <ContextMenu.Item>选项 1</ContextMenu.Item>
  <ContextMenu.Item>选项 2</ContextMenu.Item>
  <ContextMenu.Submenu>
    <ContextMenu.Submenu.Trigger>
      子菜单
    </ContextMenu.Submenu.Trigger>
    <ContextMenu.Item>子选项 1</ContextMenu.Item>
    <ContextMenu.Item>子选项 2</ContextMenu.Item>
  </ContextMenu.Submenu>
</ContextMenu>`}
            </pre>
          </div>
        </div>
      </div>
    )
  },
}
