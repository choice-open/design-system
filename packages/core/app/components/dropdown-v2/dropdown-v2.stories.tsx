import { FieldTypeAttachment, Search, Settings } from "@choiceform/icons-react"
import { faker } from "@faker-js/faker"
import type { Meta, StoryObj } from "@storybook/react"
import React, { useMemo, useState } from "react"
import { Button } from "../button"
import { IconButton } from "../icon-button"
import { KbdKey } from "../kbd"
import { DropdownV2 } from "./dropdown-v2"

const meta: Meta<typeof DropdownV2> = {
  title: "Collections/DropdownV2",
  component: DropdownV2,
  tags: ["upgrade"],
}

export default meta
type Story = StoryObj<typeof DropdownV2>

/**
 * Basic dropdown with simple menu items using the new MenuContext system.
 *
 * Features:
 * - Enhanced MenuContextItem components
 * - Unified interaction handling
 * - Improved keyboard navigation
 * - Better event handling with useEventCallback
 */
export const Basic: Story = {
  render: function BasicStory() {
    return (
      <DropdownV2>
        <DropdownV2.Trigger>
          <DropdownV2.Value>Basic Menu</DropdownV2.Value>
        </DropdownV2.Trigger>
        <DropdownV2.Content>
          <DropdownV2.Item>
            <DropdownV2.Value>Edit</DropdownV2.Value>
          </DropdownV2.Item>
          <DropdownV2.Item>
            <DropdownV2.Value>Copy</DropdownV2.Value>
          </DropdownV2.Item>
          <DropdownV2.Item>
            <DropdownV2.Value>Paste</DropdownV2.Value>
          </DropdownV2.Item>
          <DropdownV2.Divider />
          <DropdownV2.Item variant="danger">
            <DropdownV2.Value>Delete</DropdownV2.Value>
          </DropdownV2.Item>
        </DropdownV2.Content>
      </DropdownV2>
    )
  },
}

/**
 * Dropdown with prefix icons for better visual recognition.
 */
export const WithPrefix: Story = {
  render: function WithPrefixStory() {
    return (
      <DropdownV2>
        <DropdownV2.Trigger prefixElement={<FieldTypeAttachment />}>
          <DropdownV2.Value>File Actions</DropdownV2.Value>
        </DropdownV2.Trigger>
        <DropdownV2.Content>
          <DropdownV2.Item>
            <FieldTypeAttachment />
            <DropdownV2.Value>Attach File</DropdownV2.Value>
          </DropdownV2.Item>
          <DropdownV2.Item>
            <Search />
            <DropdownV2.Value>Search Files</DropdownV2.Value>
          </DropdownV2.Item>
          <DropdownV2.Divider />
          <DropdownV2.Item>
            <Settings />
            <DropdownV2.Value>File Settings</DropdownV2.Value>
          </DropdownV2.Item>
        </DropdownV2.Content>
      </DropdownV2>
    )
  },
}

/**
 * Custom trigger using asChild pattern for complete control.
 */
export const TriggerAsChild: Story = {
  render: function TriggerAsChildStory() {
    return (
      <DropdownV2>
        <DropdownV2.Trigger asChild>
          <IconButton variant="default">
            <Settings />
          </IconButton>
        </DropdownV2.Trigger>
        <DropdownV2.Content>
          <DropdownV2.Item>
            <DropdownV2.Value>Settings</DropdownV2.Value>
          </DropdownV2.Item>
          <DropdownV2.Item>
            <DropdownV2.Value>Preferences</DropdownV2.Value>
          </DropdownV2.Item>
          <DropdownV2.Divider />
          <DropdownV2.Item>
            <DropdownV2.Value>Help</DropdownV2.Value>
          </DropdownV2.Item>
        </DropdownV2.Content>
      </DropdownV2>
    )
  },
}

/**
 * Nested dropdown menus showcasing the enhanced FloatingTree support.
 *
 * Features:
 * - Multiple levels of nesting
 * - Automatic submenu positioning
 * - Hover-based submenu activation
 * - Tree event management for proper closing
 */
