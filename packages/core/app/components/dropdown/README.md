# Dropdown Component

A highly optimized, accessible dropdown component for React applications. This component supports nested menus, keyboard navigation, selection indicators, and more.

## Features

- 🚀 High performance with memoized callbacks and components
- ⌨️ Full keyboard navigation support
- 📱 Touch device compatibility
- 🧩 Composable API with compound components
- 🎯 Support for controlled and uncontrolled states
- 📊 Selection mode with visual indicators
- 🌲 Nested submenu support
- ♿ Accessibility built-in (ARIA attributes, focus management)

## Installation

```bash
# If using npm package (assuming this component is published)
npm install @your-org/design-system

# Or if you're using the component directly within your codebase
# Just make sure you have the dependencies:
# - @floating-ui/react
# - @radix-ui/react-slot
```

## Basic Usage

```tsx
import { Dropdown } from "@your-org/design-system"

function MyComponent() {
  return (
    <Dropdown>
      <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item>Option 1</Dropdown.Item>
        <Dropdown.Item>Option 2</Dropdown.Item>
        <Dropdown.Item>Option 3</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  )
}
```

## Nested Submenus

```tsx
<Dropdown>
  <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Item>Option 1</Dropdown.Item>
    <Dropdown>
      <Dropdown.SubTrigger>Submenu</Dropdown.SubTrigger>
      <Dropdown.Content>
        <Dropdown.Item>Submenu Item 1</Dropdown.Item>
        <Dropdown.Item>Submenu Item 2</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  </Dropdown.Content>
</Dropdown>
```

## With Selection

```tsx
const [selected, setSelected] = useState(null)

;<Dropdown selection={true}>
  <Dropdown.Trigger>Select an option</Dropdown.Trigger>
  <Dropdown.Content>
    {options.map((option) => (
      <Dropdown.Item
        key={option.id}
        selected={selected === option.id}
        onMouseUp={() => setSelected(option.id)}
      >
        {option.label}
      </Dropdown.Item>
    ))}
  </Dropdown.Content>
</Dropdown>
```

## With Dividers and Labels

```tsx
<Dropdown>
  <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Label>Group 1</Dropdown.Label>
    <Dropdown.Item>Option 1</Dropdown.Item>
    <Dropdown.Item>Option 2</Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Label>Group 2</Dropdown.Label>
    <Dropdown.Item>Option 3</Dropdown.Item>
  </Dropdown.Content>
</Dropdown>
```

## Controlled Mode

```tsx
const [open, setOpen] = useState(false)

;<Dropdown
  open={open}
  onOpenChange={setOpen}
>
  <Dropdown.Trigger>Controlled Menu</Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Item>Option 1</Dropdown.Item>
  </Dropdown.Content>
</Dropdown>
```

## Keyboard Navigation

The dropdown supports the following keyboard interactions:

- `↑`/`↓`: Navigate between items
- `→`: Open submenu
- `←`: Close submenu
- `Enter`/`Space`: Select item
- `Esc`: Close dropdown
- `Tab`: Move focus away
- Typeahead: Type to jump to matching item

## API Reference

### Dropdown

| Prop             | Type                                | Default              | Description                          |
| ---------------- | ----------------------------------- | -------------------- | ------------------------------------ |
| `children`       | ReactNode                           |                      | The dropdown content                 |
| `classNames`     | { trigger?: string, list?: string } |                      | Custom class names                   |
| `selection`      | boolean                             | false                | Whether to show selection indicators |
| `placement`      | "bottom-start" \| "bottom-end"      | "bottom-start"       | Menu position                        |
| `open`           | boolean                             |                      | Controlled open state                |
| `onOpenChange`   | (open: boolean) => void             |                      | Open state change handler            |
| `portalId`       | string                              | "floating-menu-root" | Portal container ID                  |
| `offset`         | number                              | 4                    | Offset distance from trigger         |
| `disabledNested` | boolean                             | false                | Disable nested behavior              |

### Dropdown.Item

| Prop        | Type                                    | Default | Description                  |
| ----------- | --------------------------------------- | ------- | ---------------------------- |
| `children`  | ReactNode                               |         | The item content             |
| `disabled`  | boolean                                 | false   | Whether the item is disabled |
| `selected`  | boolean                                 | false   | Whether the item is selected |
| `shortcut`  | { modifier?: KbdKey, keys?: ReactNode } |         | Keyboard shortcut display    |
| `onClick`   | (e: MouseEvent) => void                 |         | Click handler                |
| `onMouseUp` | (e: MouseEvent) => void                 |         | Mouse up handler             |

### Additional Components

- `Dropdown.Trigger`: The button that opens the dropdown
- `Dropdown.Content`: The wrapper for dropdown items and other content
- `Dropdown.SubTrigger`: Trigger for nested dropdowns
- `Dropdown.Divider`: Visual separator
- `Dropdown.Label`: Non-interactive label for grouping

## Browser Compatibility

- Chrome, Firefox, Safari, Edge: Latest versions
- IE: Not supported

## Acknowledgements

This component is built on top of the following libraries:

- [Floating UI](https://floating-ui.com)
- [Radix UI](https://radix-ui.com)
