# Panel Component

A comprehensive layout system for creating structured form panels with predefined row layouts, sortable functionality, and collapsible sections. Perfect for property panels, settings interfaces, and complex form layouts.

## Overview

The Panel component provides a sophisticated system for organizing form controls and interactive elements in consistent, grid-based layouts. It supports multiple predefined layout patterns, drag-and-drop reordering, collapsible sections, and dynamic content management.

## Usage

### Basic Panel

```tsx
import { Panel } from "~/components/panel"

export function BasicExample() {
  return (
    <Panel>
      <Panel.Title title="Basic Panel">
        <IconButton tooltip={{ content: "Settings" }}>
          <Settings />
        </IconButton>
      </Panel.Title>
      
      <Panel.Row type="single">
        <Panel.Label>Input Label</Panel.Label>
        <Input placeholder="Enter value..." />
      </Panel.Row>
    </Panel>
  )
}
```

### Panel with Labels Toggle

```tsx
import { Panel } from "~/components/panel"

export function LabelToggleExample() {
  const [showLabels, setShowLabels] = useState(false)
  
  return (
    <Panel showLabels={showLabels}>
      <Panel.Title title="Properties">
        <Switch 
          size="small"
          label="Show labels"
          value={showLabels}
          onChange={setShowLabels}
        />
      </Panel.Title>
      
      <Panel.Row type="single">
        <Panel.Label>Name</Panel.Label>
        <Input placeholder="Component name" />
      </Panel.Row>
    </Panel>
  )
}
```

## Props

### Panel Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Required.** Panel content |
| `showLabels` | `boolean` | `true` | Whether to show row labels |
| `collapsible` | `boolean` | `false` | Whether the panel can be collapsed |
| `isCollapsed` | `boolean` | - | Controlled collapse state |
| `onCollapsedChange` | `function` | - | Callback when collapse state changes |
| `className` | `string` | - | Additional CSS classes |

## Sub-components

### Panel.Title

Panel header with title and optional action buttons.

```tsx
<Panel.Title 
  title="Panel Title"
  onClick={function}          // Optional click handler
  classNames={{
    container: string,        // Container styles
    titleWrapper: string,     // Title wrapper styles
    title: string,           // Title text styles
    actionWrapper: string    // Actions container styles
  }}
>
  <IconButton tooltip={{ content: "Action" }}>
    <Icon />
  </IconButton>
</Panel.Title>
```

### Panel.Row

Flexible row layout system with predefined grid patterns.

```tsx
<Panel.Row 
  type="single" | "two-columns" | "one-input-one-icon" | 
       "one-input-two-icon" | "two-input-one-icon" | 
       "two-input-two-icon" | "one-icon-one-input-two-icon" |
       "two-input-one-icon-double-row" | "one-label-one-input" |
       "one-icon-one-input"
>
  {/* Content positioned using grid areas */}
</Panel.Row>
```

### Panel.Label

Label component for form fields.

```tsx
<Panel.Label className="[grid-area:label]">
  Field Label
</Panel.Label>
```

### Panel.Sortable

Container for sortable list items with drag-and-drop functionality.

```tsx
<Panel.Sortable
  data={sortableItems}
  selectedId={selectedId}
  onDrop={handleDrop}
  onSelectedIdChange={setSelectedId}
>
  <SortableRowContent />
</Panel.Sortable>
```

### Panel.SortableRow

Individual sortable row with drag handle and grid layout.

```tsx
<Panel.SortableRow
  type="one-icon-one-input-two-icon"
  onClick={handleClick}
>
  {/* Grid-positioned content */}
</Panel.SortableRow>
```

### Panel.RowManyIcon

Specialized row for multiple icons that show/hide based on editing state.

```tsx
<Panel.RowManyIcon
  isEditing={boolean}
  icons={[
    {
      id: "icon1",
      element: <IconButton>...</IconButton>,
      alwaysShow?: boolean
    }
  ]}
>
  <EditableContent />
</Panel.RowManyIcon>
```

## Row Layout Types

### Single (`type="single"`)
```css
grid-template-areas: "label" "input";
grid-template-columns: 1fr;
grid-template-rows: auto minmax(2rem, auto);
```

```tsx
<Panel.Row type="single">
  <Panel.Label>Label</Panel.Label>
  <Select className="[grid-area:input]" />
</Panel.Row>
```

### Two Columns (`type="two-columns"`)
```css
grid-template-areas: "label-1 label-2" "input-1 input-2";
grid-template-columns: 1fr 1fr;
grid-template-rows: auto minmax(2rem, auto);
```