export const Nested: Story = {
  render: function NestedStory() {
    return (
      <DropdownV2>
        <DropdownV2.Trigger>
          <DropdownV2.Value>Nested Menu</DropdownV2.Value>
        </DropdownV2.Trigger>
        <DropdownV2.Content>
          <DropdownV2.Item>
            <DropdownV2.Value>File</DropdownV2.Value>
          </DropdownV2.Item>
          <DropdownV2.Item>
            <DropdownV2.Value>Edit</DropdownV2.Value>
          </DropdownV2.Item>
          <DropdownV2>
            <DropdownV2.SubTrigger>
              <DropdownV2.Value>View</DropdownV2.Value>
            </DropdownV2.SubTrigger>
            <DropdownV2.Content>
              <DropdownV2.Item>
                <DropdownV2.Value>Zoom In</DropdownV2.Value>
              </DropdownV2.Item>
              <DropdownV2.Item>
                <DropdownV2.Value>Zoom Out</DropdownV2.Value>
              </DropdownV2.Item>
              <DropdownV2>
                <DropdownV2.SubTrigger>
                  <DropdownV2.Value>Layout</DropdownV2.Value>
                </DropdownV2.SubTrigger>
                <DropdownV2.Content>
                  <DropdownV2.Item>
                    <DropdownV2.Value>Sidebar</DropdownV2.Value>
                  </DropdownV2.Item>
                  <DropdownV2.Item>
                    <DropdownV2.Value>Footer</DropdownV2.Value>
                  </DropdownV2.Item>
                  <DropdownV2.Item>
                    <DropdownV2.Value>Fullscreen</DropdownV2.Value>
                  </DropdownV2.Item>
                </DropdownV2.Content>
              </DropdownV2>
            </DropdownV2.Content>
          </DropdownV2>
          <DropdownV2.Divider />
          <DropdownV2.Item>
            <DropdownV2.Value>Help</DropdownV2.Value>
          </DropdownV2.Item>
        </DropdownV2.Content>
      </DropdownV2>
    )
  },
}

/**
 * Selection dropdown with visual indicators using the MenuContext system.
 */
export const Selection: Story = {
  render: function SelectionStory() {
    const [selected, setSelected] = useState<string | null>("option-2")
    const options = ["Option 1", "Option 2", "Option 3", "Option 4"]

    return (
      <DropdownV2 selection={true}>
        <DropdownV2.Trigger>
          <DropdownV2.Value>Theme: {selected || "None"}</DropdownV2.Value>
        </DropdownV2.Trigger>
        <DropdownV2.Content>
          <DropdownV2.Label>Select Theme</DropdownV2.Label>
          {options.map((option) => (
            <DropdownV2.Item
              key={option}
              selected={selected === option}
              onClick={() => setSelected(option)}
            >
              <DropdownV2.Value>{option}</DropdownV2.Value>
            </DropdownV2.Item>
          ))}
        </DropdownV2.Content>
      </DropdownV2>
    )
  },
}

/**
 * Nested dropdown with selection functionality in submenus.
 */
export const NestedSelection: Story = {
  render: function NestedSelectionStory() {
    const [mainSelected, setMainSelected] = useState<string | null>(null)
    const [subSelected, setSubSelected] = useState<string | null>(null)

    return (
      <DropdownV2>
        <DropdownV2.Trigger>
          <DropdownV2.Value>Multi-Level Selection</DropdownV2.Value>
        </DropdownV2.Trigger>
        <DropdownV2.Content>
          <DropdownV2.Label>Main Options</DropdownV2.Label>
          {["Main 1", "Main 2"].map((option) => (
            <DropdownV2.Item
              key={option}
              selected={mainSelected === option}
              onClick={() => setMainSelected(option)}
            >
              <DropdownV2.Value>{option}</DropdownV2.Value>
            </DropdownV2.Item>
          ))}
          <DropdownV2.Divider />
          <DropdownV2 selection={true}>
            <DropdownV2.SubTrigger>
              <DropdownV2.Value>Sub Options</DropdownV2.Value>
            </DropdownV2.SubTrigger>
            <DropdownV2.Content>
              <DropdownV2.Label>Choose Sub Option</DropdownV2.Label>
              {["Sub A", "Sub B", "Sub C"].map((option) => (
                <DropdownV2.Item
                  key={option}
                  selected={subSelected === option}
                  onClick={() => setSubSelected(option)}
                >
                  <DropdownV2.Value>{option}</DropdownV2.Value>
                </DropdownV2.Item>
              ))}
            </DropdownV2.Content>
          </DropdownV2>
        </DropdownV2.Content>
      </DropdownV2>
    )
  },
}

