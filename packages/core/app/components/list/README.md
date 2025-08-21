# List Component

A comprehensive and flexible list component that supports flat and nested structures, selection states, keyboard navigation, and various visual configurations. Perfect for navigation menus, file trees, and hierarchical data display.

## Overview

The List component uses a compound component pattern to create versatile list structures. It supports nested items, collapsible sections, keyboard navigation, selection modes, and visual reference lines for better hierarchy visualization.

## Usage

### Basic List

```tsx
import { List } from "~/components/list"

export function BasicExample() {
  return (
    <List>
      <List.Content>
        <List.Item>
          <List.Value>Home</List.Value>
        </List.Item>
        <List.Item>
          <List.Value>Documents</List.Value>
        </List.Item>
        <List.Item>
          <List.Value>Settings</List.Value>
        </List.Item>
      </List.Content>
    </List>
  )
}
```

### With Icons

```tsx
import { FieldTypeCheckbox, FieldTypeSingleSelect } from "@choiceform/icons-react"
import { List } from "~/components/list"

export function WithIconsExample() {
  return (
    <List>
      <List.Content>
        <List.Item prefixElement={<FieldTypeCheckbox />}>
          <List.Value>Home</List.Value>
        </List.Item>
        <List.Item prefixElement={<FieldTypeSingleSelect />}>
          <List.Value>Documents</List.Value>
        </List.Item>
      </List.Content>
    </List>
  )
}
```

### Nested Structure

```tsx
import { Folder, File } from "@choiceform/icons-react"
import { List } from "~/components/list"

export function NestedExample() {
  return (
    <List shouldShowReferenceLine>
      <List.Content>
        <List.Item prefixElement={<File />}>
          <List.Value>Home</List.Value>
        </List.Item>

        <List.SubTrigger
          id="docs"
          prefixElement={<Folder />}
        >
          <List.Value>Documents</List.Value>
        </List.SubTrigger>

        <List.Content parentId="docs">
          <List.Item
            parentId="docs"
            prefixElement={<File />}
          >
            <List.Value>Getting Started</List.Value>
          </List.Item>
          <List.Item
            parentId="docs"
            prefixElement={<File />}
          >
            <List.Value>API Reference</List.Value>
          </List.Item>
        </List.Content>
      </List.Content>
    </List>
  )
}
```

## Props

### List Props

| Prop                      | Type                     | Default     | Description                                        |
| ------------------------- | ------------------------ | ----------- | -------------------------------------------------- |
| `children`                | `ReactNode`              | -           | **Required.** The content of the list              |
| `shouldShowReferenceLine` | `boolean`                | `false`     | Show vertical reference lines for nested structure |
| `selection`               | `boolean`                | `false`     | Enable built-in selection functionality            |
| `variant`                 | `"default" \| "primary"` | `"default"` | Visual variant of the list                         |
| `size`                    | `"default" \| "large"`   | `"default"` | Size of list items                                 |
| `className`               | `string`                 | -           | Additional CSS classes                             |

### List.Item Props

| Prop            | Type                                  | Default | Description                                     |
| --------------- | ------------------------------------- | ------- | ----------------------------------------------- |
| `children`      | `ReactNode`                           | -       | The content of the item                         |
| `prefixElement` | `ReactNode`                           | -       | Icon or element to display before the content   |
| `shortcut`      | `{ modifier?: string, keys: string }` | -       | Keyboard shortcut to display                    |
| `disabled`      | `boolean`                             | `false` | Whether the item is disabled                    |
| `selected`      | `boolean`                             | `false` | Whether the item is selected (external control) |
| `parentId`      | `string`                              | -       | ID of parent for nested items                   |
| `onClick`       | `function`                            | -       | Click handler                                   |
| `id`            | `string`                              | -       | Unique identifier                               |

### List.SubTrigger Props

| Prop              | Type        | Default | Description                                                 |
| ----------------- | ----------- | ------- | ----------------------------------------------------------- |
| `children`        | `ReactNode` | -       | The content of the trigger                                  |
| `id`              | `string`    | -       | **Required.** Unique identifier for the collapsible section |
| `prefixElement`   | `ReactNode` | -       | Icon or element to display before the content               |
| `defaultOpen`     | `boolean`   | `false` | Whether the section is open by default                      |
| `disableCollapse` | `boolean`   | `false` | Disable collapsing functionality                            |
| `parentId`        | `string`    | -       | ID of parent for nested triggers                            |

### List.Content Props

| Prop       | Type        | Default | Description                                      |
| ---------- | ----------- | ------- | ------------------------------------------------ |
| `children` | `ReactNode` | -       | The content items                                |
| `parentId` | `string`    | -       | ID of parent SubTrigger for collapsible behavior |

## Sub-components

### List.Content

Container for list items. When used with `parentId`, creates collapsible sections.

### List.Item

Individual list item with support for icons, shortcuts, and interaction states.

### List.SubTrigger

Collapsible section header that controls the visibility of associated `List.Content`.

### List.Label

Section label for grouping related items.

### List.Divider

Visual separator between sections.

### List.Value

Text content wrapper (imported from menus component).

## Features

### Nested Lists

Create hierarchical structures with unlimited nesting depth:

```tsx
<List shouldShowReferenceLine>
  <List.Content>
    <List.SubTrigger
      id="level1"
      defaultOpen
    >
      <List.Value>Level 1</List.Value>
    </List.SubTrigger>

    <List.Content parentId="level1">
      <List.SubTrigger
        id="level2"
        parentId="level1"
      >
        <List.Value>Level 2</List.Value>
      </List.SubTrigger>

      <List.Content parentId="level2">
        <List.Item parentId="level2">
          <List.Value>Nested Item</List.Value>
        </List.Item>
      </List.Content>
    </List.Content>
  </List.Content>
</List>
```

### Selection Management

```tsx
import { useState } from "react"
import { Check } from "@choiceform/icons-react"

export function SelectionExample() {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())

  const handleItemClick = (id: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <List>
      <List.Content>
        <List.Item
          id="item1"
          selected={selectedItems.has("item1")}
          onClick={() => handleItemClick("item1")}
          prefixElement={selectedItems.has("item1") ? <Check /> : undefined}
        >
          <List.Value>Item 1</List.Value>
        </List.Item>
      </List.Content>
    </List>
  )
}
```

### Keyboard Shortcuts

```tsx
<List>
  <List.Content>
    <List.Item shortcut={{ keys: "H" }}>
      <List.Value>Home</List.Value>
    </List.Item>
    <List.Item shortcut={{ modifier: "command", keys: "," }}>
      <List.Value>Settings</List.Value>
    </List.Item>
  </List.Content>
</List>
```

### Sections and Dividers

```tsx
<List>
  <List.Label>Navigation</List.Label>
  <List.Content>
    <List.Item>
      <List.Value>Home</List.Value>
    </List.Item>
  </List.Content>

  <List.Divider />

  <List.Label>System</List.Label>
  <List.Content>
    <List.Item>
      <List.Value>Settings</List.Value>
    </List.Item>
  </List.Content>
</List>
```

## Variants

### Primary Variant

```tsx
<List variant="primary">
  <List.Content>
    <List.Item>
      <List.Value>Primary styled item</List.Value>
    </List.Item>
  </List.Content>
</List>
```

### Large Size

```tsx
<List size="large">
  <List.Content>
    <List.Item>
      <List.Value>Large sized item</List.Value>
    </List.Item>
  </List.Content>
</List>
```

## Accessibility

### Keyboard Navigation

- **Arrow keys**: Navigate between items
- **Enter/Space**: Select items or toggle collapsible sections
- **Tab**: Standard focus navigation
- **Escape**: Close or navigate out

### ARIA Support

- Proper role attributes (`list`, `listitem`)
- Focus management for nested structures
- Screen reader compatible hierarchy
- Disabled state handling

### Focus Management

- Keyboard navigation respects nesting levels
- Focus indicators for active items
- Proper tab order maintenance

## Advanced Examples

### File Tree Structure

```tsx
import { Folder, File } from "@choiceform/icons-react"

export function FileTreeExample() {
  return (
    <List shouldShowReferenceLine>
      <List.Content>
        <List.SubTrigger
          id="src"
          prefixElement={<Folder />}
          defaultOpen
        >
          <List.Value>src</List.Value>
        </List.SubTrigger>

        <List.Content parentId="src">
          <List.SubTrigger
            id="components"
            parentId="src"
            prefixElement={<Folder />}
          >
            <List.Value>components</List.Value>
          </List.SubTrigger>

          <List.Content parentId="components">
            <List.Item
              parentId="components"
              prefixElement={<File />}
            >
              <List.Value>Button.tsx</List.Value>
            </List.Item>
            <List.Item
              parentId="components"
              prefixElement={<File />}
            >
              <List.Value>Input.tsx</List.Value>
            </List.Item>
          </List.Content>

          <List.Item
            parentId="src"
            prefixElement={<File />}
          >
            <List.Value>index.tsx</List.Value>
          </List.Item>
        </List.Content>
      </List.Content>
    </List>
  )
}
```

### Disabled Items

```tsx
<List>
  <List.Content>
    <List.Item>
      <List.Value>Available Item</List.Value>
    </List.Item>
    <List.Item disabled>
      <List.Value>Disabled Item</List.Value>
    </List.Item>
  </List.Content>
</List>
```

### Non-collapsible Sections

```tsx
<List>
  <List.Content>
    <List.SubTrigger
      id="fixed"
      defaultOpen
      disableCollapse
    >
      <List.Value>Always Open Section</List.Value>
    </List.SubTrigger>

    <List.Content parentId="fixed">
      <List.Item parentId="fixed">
        <List.Value>Fixed Item</List.Value>
      </List.Item>
    </List.Content>
  </List.Content>
</List>
```

## Best Practices

### Structure

1. Use consistent nesting with proper `parentId` relationships
2. Enable reference lines for complex hierarchies
3. Group related items with labels and dividers
4. Keep nesting depth reasonable (typically ≤ 5 levels)

### Interaction

1. Provide keyboard shortcuts for frequently used items
2. Use clear visual indicators for selected states
3. Handle disabled states appropriately
4. Maintain consistent interaction patterns

### Performance

1. Use `defaultOpen` judiciously for large nested structures
2. Consider virtualization for very large lists
3. Optimize selection state management for large datasets
4. Lazy load nested content when possible

### Accessibility

1. Ensure proper keyboard navigation flow
2. Provide meaningful labels and descriptions
3. Test with screen readers
4. Maintain focus visibility standards