```tsx
<Panel.Row type="two-columns">
  <Panel.Label className="[grid-area:label-1]">Left</Panel.Label>
  <Panel.Label className="[grid-area:label-2]">Right</Panel.Label>
  <Input className="[grid-area:input-1]" />
  <Input className="[grid-area:input-2]" />
</Panel.Row>
```

### One Input One Icon (`type="one-input-one-icon"`)
```css
grid-template-areas: "label label" "input icon";
grid-template-columns: 1fr 1.5rem;
grid-template-rows: auto minmax(2rem, auto);
```

```tsx
<Panel.Row type="one-input-one-icon">
  <Panel.Label>Field</Panel.Label>
  <Input className="[grid-area:input]" />
  <IconButton className="[grid-area:icon]">
    <Visible />
  </IconButton>
</Panel.Row>
```

### One Input Two Icon (`type="one-input-two-icon"`)
```css
grid-template-areas: "input . icon-1 . icon-2";
grid-template-columns: 1fr 0.5rem 1.5rem 0.25rem 1.5rem;
grid-template-rows: 2rem;
```

### Two Input One Icon (`type="two-input-one-icon"`)
```css
grid-template-areas: "label-1 label-2 label-2" "input-1 input-2 icon";
grid-template-columns: 1fr 1fr 1.5rem;
grid-template-rows: auto 2rem;
```

### Two Input Two Icon (`type="two-input-two-icon"`)
```css
grid-template-areas: "label-1 label-1 label-2 label-2 . . ." 
                     "input-1 . input-2 . icon-1 . icon-2";
grid-template-columns: minmax(76px, 1fr) 0.5rem 1fr 0.5rem 1.5rem 0.25rem 1.5rem;
grid-template-rows: auto minmax(2rem, auto);
```

### One Icon One Input Two Icon (`type="one-icon-one-input-two-icon"`)
```css
grid-template-areas: "label label label label label label label" 
                     "icon-1 . input . icon-2 . icon-3";
grid-template-columns: 1.5rem 0.5rem 1fr 0.5rem 1.5rem 0.25rem 1.5rem;
grid-template-rows: auto minmax(2rem, auto);
```

### Two Input One Icon Double Row (`type="two-input-one-icon-double-row"`)
```css
grid-template-areas: "label-1 label-2 ." 
                     "input-1 input-3 icon-1" 
                     "input-2 input-3 icon-2";
grid-template-columns: 1fr 1fr 1.5rem;
grid-template-rows: auto 2rem 2rem;
```

### One Label One Input (`type="one-label-one-input"`)
```css
grid-template-areas: "label input";
grid-template-columns: 8fr 20fr;
grid-template-rows: 2rem;
```

### One Icon One Input (`type="one-icon-one-input"`)
```css
grid-template-areas: "label label" "icon input";
grid-template-columns: 1.5rem 1fr;
grid-template-rows: auto minmax(2rem, auto);
```

## Features

### Collapsible Panels

```tsx
import { useState } from "react"

export function CollapsibleExample() {
  const [collapsed, setCollapsed] = useState(false)
  
  return (
    <Panel 
      collapsible 
      isCollapsed={collapsed}
      onCollapsedChange={setCollapsed}
    >
      <Panel.Title title="Collapsible Panel">
        <IconButton tooltip={{ content: "Settings" }}>
          <Settings />
        </IconButton>
      </Panel.Title>
      
      {!collapsed && (
        <Panel.Row type="single">
          <Panel.Label>Content</Panel.Label>
          <Input />
        </Panel.Row>
      )}
    </Panel>
  )
}
```

### Sortable Lists

```tsx
import { useState } from "react"
import { nanoid } from "nanoid"

export function SortableExample() {
  const [items, setItems] = useState([
    { id: nanoid(), indexKey: "a0", value: "Item 1" },
    { id: nanoid(), indexKey: "a1", value: "Item 2" }
  ])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  
  const handleDrop = (position, id, newIndex) => {
    // Handle reordering logic
    const newItems = reorderItems(items, id, newIndex, position)
    setItems(newItems)
  }
  
  const SortableRowContent = () => {
    const item = useSortableRowItem()
    
    return (
      <Panel.SortableRow 
        type="one-input-one-icon"
        onClick={() => setSelectedId(item.id)}
      >
        <Input 
          value={item.value}
          className="[grid-area:input]"
        />
        <IconButton className="[grid-area:icon]">
          <Delete />
        </IconButton>
      </Panel.SortableRow>
    )
  }
  
  return (
    <Panel>
      <Panel.Title title="Sortable Items" />
      
      <Panel.Sortable
        data={items}
        selectedId={selectedId}
        onDrop={handleDrop}
        onSelectedIdChange={setSelectedId}
      >
        <SortableRowContent />
      </Panel.Sortable>
    </Panel>
  )
}
```