const MODIFIERS = [
  "command",
  "shift",
  "ctrl",
  "option",
  "enter",
  "delete",
  "escape",
  "tab",
] as const
const KEYS = ["Enter", "Space", "Tab", "Escape", "A", "B", "C", "D", "E"] as const

/**
 * Dropdown with keyboard shortcuts displayed.
 */
export const WithShortcuts: Story = {
  render: function WithShortcutsStory() {
    return (
      <DropdownV2>
        <DropdownV2.Trigger>
          <DropdownV2.Value>Editor Menu</DropdownV2.Value>
        </DropdownV2.Trigger>
        <DropdownV2.Content>
          <DropdownV2.Item
            shortcut={{
              modifier: "command",
              keys: "N",
            }}
          >
            <DropdownV2.Value>New File</DropdownV2.Value>
          </DropdownV2.Item>
          <DropdownV2.Item
            shortcut={{
              modifier: "command",
              keys: "O",
            }}
          >
            <DropdownV2.Value>Open File</DropdownV2.Value>
          </DropdownV2.Item>
          <DropdownV2.Item
            shortcut={{
              modifier: "command",
              keys: "S",
            }}
          >
            <DropdownV2.Value>Save</DropdownV2.Value>
          </DropdownV2.Item>
          <DropdownV2.Divider />
          <DropdownV2.Item
            shortcut={{
              modifier: "command",
              keys: "Z",
            }}
          >
            <DropdownV2.Value>Undo</DropdownV2.Value>
          </DropdownV2.Item>
          <DropdownV2.Item
            shortcut={{
              modifier: "shift",
              keys: "Command+Z",
            }}
          >
            <DropdownV2.Value>Redo</DropdownV2.Value>
          </DropdownV2.Item>
        </DropdownV2.Content>
      </DropdownV2>
    )
  },
}

/**
 * Dropdown with disabled states for both trigger and items.
 */
export const Disabled: Story = {
  render: function DisabledStory() {
    return (
      <div className="flex gap-4">
        <DropdownV2>
          <DropdownV2.Trigger disabled>
            <DropdownV2.Value>Disabled Trigger</DropdownV2.Value>
          </DropdownV2.Trigger>
          <DropdownV2.Content>
            <DropdownV2.Item>
              <DropdownV2.Value>Option 1</DropdownV2.Value>
            </DropdownV2.Item>
            <DropdownV2.Item>
              <DropdownV2.Value>Option 2</DropdownV2.Value>
            </DropdownV2.Item>
          </DropdownV2.Content>
        </DropdownV2>

        <DropdownV2>
          <DropdownV2.Trigger>
            <DropdownV2.Value>Disabled Items</DropdownV2.Value>
          </DropdownV2.Trigger>
          <DropdownV2.Content>
            <DropdownV2.Item>
              <DropdownV2.Value>Available Option</DropdownV2.Value>
            </DropdownV2.Item>
            <DropdownV2.Item disabled>
              <DropdownV2.Value>Disabled Option</DropdownV2.Value>
            </DropdownV2.Item>
            <DropdownV2.Item>
              <DropdownV2.Value>Another Available</DropdownV2.Value>
            </DropdownV2.Item>
          </DropdownV2.Content>
        </DropdownV2>
      </div>
    )
  },
}

/**
 * Dropdown with search functionality and empty states.
 */
