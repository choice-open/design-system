# Menus Component

A versatile and comprehensive menu component system for displaying lists of options, actions, and interactive elements. Perfect for dropdown menus, context menus, command palettes, and complex selection interfaces.

## Overview

The Menus component uses a compound component pattern to create flexible menu structures with support for items, buttons, inputs, search functionality, dividers, labels, and selection states. It provides consistent styling and behavior across different menu types.

## Usage

### Basic Menu

```tsx
import { Menus } from "~/components/menus"

export function BasicExample() {
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
}
```

### Menu with Search

```tsx
import { Search } from "@choiceform/icons-react"
import { Menus } from "~/components/menus"

export function SearchExample() {
  const [search, setSearch] = useState("")
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  
  const filteredOptions = useMemo(() => {
    return options.filter(option => 
      option.label.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])
  
  return (
    <Menus className="w-64">
      <Menus.Search
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
        <Menus.SearchEmpty onClear={() => setSearch("")}>
          <Search className="text-secondary-foreground" width={32} height={32} />
        </Menus.SearchEmpty>
      )}
    </Menus>
  )
}
```

## Props

### Menus Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Required.** The menu content |
| `matchTriggerWidth` | `boolean` | `false` | Whether to match the width of a trigger element |
| `className` | `string` | - | Additional CSS classes |

## Sub-components

### Menus.Item

Interactive menu item with hover states and selection support.

```tsx
<Menus.Item
  active={boolean}           // Visual active state
  selected={boolean}         // Selection state
  prefixElement={ReactNode}  // Icon or element before content
  suffixElement={ReactNode}  // Icon or element after content
  onMouseEnter={function}    // Hover enter handler
  onMouseLeave={function}    // Hover leave handler
  onMouseDown={function}     // Click handler
>
  Menu Item Content
</Menus.Item>
```

### Menus.Button

Action button within the menu structure.

```tsx
<Menus.Button onClick={() => console.log('Button clicked')}>
  Action Button
</Menus.Button>
```

### Menus.Input

Input field integrated into the menu.

```tsx
<Menus.Input 
  placeholder="Enter value..."
  value={inputValue}
  onChange={setInputValue}
/>
```

### Menus.Search

Specialized search input with built-in styling and functionality.

```tsx
<Menus.Search
  value={searchTerm}
  onChange={setSearchTerm}
  placeholder="Search..."
/>
```

### Menus.SearchEmpty

Empty state component displayed when search yields no results.

```tsx
<Menus.SearchEmpty onClear={() => setSearch("")}>
  <Search className="text-secondary-foreground" width={32} height={32} />
</Menus.SearchEmpty>
```

### Menus.Label

Section label for grouping menu items.

```tsx
<Menus.Label>Section Title</Menus.Label>
```

### Menus.Divider

Visual separator between menu sections.

```tsx
<Menus.Divider />
```

### Menus.Checkbox

Checkbox input within the menu structure.

```tsx
<Menus.Checkbox 
  checked={isChecked}
  onChange={setIsChecked}
  label="Option"
/>
```

### Menus.Value

Text content wrapper for menu items.

```tsx
<Menus.Value>Text content</Menus.Value>
```

## Features

### Selection States
Support for single and multi-selection with visual indicators:

```tsx
import { Check } from "@choiceform/icons-react"

export function SelectionExample() {
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  
  const toggleSelection = (index: number) => {
    setSelectedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }
  
  return (
    <Menus className="w-64">
      <Menus.Label>Multi-Select Menu</Menus.Label>
      
      {options.map((option, index) => (
        <Menus.Item
          key={option.value}
          selected={selectedItems.includes(index)}
          prefixElement={selectedItems.includes(index) ? <Check /> : <></>}
          onMouseDown={() => toggleSelection(index)}
        >
          <span className="flex-1 truncate">{option.label}</span>
        </Menus.Item>
      ))}
      
      <Menus.Divider />
      <Menus.Button onClick={() => setSelectedItems([])}>
        Clear All
      </Menus.Button>
    </Menus>
  )
}
```

### Sectioned Menus
Organize content with labels and dividers:

```tsx
<Menus>
  <Menus.Label>Recent</Menus.Label>
  <Menus.Item>Recent Item 1</Menus.Item>
  <Menus.Item>Recent Item 2</Menus.Item>
  
  <Menus.Divider />
  
  <Menus.Label>All Items</Menus.Label>
  <Menus.Item>All Items 1</Menus.Item>
  <Menus.Item>All Items 2</Menus.Item>
</Menus>
```

