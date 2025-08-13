# ToggleButton Component

A controlled toggle button component that switches between two states with visual feedback. Perfect for binary controls, feature toggles, and state indicators.

## Overview

The ToggleButton component provides a button that maintains an active/inactive state, typically used for toggling features, settings, or modes. It requires controlled state management and supports multiple variants and sizes.

## Usage

### Basic Toggle Button

```tsx
import { useState } from "react"
import { FieldAdd, FieldTypeCheckbox } from "@choiceform/icons-react"
import { ToggleButton } from "~/components/toggle-button"

export function BasicExample() {
  const [isToggled, setIsToggled] = useState(false)
  
  return (
    <ToggleButton
      aria-label="Toggle feature"
      value={isToggled}
      onChange={setIsToggled}
    >
      {isToggled ? <FieldTypeCheckbox /> : <FieldAdd />}
    </ToggleButton>
  )
}
```

### Toggle Button Variants

```tsx
export function VariantsExample() {
  const [states, setStates] = useState({
    default: false,
    secondary: false,
    highlight: false
  })
  
  const toggle = (key: keyof typeof states) => {
    setStates(prev => ({ ...prev, [key]: !prev[key] }))
  }
  
  return (
    <div className="flex gap-2">
      <ToggleButton
        aria-label="Default variant"
        variant="default"
        value={states.default}
        onChange={() => toggle('default')}
      >
        <FieldAdd />
      </ToggleButton>
      
      <ToggleButton
        aria-label="Secondary variant"
        variant="secondary"
        value={states.secondary}
        onChange={() => toggle('secondary')}
      >
        <FieldAdd />
      </ToggleButton>
      
      <ToggleButton
        aria-label="Highlight variant"
        variant="highlight"
        value={states.highlight}
        onChange={() => toggle('highlight')}
      >
        <FieldAdd />
      </ToggleButton>
    </div>
  )
}
```

### Different Sizes

```tsx
export function SizesExample() {
  const [isToggled, setIsToggled] = useState(false)
  
  return (
    <div className="flex items-center gap-2">
      <ToggleButton
        aria-label="Small toggle"
        size="small"
        value={isToggled}
        onChange={setIsToggled}
      >
        <FieldAdd />
      </ToggleButton>
      
      <ToggleButton
        aria-label="Medium toggle"
        size="medium"
        value={isToggled}
        onChange={setIsToggled}
      >
        <FieldAdd />
      </ToggleButton>
      
      <ToggleButton
        aria-label="Large toggle"
        size="large"
        value={isToggled}
        onChange={setIsToggled}
      >
        <FieldAdd />
      </ToggleButton>
    </div>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `boolean` | - | **Required.** Current toggle state |
| `onChange` | `(value: boolean) => void` | - | **Required.** Callback when state changes |
| `aria-label` | `string` | - | **Required.** Accessible label for the button |
| `variant` | `"default" \| "secondary" \| "highlight"` | `"default"` | Visual style variant |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Button size |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Button content (usually icons) |

## Variants

### Default
Standard toggle button with accent coloring when active.

```tsx
<ToggleButton
  variant="default"
  value={isActive}
  onChange={setIsActive}
  aria-label="Default toggle"
>
  <Icon />
</ToggleButton>
```

### Secondary
Subtle styling with muted colors for secondary actions.

```tsx
<ToggleButton
  variant="secondary"
  value={isActive}
  onChange={setIsActive}
  aria-label="Secondary toggle"
>
  <Icon />
</ToggleButton>
```

### Highlight
Prominent styling for important toggles that need attention.

```tsx
<ToggleButton
  variant="highlight"
  value={isActive}
  onChange={setIsActive}
  aria-label="Highlight toggle"
>
  <Icon />
</ToggleButton>
```

## Sizes

### Small
Compact size for dense layouts or secondary actions.

```tsx
<ToggleButton size="small" {...props}>
  <SmallIcon />
</ToggleButton>
```

### Medium (Default)
Standard size for most use cases.

```tsx
<ToggleButton size="medium" {...props}>
  <Icon />
</ToggleButton>
```

### Large
Larger size for prominent controls or touch interfaces.

```tsx
<ToggleButton size="large" {...props}>
  <Icon />
</ToggleButton>
```

## Advanced Examples

### Feature Toggle Group

```tsx
import { useState } from "react"

export function FeatureToggleGroup() {
  const [features, setFeatures] = useState({
    darkMode: false,
    notifications: true,
    autoSave: false,
    soundEffects: true
  })
  
  const toggleFeature = (key: keyof typeof features) => {
    setFeatures(prev => ({ ...prev, [key]: !prev[key] }))
  }
  
  return (
    <div className="space-y-4">
      <h3>Feature Toggles</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <ToggleButton
            aria-label="Toggle dark mode"
            value={features.darkMode}
            onChange={() => toggleFeature('darkMode')}
          >
            {features.darkMode ? <Moon /> : <Sun />}
          </ToggleButton>
          <span>Dark Mode</span>
        </div>
        
        <div className="flex items-center gap-2">
          <ToggleButton
            aria-label="Toggle notifications"
            variant="highlight"
            value={features.notifications}
            onChange={() => toggleFeature('notifications')}
          >
            {features.notifications ? <Bell /> : <BellOff />}
          </ToggleButton>
          <span>Notifications</span>
        </div>
        
        <div className="flex items-center gap-2">
          <ToggleButton
            aria-label="Toggle auto save"
            variant="secondary"
            value={features.autoSave}
            onChange={() => toggleFeature('autoSave')}
          >
            {features.autoSave ? <Save /> : <SaveOff />}
          </ToggleButton>
          <span>Auto Save</span>
        </div>
        
        <div className="flex items-center gap-2">
          <ToggleButton
            aria-label="Toggle sound effects"
            value={features.soundEffects}
            onChange={() => toggleFeature('soundEffects')}
          >
            {features.soundEffects ? <Volume2 /> : <VolumeX />}
          </ToggleButton>
          <span>Sound Effects</span>
        </div>
      </div>
    </div>
  )
}
```

### Toolbar Toggle Buttons

```tsx
import { useState } from "react"