export const WithSearch: Story = {
  render: function WithSearchStory() {
    const [search, setSearch] = useState("")
    const [selected, setSelected] = useState<string[]>([])

    const allOptions = useMemo(
      () =>
        Array.from({ length: 8 }, (_, i) => ({
          id: `option-${i + 1}`,
          label: faker.music.genre(),
        })),
      [],
    )

    const filteredOptions = useMemo(
      () =>
        allOptions.filter((option) => option.label.toLowerCase().includes(search.toLowerCase())),
      [allOptions, search],
    )

    return (
      <DropdownV2 selection={true}>
        <DropdownV2.Trigger>
          <DropdownV2.Value>Search Music ({selected.length} selected)</DropdownV2.Value>
        </DropdownV2.Trigger>
        <DropdownV2.Content>
          <DropdownV2.Search
            value={search}
            onChange={setSearch}
            placeholder="Search genres..."
          />
          <DropdownV2.Divider />

          {filteredOptions.length > 0 ? (
            <>
              <DropdownV2.Label>Music Genres</DropdownV2.Label>
              {filteredOptions.map((option) => (
                <DropdownV2.Item
                  key={option.id}
                  selected={selected.includes(option.id)}
                  onClick={() => {
                    setSelected((prev) =>
                      prev.includes(option.id)
                        ? prev.filter((id) => id !== option.id)
                        : [...prev, option.id],
                    )
                  }}
                >
                  <DropdownV2.Value>{option.label}</DropdownV2.Value>
                </DropdownV2.Item>
              ))}
              {selected.length > 0 && (
                <>
                  <DropdownV2.Divider />
                  <DropdownV2.Button onClick={() => setSelected([])}>
                    Clear All Selections
                  </DropdownV2.Button>
                </>
              )}
            </>
          ) : (
            <div className="flex h-32 flex-col items-center justify-center gap-2 text-center text-white/40">
              <Search
                width={24}
                height={24}
              />
              <span>No results found</span>
              <Button
                variant="link"
                onClick={() => setSearch("")}
              >
                Clear Search
              </Button>
            </div>
          )}
        </DropdownV2.Content>
      </DropdownV2>
    )
  },
}

/**
 * Dropdown with labels and organized sections.
 */
export const WithLabels: Story = {
  render: function WithLabelsStory() {
    return (
      <DropdownV2>
        <DropdownV2.Trigger>
          <DropdownV2.Value>Application Menu</DropdownV2.Value>
        </DropdownV2.Trigger>
        <DropdownV2.Content>
          <DropdownV2.Label>File Operations</DropdownV2.Label>
          <DropdownV2.Item>
            <DropdownV2.Value>New Document</DropdownV2.Value>
          </DropdownV2.Item>
          <DropdownV2.Item>
            <DropdownV2.Value>Open File</DropdownV2.Value>
          </DropdownV2.Item>
          <DropdownV2.Item>
            <DropdownV2.Value>Save</DropdownV2.Value>
          </DropdownV2.Item>

          <DropdownV2.Divider />

          <DropdownV2.Label>Edit Operations</DropdownV2.Label>
          <DropdownV2.Item>
            <DropdownV2.Value>Cut</DropdownV2.Value>
          </DropdownV2.Item>
          <DropdownV2.Item>
            <DropdownV2.Value>Copy</DropdownV2.Value>
          </DropdownV2.Item>
          <DropdownV2.Item>
            <DropdownV2.Value>Paste</DropdownV2.Value>
          </DropdownV2.Item>

          <DropdownV2.Divider />

          <DropdownV2.Label>Tools</DropdownV2.Label>
          <DropdownV2.Item>
            <DropdownV2.Value>Settings</DropdownV2.Value>
          </DropdownV2.Item>
        </DropdownV2.Content>
      </DropdownV2>
    )
  },
}

/**
 * Long list demonstrating scrolling behavior and performance.
 */
export const LongList: Story = {
  render: function LongListStory() {
    return (
      <DropdownV2>
        <DropdownV2.Trigger>
          <DropdownV2.Value>Long List (100 items)</DropdownV2.Value>
        </DropdownV2.Trigger>
        <DropdownV2.Content>
          <DropdownV2.Label>Countries</DropdownV2.Label>
          {Array.from({ length: 100 }, (_, i) => (
            <DropdownV2.Item key={i}>
              <DropdownV2.Value>
                {faker.location.country()} {i + 1}
              </DropdownV2.Value>
            </DropdownV2.Item>
          ))}
        </DropdownV2.Content>
      </DropdownV2>
    )
  },
}

/**
 * Multiple dropdowns testing proper event handling and switching.
 */