### Interactive Elements
Combine different interactive elements:

```tsx
import { NumericInput } from "~/components/numeric-input"

export function InteractiveExample() {
  const [numericValue, setNumericValue] = useState(0)
  
  return (
    <Menus className="w-64">
      <NumericInput
        variant="dark"
        value={numericValue}
        onChange={setNumericValue}
      />
      
      <Menus.Divider />
      
      <Menus.Input placeholder="Text input..." />
      
      <Menus.Divider />
      
      {options.map(option => (
        <Menus.Item key={option.value}>
          {option.label}
        </Menus.Item>
      ))}
      
      <Menus.Divider />
      
      <Menus.Button onClick={() => console.log('Action')}>
        Execute Action
      </Menus.Button>
    </Menus>
  )
}
```

## Accessibility

### Keyboard Navigation
- **Arrow keys**: Navigate between menu items
- **Enter/Space**: Select or activate menu items
- **Escape**: Close menu (when used in dropdowns)
- **Tab**: Navigate to next focusable element

### ARIA Support
- Proper `role="menu"` attributes
- Focus management for active items
- Screen reader compatible structure
- Selection state announcements

### Focus Management
- Visual focus indicators
- Logical tab order
- Keyboard navigation between interactive elements

## Advanced Examples

### Command Palette

```tsx
import { Search } from "@choiceform/icons-react"

export function CommandPaletteExample() {
  const [search, setSearch] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  
  const commands = [
    { label: "Create New File", shortcut: "Cmd+N" },
    { label: "Open File", shortcut: "Cmd+O" },
    { label: "Save", shortcut: "Cmd+S" },
  ]
  
  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  )
  
  return (
    <Menus className="w-96">
      <Menus.Search
        value={search}
        onChange={setSearch}
        placeholder="Type a command..."
      />
      
      <Menus.Divider />
      
      {filteredCommands.length > 0 ? (
        filteredCommands.map((command, index) => (
          <Menus.Item
            key={command.label}
            active={activeIndex === index}
            suffixElement={
              <span className="text-xs text-secondary-foreground">
                {command.shortcut}
              </span>
            }
          >
            <Menus.Value>{command.label}</Menus.Value>
          </Menus.Item>
        ))
      ) : (
        <Menus.SearchEmpty onClear={() => setSearch("")}>
          <Search width={32} height={32} />
        </Menus.SearchEmpty>
      )}
    </Menus>
  )
}
```

### Settings Menu

```tsx
import { Check } from "@choiceform/icons-react"

export function SettingsMenuExample() {
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: false,
    autoSave: true,
  })
  
  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }
  
  return (
    <Menus className="w-64">
      <Menus.Label>Preferences</Menus.Label>
      
      <Menus.Item
        selected={settings.darkMode}
        prefixElement={settings.darkMode ? <Check /> : <></>}
        onMouseDown={() => toggleSetting('darkMode')}
      >
        <Menus.Value>Dark Mode</Menus.Value>
      </Menus.Item>
      
      <Menus.Item
        selected={settings.notifications}
        prefixElement={settings.notifications ? <Check /> : <></>}
        onMouseDown={() => toggleSetting('notifications')}
      >
        <Menus.Value>Notifications</Menus.Value>
      </Menus.Item>
      
      <Menus.Item
        selected={settings.autoSave}
        prefixElement={settings.autoSave ? <Check /> : <></>}
        onMouseDown={() => toggleSetting('autoSave')}
      >
        <Menus.Value>Auto Save</Menus.Value>
      </Menus.Item>
      
      <Menus.Divider />
      
      <Menus.Button onClick={() => console.log('Save settings')}>
        Save Settings
      </Menus.Button>
    </Menus>
  )
}
```

## Best Practices

### Structure
1. Use labels and dividers to group related items
2. Place search at the top for easy access
3. Use consistent prefix/suffix elements for visual hierarchy
4. Keep menu widths appropriate for content

### Interaction
1. Provide clear visual feedback for hover and active states
2. Use appropriate icons for different types of actions
3. Implement proper keyboard navigation
4. Handle empty states gracefully

### Performance
1. Use virtualization for very large menus
2. Implement efficient filtering for search
3. Avoid unnecessary re-renders with proper key props
4. Optimize selection state management

### Accessibility
1. Ensure sufficient color contrast for all states
2. Provide keyboard alternatives for all interactions
3. Use semantic HTML and proper ARIA attributes
4. Test with screen readers and keyboard navigation