### Multiple Action Icons

```tsx
export function ManyIconExample() {
  const [isEditing, setIsEditing] = useState(false)
  
  return (
    <Panel>
      <Panel.Title title="Multiple Icons" />
      
      <Panel.RowManyIcon
        isEditing={isEditing}
        icons={[
          {
            id: "visible",
            element: (
              <IconButton tooltip={{ content: "Toggle visibility" }}>
                <Visible />
              </IconButton>
            )
          },
          {
            id: "delete",
            element: (
              <IconButton tooltip={{ content: "Delete" }}>
                <Delete />
              </IconButton>
            )
          },
          {
            id: "info",
            element: (
              <div className="flex h-6 w-6 items-center justify-center">
                <InfoCircle />
              </div>
            ),
            alwaysShow: true
          }
        ]}
      >
        <EditableField
          isEditing={isEditing}
          onEditingChange={setIsEditing}
        />
      </Panel.RowManyIcon>
    </Panel>
  )
}
```

## Advanced Examples

### Property Panel

```tsx
export function PropertyPanelExample() {
  const [showLabels, setShowLabels] = useState(true)
  
  return (
    <Panel showLabels={showLabels}>
      <Panel.Title title="Properties">
        <Switch
          size="small"
          label="Labels"
          value={showLabels}
          onChange={setShowLabels}
        />
        <IconButton tooltip={{ content: "Reset" }}>
          <Reset />
        </IconButton>
      </Panel.Title>
      
      <Panel.Row type="single">
        <Panel.Label>Name</Panel.Label>
        <Input placeholder="Component name" />
      </Panel.Row>
      
      <Panel.Row type="two-columns">
        <Panel.Label className="[grid-area:label-1]">Width</Panel.Label>
        <Panel.Label className="[grid-area:label-2]">Height</Panel.Label>
        <NumericInput 
          className="[grid-area:input-1]"
          suffix="px"
        />
        <NumericInput 
          className="[grid-area:input-2]" 
          suffix="px"
        />
      </Panel.Row>
      
      <Panel.Row type="one-input-two-icon">
        <Panel.Label>Color</Panel.Label>
        <ColorInput className="[grid-area:input]" />
        <IconButton className="[grid-area:icon-1]">
          <Eyedropper />
        </IconButton>
        <IconButton className="[grid-area:icon-2]">
          <Delete />
        </IconButton>
      </Panel.Row>
    </Panel>
  )
}
```

### Settings Panel

```tsx
export function SettingsPanelExample() {
  return (
    <Panel>
      <Panel.Title title="Settings">
        <IconButton tooltip={{ content: "More options" }}>
          <MoreHorizontal />
        </IconButton>
      </Panel.Title>
      
      <Panel.Row type="one-label-one-input">
        <div className="[grid-area:label] text-secondary-foreground">
          Theme
        </div>
        <Select className="[grid-area:input]">
          <Select.Trigger>
            <span>Dark</span>
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="light">Light</Select.Item>
            <Select.Item value="dark">Dark</Select.Item>
            <Select.Item value="auto">Auto</Select.Item>
          </Select.Content>
        </Select>
      </Panel.Row>
      
      <Panel.Row type="single">
        <Checkbox>
          <Checkbox.Label>Enable notifications</Checkbox.Label>
        </Checkbox>
      </Panel.Row>
    </Panel>
  )
}
```

## Accessibility

### Keyboard Navigation
- **Tab/Shift+Tab**: Navigate between interactive elements
- **Enter/Space**: Activate buttons and controls
- **Arrow keys**: Navigate within grouped controls
- **Escape**: Close dropdowns or cancel editing

### Focus Management
- Logical focus order follows visual layout
- Focus indicators for all interactive elements
- Proper focus trapping in modals and dropdowns

### Screen Reader Support
- Semantic structure with proper roles and labels
- Form field associations with labels
- Status announcements for dynamic changes

## Best Practices

### Layout Design
1. Choose appropriate row types for content relationships
2. Use consistent spacing and alignment
3. Group related fields logically
4. Maintain visual hierarchy with proper labeling

### Interaction Patterns
1. Provide clear visual feedback for all actions
2. Use tooltips for icon-only buttons
3. Handle loading and error states gracefully
4. Implement proper keyboard navigation

### Performance
1. Use controlled components efficiently
2. Minimize unnecessary re-renders
3. Implement virtualization for long lists
4. Optimize sortable interactions

### Responsive Design
1. Test layouts at different screen sizes
2. Consider mobile interaction patterns
3. Ensure touch targets are appropriately sized
4. Handle overflow gracefully