export const MultipleDropdowns: Story = {
  render: function MultipleDropdownsStory() {
    const [dropdown1Open, setDropdown1Open] = useState(false)
    const [dropdown2Open, setDropdown2Open] = useState(false)
    const [dropdown3Open, setDropdown3Open] = useState(false)

    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h3 className="mb-2 text-lg font-semibold text-blue-900">
            🔄 Multiple Dropdown Switching Test
          </h3>
          <p className="text-sm text-blue-800">
            Test scenario: When one dropdown is open, clicking another should close the first and
            open the second in one click.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <h4 className="font-medium">Dropdown 1</h4>
            <div className="text-sm text-gray-600">Status: {dropdown1Open ? "Open" : "Closed"}</div>
            <DropdownV2
              open={dropdown1Open}
              onOpenChange={setDropdown1Open}
            >
              <DropdownV2.Trigger>
                <DropdownV2.Value>Menu 1 {dropdown1Open ? "(Open)" : ""}</DropdownV2.Value>
              </DropdownV2.Trigger>
              <DropdownV2.Content>
                <DropdownV2.Label>Menu 1 Content</DropdownV2.Label>
                <DropdownV2.Item>Option A</DropdownV2.Item>
                <DropdownV2.Item>Option B</DropdownV2.Item>
                <DropdownV2.Item>Option C</DropdownV2.Item>
                <DropdownV2.Divider />
                <DropdownV2.Button onClick={() => setDropdown1Open(false)}>
                  Close Menu
                </DropdownV2.Button>
              </DropdownV2.Content>
            </DropdownV2>
          </div>

          <div>
            <h4 className="font-medium">Dropdown 2</h4>
            <div className="text-sm text-gray-600">Status: {dropdown2Open ? "Open" : "Closed"}</div>
            <DropdownV2
              open={dropdown2Open}
              onOpenChange={setDropdown2Open}
            >
              <DropdownV2.Trigger>
                <DropdownV2.Value>Menu 2 {dropdown2Open ? "(Open)" : ""}</DropdownV2.Value>
              </DropdownV2.Trigger>
              <DropdownV2.Content>
                <DropdownV2.Label>Menu 2 Content</DropdownV2.Label>
                <DropdownV2.Item>Item X</DropdownV2.Item>
                <DropdownV2.Item>Item Y</DropdownV2.Item>
                <DropdownV2.Item>Item Z</DropdownV2.Item>
                <DropdownV2.Divider />
                <DropdownV2.Button onClick={() => setDropdown2Open(false)}>
                  Close Menu
                </DropdownV2.Button>
              </DropdownV2.Content>
            </DropdownV2>
          </div>

          <div>
            <h4 className="font-medium">Dropdown 3</h4>
            <div className="text-sm text-gray-600">Status: {dropdown3Open ? "Open" : "Closed"}</div>
            <DropdownV2
              open={dropdown3Open}
              onOpenChange={setDropdown3Open}
            >
              <DropdownV2.Trigger>
                <DropdownV2.Value>Menu 3 {dropdown3Open ? "(Open)" : ""}</DropdownV2.Value>
              </DropdownV2.Trigger>
              <DropdownV2.Content>
                <DropdownV2.Label>Menu 3 Content</DropdownV2.Label>
                <DropdownV2.Item>Choice 1</DropdownV2.Item>
                <DropdownV2.Item>Choice 2</DropdownV2.Item>
                <DropdownV2.Item>Choice 3</DropdownV2.Item>
                <DropdownV2.Divider />
                <DropdownV2.Button onClick={() => setDropdown3Open(false)}>
                  Close Menu
                </DropdownV2.Button>
              </DropdownV2.Content>
            </DropdownV2>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <h4 className="mb-2 font-medium">Test Instructions:</h4>
          <ol className="list-inside list-decimal space-y-1 text-sm text-gray-700">
            <li>Click &quot;Menu 1&quot; to open the first dropdown</li>
            <li>While keeping Menu 1 open, click &quot;Menu 2&quot;</li>
            <li>Verify Menu 1 closes and Menu 2 opens with a single click</li>
            <li>Test switching between Menu 2 → Menu 3 and Menu 3 → Menu 1</li>
          </ol>
        </div>
      </div>
    )
  },
}

/**
 * Dropdown with different placement options.
 */