export function ToolbarExample() {
  const [formatting, setFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false
  })
  
  const toggleFormat = (key: keyof typeof formatting) => {
    setFormatting(prev => ({ ...prev, [key]: !prev[key] }))
  }
  
  return (
    <div className="border rounded p-2 flex gap-1">
      <ToggleButton
        aria-label="Bold text"
        size="small"
        variant="secondary"
        value={formatting.bold}
        onChange={() => toggleFormat('bold')}
      >
        <Bold />
      </ToggleButton>
      
      <ToggleButton
        aria-label="Italic text"
        size="small"
        variant="secondary"
        value={formatting.italic}
        onChange={() => toggleFormat('italic')}
      >
        <Italic />
      </ToggleButton>
      
      <ToggleButton
        aria-label="Underline text"
        size="small"
        variant="secondary"
        value={formatting.underline}
        onChange={() => toggleFormat('underline')}
      >
        <Underline />
      </ToggleButton>
      
      <ToggleButton
        aria-label="Strikethrough text"
        size="small"
        variant="secondary"
        value={formatting.strikethrough}
        onChange={() => toggleFormat('strikethrough')}
      >
        <Strikethrough />
      </ToggleButton>
    </div>
  )
}
```

### View Mode Toggle

```tsx
import { useState } from "react"

export function ViewModeExample() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  
  return (
    <div className="space-y-4">
      <div className="flex gap-1 border rounded p-1">
        <ToggleButton
          aria-label="List view"
          variant="secondary"
          size="small"
          value={viewMode === 'list'}
          onChange={() => setViewMode('list')}
        >
          <List />
        </ToggleButton>
        
        <ToggleButton
          aria-label="Grid view"
          variant="secondary"
          size="small"
          value={viewMode === 'grid'}
          onChange={() => setViewMode('grid')}
        >
          <Grid />
        </ToggleButton>
      </div>
      
      <div className="border rounded p-4">
        {viewMode === 'list' ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 border rounded">
              <div className="w-8 h-8 bg-gray-200 rounded" />
              <span>List Item 1</span>
            </div>
            <div className="flex items-center gap-2 p-2 border rounded">
              <div className="w-8 h-8 bg-gray-200 rounded" />
              <span>List Item 2</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <div className="p-4 border rounded text-center">
              <div className="w-16 h-16 bg-gray-200 rounded mx-auto mb-2" />
              <span>Grid Item 1</span>
            </div>
            <div className="p-4 border rounded text-center">
              <div className="w-16 h-16 bg-gray-200 rounded mx-auto mb-2" />
              <span>Grid Item 2</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
```

### Disabled State

```tsx
export function DisabledExample() {
  const [isToggled, setIsToggled] = useState(true)
  
  return (
    <div className="space-y-2">
      <ToggleButton
        aria-label="Disabled toggle"
        value={isToggled}
        onChange={setIsToggled}
        disabled
      >
        <Settings />
      </ToggleButton>
      <p className="text-sm text-gray-600">
        This toggle is disabled and cannot be changed
      </p>
    </div>
  )
}
```

## Accessibility

### Keyboard Support
- **Space/Enter**: Toggle the button state
- **Tab**: Move focus to/from the toggle button
- Proper focus indicators for keyboard navigation

### Screen Reader Support
- `aria-label` is **required** for accessibility
- Button role automatically provided
- State changes announced to screen readers
- Pressed state communicated via `aria-pressed`

### Best Practices
1. **Always provide `aria-label`**: This is required for screen reader users
2. **Clear state indication**: Use visual changes that don't rely only on color
3. **Consistent behavior**: Toggle buttons should behave predictably
4. **Group related toggles**: Use proper semantic grouping for related controls

## Styling

The ToggleButton component supports:
- CSS custom properties for theming
- Tailwind classes via `className` prop
- Variant-based styling system
- Size-based scaling
- State-based visual feedback

## Common Patterns

### Binary Setting Toggle
```tsx
<div className="flex items-center justify-between">
  <label htmlFor="feature-toggle">Enable feature</label>
  <ToggleButton
    id="feature-toggle"
    aria-label="Enable feature"
    value={enabled}
    onChange={setEnabled}
  >
    {enabled ? <Check /> : <X />}
  </ToggleButton>
</div>
```

### Exclusive Toggle Group (Radio-like)
```tsx
const [selected, setSelected] = useState('option1')

<div className="flex gap-1">
  {['option1', 'option2', 'option3'].map(option => (
    <ToggleButton
      key={option}
      aria-label={`Select ${option}`}
      value={selected === option}
      onChange={() => setSelected(option)}
    >
      {option}
    </ToggleButton>
  ))}
</div>
```

## Migration Notes

If migrating from other toggle components:
- Ensure `aria-label` is added (required)
- Update to controlled component pattern
- Check variant and size prop values
- Verify event handler signatures