export const Placement: Story = {
  render: function PlacementStory() {
    return (
      <div className="flex flex-wrap gap-4">
        <DropdownV2 placement="bottom-start">
          <DropdownV2.Trigger>
            <DropdownV2.Value>Bottom Start</DropdownV2.Value>
          </DropdownV2.Trigger>
          <DropdownV2.Content>
            <DropdownV2.Item>Option 1</DropdownV2.Item>
            <DropdownV2.Item>Option 2</DropdownV2.Item>
            <DropdownV2.Item>Option 3</DropdownV2.Item>
          </DropdownV2.Content>
        </DropdownV2>

        <DropdownV2 placement="bottom-end">
          <DropdownV2.Trigger>
            <DropdownV2.Value>Bottom End</DropdownV2.Value>
          </DropdownV2.Trigger>
          <DropdownV2.Content>
            <DropdownV2.Item>Option 1</DropdownV2.Item>
            <DropdownV2.Item>Option 2</DropdownV2.Item>
            <DropdownV2.Item>Option 3</DropdownV2.Item>
          </DropdownV2.Content>
        </DropdownV2>

        <DropdownV2 placement="right-start">
          <DropdownV2.Trigger>
            <DropdownV2.Value>Right Start</DropdownV2.Value>
          </DropdownV2.Trigger>
          <DropdownV2.Content>
            <DropdownV2.Item>Option 1</DropdownV2.Item>
            <DropdownV2.Item>Option 2</DropdownV2.Item>
            <DropdownV2.Item>Option 3</DropdownV2.Item>
          </DropdownV2.Content>
        </DropdownV2>
      </div>
    )
  },
}

/**
 * Advanced example showing complex menu structure with mixed features.
 */
export const ComplexMenu: Story = {
  render: function ComplexMenuStory() {
    const [theme, setTheme] = useState("light")
    const [language, setLanguage] = useState("English")

    return (
      <DropdownV2>
        <DropdownV2.Trigger>
          <Settings />
          <DropdownV2.Value>Application Settings</DropdownV2.Value>
        </DropdownV2.Trigger>
        <DropdownV2.Content>
          <DropdownV2.Label>User Preferences</DropdownV2.Label>
          <DropdownV2.Item>
            <DropdownV2.Value>Profile Settings</DropdownV2.Value>
          </DropdownV2.Item>
          <DropdownV2.Item>
            <DropdownV2.Value>Account Security</DropdownV2.Value>
          </DropdownV2.Item>

          <DropdownV2.Divider />

          <DropdownV2 selection={true}>
            <DropdownV2.SubTrigger>
              <DropdownV2.Value>Theme: {theme}</DropdownV2.Value>
            </DropdownV2.SubTrigger>
            <DropdownV2.Content>
              <DropdownV2.Label>Choose Theme</DropdownV2.Label>
              {["Light", "Dark", "Auto"].map((option) => (
                <DropdownV2.Item
                  key={option}
                  selected={theme === option.toLowerCase()}
                  onClick={() => setTheme(option.toLowerCase())}
                >
                  <DropdownV2.Value>{option}</DropdownV2.Value>
                </DropdownV2.Item>
              ))}
            </DropdownV2.Content>
          </DropdownV2>

          <DropdownV2 selection={true}>
            <DropdownV2.SubTrigger>
              <DropdownV2.Value>Language: {language}</DropdownV2.Value>
            </DropdownV2.SubTrigger>
            <DropdownV2.Content>
              <DropdownV2.Label>Choose Language</DropdownV2.Label>
              {["English", "Spanish", "French", "German"].map((option) => (
                <DropdownV2.Item
                  key={option}
                  selected={language === option}
                  onClick={() => setLanguage(option)}
                >
                  <DropdownV2.Value>{option}</DropdownV2.Value>
                </DropdownV2.Item>
              ))}
            </DropdownV2.Content>
          </DropdownV2>

          <DropdownV2.Divider />

          <DropdownV2.Item shortcut={{ modifier: "command", keys: "," }}>
            <DropdownV2.Value>Open Preferences</DropdownV2.Value>
          </DropdownV2.Item>

          <DropdownV2.Divider />

          <DropdownV2.Item variant="danger">
            <DropdownV2.Value>Sign Out</DropdownV2.Value>
          </DropdownV2.Item>
        </DropdownV2.Content>
      </DropdownV2>
    )
  },
}
